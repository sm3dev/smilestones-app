import {
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { getUserByID } from "../../modules/APIManager";
import { EmojiEvents, Home, People, SportsScore } from "@mui/icons-material";
import { useNavigate } from "react-router";

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
const navigate = useNavigate();

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
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="Home" value="home" icon={<Home />} />
          <BottomNavigationAction
            label="Milestones"
            value="milestones"
            icon={<SportsScore />}
          >
            <Link to="milestones"></Link>
          </BottomNavigationAction>

          <BottomNavigationAction
            label="Achievements"
            value="achievements"
            icon={<EmojiEvents />}
          />
          {loggedInUser.admin === true && (
            <BottomNavigationAction
              label="Users"
              value="users"
              icon={<People />} onClick={() => navigate("users")}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
