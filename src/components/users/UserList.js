import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../modules/APIManager";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

// show all user accounts in the database
export const UserList = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => getAllUsers().then(setUsers));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1">
        All Users {" "}
      </Typography>
      <Typography variant="subtitle1">View All Smilestoners</Typography>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button component={Link} to={`/users/${currentUserId}`}>
            My Account
          </Button>
          <Button component={Link} to={"/users/create"}>
            Add Child
          </Button>
          <Button component={Link} to={"/users/create"} disabled>
            Add Parent
          </Button>
        </ButtonGroup>
      </Box>{" "}
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "100%",
          alignContent: "flex-start",
          flexBasis: 300,
        }}
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            userMilestones={user.userMilestones}
            totalMilestoneResults={user.userMilestones.length}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
      </Box>
    </>
  );
};
