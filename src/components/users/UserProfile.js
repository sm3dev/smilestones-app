import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  deleteUser,
  getAllChildrenConnectionsByParentID,
  getAllUserMilestonesByUserID,
  getUserByID,
} from "../../modules/APIManager";
import { GetAge } from "../helpers/GetAge";
import { useNavigate } from 'react-router';

export const UserProfile = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [user, setUser] = useState({
    id: useParams().userId,
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    admin: true,
  });

  const [milestoneResults, setMilestoneResults] = useState([]);
  const [childConnections, setChildConnections] = useState([]);
  const [buttonAccess, setButtonAccess] = useState({ value: "" });

  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  const navigate = useNavigate();

  // check for child connections and return TRUE or FALSE; returns a boolean
  const getUserChildrenConnections = () => {
    // Fetch call that uses logged-in User Id to get all userParentConnections where logged-in User Id is the parentId value
    getAllChildrenConnectionsByParentID(currentUserId).then((connections) => {
      const thisUsersConnections = connections.filter(
        (connection) => connection.parentId === currentUserId
      );
      console.log(thisUsersConnections);
      setChildConnections(thisUsersConnections);
    });
  };

  // If any of the results from getUserChildrenConbnections has a parentId of currentUserId AND a userId of user.id, then return TRUE
  // If not FALSE
  const handleButtonDisabled = () => {
    // I need to map through the childConnections?
    const theConnection = childConnections.find(
      (childConnection) =>
        childConnection.userId === parseInt(userId) &&
        childConnection.parentId === currentUserId
    );
    console.log(theConnection);
    if (theConnection) {
      console.log("Buttons should NOT be disabled");
      setButtonAccess(false);
    } else {
      console.log("Buttons should be disabled");
      setButtonAccess(true);
    }
  };

  const handleDeleteUser = (id) => {
    // if the logged-in user tries to delete their own account, alert them and clear the sessionStorage -- which "should" take them to login screen maybe.
    if (currentUserId === id) {
      alert("You are attempting to delete your account!");
      deleteUser(id);
      sessionStorage.clear();
      navigate("/login");
    } else {
      deleteUser(id).then(() => navigate(`/users/${userId}/myKids`));
    }
  };

  useEffect(() => {
    getUserByID(userId).then((user) => {
      setUser(user);
    });
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getAllUserMilestonesByUserID(userId).then((results) => {
      setMilestoneResults(results);
      setIsLoading(false);
    });
    handleButtonDisabled();
  }, [userId, childConnections]);

  useEffect(() => {
    getUserChildrenConnections();
  }, [userId]);

  return (
    <>
      <div><h1>Profile Info</h1></div>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>Age: {GetAge(user.DOB)}</div>
      {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}
      <button
        className="userMilestone__link"
        onClick={() => navigate(`/achievements/user/${user.id}`)}
      >
        <strong>{milestoneResults.length}</strong> {user.firstName}'s
        Achievements
      </button>

      {user.id === currentUserId ? (
        <>
          <div>
            <button
              id={`user__edit-${user.id}`}
              onClick={() => navigate(`/users/${user.id}/edit`)}
              disabled={isLoading}
            >
              Update My Profile
            </button>
          </div>
          <div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <button
              id={`user__edit-${user.id}`}
              disabled={buttonAccess}
              onClick={() => navigate(`/users/${user.id}/edit`)}
            >
              Manage
            </button>
            <button
              id={`user__delete-${user.id}`}
              disabled={buttonAccess}
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </div>
          <div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </>
      )}
    </>
  );
};
