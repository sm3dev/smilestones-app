import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getAllChildrenConnectionsByParentID,
  getAllUsers,
} from "../../modules/APIManager";
import { MyUserCard } from "./MyUserCard";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { UserProfile } from "./UserProfile";
import { Typography } from "@mui/material";

// show all user accounts in the database
export const MyUserList = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [users, setUsers] = useState([]);
  const [childConnections, setChildConnections] = useState([]);
  const navigate = useNavigate();
  // I need to get userParentConnections with parentId values that match my User ID
  // Then, I need to take that result ARRAY and set the state of userParentConnections with it
  // SOLUTION: I need one fetch call that gets userParentConnections, and inside that fetch call, I'll need a conditional that runs a fetch call for Users who have matching userIds from the userParentConnections' fetch call
  const getMyUserChildrenConnections = () => {
    // Fetch call that uses logged-in User Id to get all userParentConnections where logged-in User Id is the parentId value
    getAllChildrenConnectionsByParentID(currentUserId).then((connections) => {
      console.log(connections);
      const myConnections = connections.filter(
        (connection) => connection.parentId === currentUserId
      );
      console.log(myConnections);
      setChildConnections(myConnections);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => getAllUsers().then(setUsers));
  };

  useEffect(() => {
    getMyUserChildrenConnections();
  }, []);
  console.log(users.length);

  return (
    <>
    <Typography variant="h2" >My Managed Accounts</Typography>
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "100%",
          alignContent: "flex-start",
          flexBasis: "50%",
        }}
      >
        <Box
          flexGrow="1"
          spacing={1}
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            maxWidth: "100%",
            alignContent: "flex-start",
            flexBasis: 480,
            width: 400,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h5">
            My Account
          </Typography>

          <UserProfile />
        </Box>
        <Box
          flexGrow="1"
          spacing={1}
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            maxWidth: "100%",
            alignContent: "flex-start",
            flexBasis: "50%",
          }}
        >
          <Typography sx={{ m: 1 }} variant="h5" component="div" >
            Your Children Account&#40;s&#41;: {childConnections.length} Total
          </Typography>
          {childConnections.map((childConnection) => (
            <MyUserCard
              key={childConnection.id}
              user={childConnection.user}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </Box>
      </Box>
      <h1>My Managed Accounts</h1>
      <div>
        {/* This button will use the current logged-in user's user.id inside of the navigate to go that specific user's profile URL  */}
        <button
          className="my-profile__button"
          onClick={() => navigate(`/users/${currentUserId}`)}
        >
          Manage My Account
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/users/create")}>
          Add Child User{" "}
        </button>
      </div>
      <hr />{" "}
      <h2>Your Children Account&#40;s&#41;: {childConnections.length} Total</h2>
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "100%",
          alignContent: "flex-start",
          flexBasis: 360,
        }}
      >
        {childConnections.map((childConnection) => (
          <MyUserCard
            key={childConnection.id}
            user={childConnection.user}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
        {/* {childConnections.map(childConnection => <div userId={childConnection.user.id} key={childConnection.id} handleDeleteUser={handleDeleteUser}>{childConnection.user.firstName} childConnection</div>)
                } */}
      </Box>
    </>
  );
};
