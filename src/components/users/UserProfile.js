import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  deleteUser,
  getAllChildrenConnectionsByParentID,
  getAllUserMilestonesByUserID,
  getUserByID,
} from "../../modules/APIManager";
import { GetAge } from "../helpers/GetAge";

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

  const history = useHistory();

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
      (childConnection) => childConnection.userId === parseInt(userId) && childConnection.parentId === currentUserId);
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
      history.push("/login");
    } else {
      deleteUser(id).then(() => history.push(`/users/${userId}/myKids`));
    }
  };

  const handleBack = () => {
    history.push(`/users/${userId}/myKids`);
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
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>Age: {GetAge(user.DOB)}</div>
      {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}
      <button
        className="userMilestone__link"
        onClick={() => history.push(`/achievements/user/${user.id}`)}
      >
        <strong>{milestoneResults.length}</strong> {user.firstName}'s Milestone
        Achievements
      </button>

      {user.id === currentUserId ? (
          <>
          <button
        id={`user__edit-${user.id}`}
        onClick={() => history.push(`/users/${user.id}/edit`)}
      >
        Update My Profile
      </button>
          </>
      ) : (
        <>
          <button
        id={`user__edit-${user.id}`}
        disabled={buttonAccess}
        onClick={() => history.push(`/users/${user.id}/edit`)}
      >
        Manage
      </button>
      <button onClick={() => handleBack()}>Back</button>
      <button
        id={`user__delete-${user.id}`}
        disabled={buttonAccess}
        onClick={() => handleDeleteUser(user.id)}
      >
        Delete
      </button>
        </>
      )
      
      }
      
    </>
  );
};
