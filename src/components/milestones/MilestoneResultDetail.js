import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  deleteUserMilestone,
  getAllChildrenConnectionsByParentID,
  getUserMilestoneByID,
} from "../../modules/APIManager";

export const MilestoneResultDetail = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
  const { userMilestoneId } = useParams();
  const [childConnections, setChildConnections] = useState([]);
  const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: parseInt(useParams().milestoneId),
    userId: useParams().userId,
    date: "",
    validated: true,
    timeToComplete: 0,
    distance: 0,
    height: 0,
    quantity: 0,
    remarks: "",
  });

  const [buttonAccess, setButtonAccess] = useState({ value: "" });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // check for child connections and return TRUE or FALSE; returns a boolean
  const getUserChildrenConnections = () => {
    // Fetch call that uses logged-in User Id to get all userParentConnections where logged-in User Id is the parentId value
    getAllChildrenConnectionsByParentID(currentUserId).then((connections) => {
      const thisUsersConnections = connections.filter(
        (connection) => connection.parentId === currentUserId
      );
      setChildConnections(thisUsersConnections);
    });
  };

  // If any of the results from getUserChildrenConbnections has a parentId of currentUserId AND a userId of user.id, then return TRUE
  // If not FALSE
  const handleButtonDisabled = () => {
    // I need to map through the childConnections?
    const theConnection = childConnections.find(
      (childConnection) =>
        childConnection.userId === parseInt(milestoneResult.userId) &&
        childConnection.parentId === currentUserId
    );

    // The conditional should look for either of the conditions then setButtonAccess
    if (theConnection || parseInt(milestoneResult.userId) === currentUserId) {
      console.log("Buttons should NOT be disabled");
      setButtonAccess(false);
    } else {
      console.log("Buttons should be disabled");
      setButtonAccess(true);
    }
  };

  const handleDeleteMilestoneResult = (id) => {
    // if the logged-in user tries to delete their own account, alert them and clear the sessionStorage -- which "should" take them to login screen maybe.
    if (currentUserId === id) {
      alert("This Milestone Achievement will be permanently deleted!");
      deleteUserMilestone(id).then(() => history.push(`/achievements`));
    } else {
      deleteUserMilestone(id).then(() => history.push(`/achievements`));
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getUserMilestoneByID(userMilestoneId).then((result) => {
      setMilestoneResult(result);
      setIsLoading(false);
    });
    handleButtonDisabled();
  }, [childConnections]);

  useEffect(() => {
    getUserChildrenConnections();
  }, [milestoneResult.userId]);

  return (
    <>
      <h1>{milestoneResult.user?.firstName}'s Milestone Achievement</h1>
      <h3>{milestoneResult.milestone?.name}</h3>
      <p>{milestoneResult.milestone?.description}</p>
      {/* {milestoneResult.milestone?.repeater === false ? (
        <div>Achieved on {milestoneResult.date}</div>)} */}

      <div>Date Achieved: {milestoneResult.date}</div>

      {milestoneResult.timeToComplete !== 0 && (
        <>
          <div>Time &#40;seconds&#41;: {milestoneResult.timeToComplete}</div>
        </>
      )}

      {milestoneResult.distance !== 0 && (
        <>
          <div>Distance: {milestoneResult.distance}</div>
        </>
      )}

      {milestoneResult.height !== 0 && (
        <>
          <div>Height: {milestoneResult.height}</div>
        </>
      )}

      {milestoneResult.quantity !== 0 && (
        <>
          <div>Amount: {milestoneResult.quantity}</div>
        </>
      )}

      {milestoneResult.validated === true ? (
        <div>Validated: Yes</div>
      ) : (
        <div>
          Validation Needed -- Click <strong>Edit</strong> Button to Validate
        </div>
      )}
      <div>
        <Link to={`/achievements/${milestoneResult.id}/edit`}>
          <button disabled={buttonAccess}>Edit</button>
        </Link>
        <button
          onClick={() => handleDeleteMilestoneResult(milestoneResult.id)}
          disabled={buttonAccess}
        >
          Delete
        </button>
      </div>
      <div>
        <button onClick={() => handleBack()}>Back</button>
      </div>
    </>
  );
};
