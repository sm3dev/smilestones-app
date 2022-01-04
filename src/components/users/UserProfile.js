import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  deleteUser,
  getAllChildrenConnectionsByParentID,
  getAllUserMilestonesByUserID,
  getUserByID,
} from "../../modules/APIManager";
import { GetAge } from "../helpers/GetAge";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import { Delete, Edit, EmojiEvents } from "@mui/icons-material";

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
      console.log(
        "This parent of this user has these connections:",
        thisUsersConnections
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
        childConnection.userId === parseInt(userId) &&
        childConnection.parentId === currentUserId
    );
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

  let fullName = `${user.firstName} ${user.lastName}`;
  let userAge = `Age: ${GetAge(user.DOB)}`;

  return (
    <>
      <Card
        // variant="outlined"
        key={user.id}
        sx={{
          m: 1,
          flexShrink: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <CardHeader title={fullName} subheader={userAge} />

        <CardContent>
          <Typography variant="body2">
            Administrator: {user.admin === true ? "Yes" : "No"}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "stretch" }}>
          {user.id === currentUserId ? (
            <>
              <Button
              variant="contained"
                startIcon={<Edit />}
                id={`user__edit-${user.id}`}
                onClick={() => navigate(`/users/${user.id}/edit`)}
                disabled={isLoading}
              >
                Update My Profile
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<Edit />}
                variant="contained"
                id={`user__edit-${user.id}`}
                disabled={buttonAccess}
                onClick={() => navigate(`/users/${user.id}/edit`)}
              >
                Manage
              </Button>
              <Button
                startIcon={<Delete />}
                id={`user__delete-${user.id}`}
                disabled={buttonAccess}
                onClick={() => handleDeleteUser(user.id)}
                variant=""
              >
                Delete
              </Button>
            </>
          )}
        </CardActions>
        <CardActions>
          <Button
            startIcon={<EmojiEvents />}
            variant="contained"
            className="userMilestone__link"
            onClick={() => navigate(`/users/${user.id}/achievements`)}
          >
            {milestoneResults.length} Achievements
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
