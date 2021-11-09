import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { getUserByID } from "../../modules/APIManager";
import {
  EmojiEvents,
  EmojiEventsOutlined,
  Home,
  People,
  SportsScore,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const BottomNav = () => {
  const [activeNavItem, setActiveNavItem] = useState("recents");
  const [loggedInUser, setLoggedInUser] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    admin: true,
  });

  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

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
        <BottomNavigation
          showLabels
          value={activeNavItem}
          onChange={(event, newActiveNavItem) => {
            setActiveNavItem(newActiveNavItem);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            LinkComponent="a"
            href="/"
          />
          <BottomNavigationAction
            label="Milestones"
            icon={<SportsScore />}
            LinkComponent="a"
            href="/milestones"
          />
          <BottomNavigationAction
            label="Achievements"
            icon={<EmojiEvents />}
            LinkComponent="a"
            href="/achievements"
          />
          {loggedInUser.admin === true && (
            <BottomNavigationAction
              label="Users"
              icon={<People />}
              LinkComponent="a"
              href="/users"
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
