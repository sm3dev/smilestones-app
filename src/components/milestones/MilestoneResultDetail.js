import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  deleteUserMilestone,
  getAllChildrenConnectionsByParentID,
  getUserMilestoneByID,
} from "../../modules/APIManager";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import { ChildCare, EmojiEvents } from "@mui/icons-material";

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
  const navigate = useNavigate();

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
      deleteUserMilestone(id).then(() => navigate(`/achievements`));
    } else {
      deleteUserMilestone(id).then(() => navigate(`/achievements`));
    }
  };

  useEffect(() => {
    getUserMilestoneByID(userMilestoneId).then((result) => {
      setMilestoneResult(result);
    });
    handleButtonDisabled();
  }, [childConnections]);

  useEffect(() => {
    getUserChildrenConnections();
  }, [milestoneResult.userId]);

  return (
    <>
      <Typography variant="h4" component="h1">
        {milestoneResult.user?.firstName}'s Achievement
      </Typography>
      <Card
        key={milestoneResult.id}
        elevation={4}
        sx={{
          m: 1,
          flexShrink: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <CardHeader
          title={milestoneResult.milestone?.name}
          subheader={milestoneResult.milestone?.description}
        />
        <CardContent>
          {milestoneResult.timeToComplete !== 0 && (
            <>
              <Typography variant="h5">
                Time &#40;seconds&#41;: {milestoneResult.timeToComplete}
              </Typography>
            </>
          )}

          {milestoneResult.distance !== 0 && (
            <>
              {" "}
              <Typography variant="h5">
                Distance: {milestoneResult.distance}{" "}
              </Typography>
            </>
          )}

          {milestoneResult.height !== 0 && (
            <>
              {" "}
              <Typography variant="h5">
                Height: {milestoneResult.height}{" "}
              </Typography>
            </>
          )}

          {milestoneResult.quantity !== 0 && (
            <>
              {" "}
              <Typography variant="h5">
                Amount: {milestoneResult.quantity}{" "}
              </Typography>
            </>
          )}
          <Typography variant="subtitle1">
            Date Achieved: {milestoneResult.date}
          </Typography>
          {milestoneResult.validated === true ? (
            <>
              <Typography variant="body1">Validated: Yes</Typography>
            </>
          ) : (
            <>
              <Typography variant="body1">
                {" "}
                Validation Needed -- Click <strong>Edit</strong> Button to
                Validate
              </Typography>
            </>
          )}
          <Typography></Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/users/${milestoneResult.user?.id}/achievements`)
            }
          >
            All of {milestoneResult.user?.firstName}'s Achievements
          </Button>
          <Button
            disabled={buttonAccess}
            variant="contained"
            onClick={() =>
              navigate(`/users/${milestoneResult.user?.id}/achievements`)
            }
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDeleteMilestoneResult(milestoneResult.id)}
            disabled={buttonAccess}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Button variant="outlined" onClick={() => navigate("/achievements")}>
        <EmojiEvents /> View All Achievements
      </Button>
      {/* {milestoneResult.milestone?.repeater === false ? (
        <div>Achieved on {milestoneResult.date}</div>)} */}
    </>
  );
};
