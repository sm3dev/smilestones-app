import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { getUserByID } from "../../modules/APIManager";
import { EmojiEvents, Home, People, SportsScore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export const BottomNav = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
  const [value, setValue] = useState("recents");
  const [loggedInUser, setLoggedInUser] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    admin: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserByID(currentUserId).then((user) => {
      setLoggedInUser(user);
    });
  }, [currentUserId]);

  return (
    <Box sx={{ width: 500 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation value={value} onChange={handleChange} showLabels >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<Home />}
            component={NavLink}
            to={"/"}
          />
          <BottomNavigationAction
            label="Milestones"
            value="milestones"
            icon={<SportsScore />}
            component={NavLink}
            to={"/milestones"}
          />

          <BottomNavigationAction
            label="Achievements"
            value="achievements"
            icon={<EmojiEvents />}
            component={NavLink}
            to={"/achievements"}
          />
          {loggedInUser.admin === true && (
            <BottomNavigationAction
              label="Users"
              value="users"
              icon={<People />}
              component={NavLink}
              to={"/users"}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
