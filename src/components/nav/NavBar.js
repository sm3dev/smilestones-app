import { NavLink } from "react-router-dom";
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import {
  AccountCircle,
  EmojiEvents,
  Logout,
  ManageAccounts,
  People,
  PersonAdd,
} from "@mui/icons-material";
import { getUserByID } from "../../modules/APIManager";

export const NavBar = () => {
  let navigate = useNavigate();
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    admin: true,
  });
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    sessionStorage.clear();
    navigate(`/login`);
  };

  useEffect(() => {
    getUserByID(currentUserId).then((user) => {
      setLoggedInUser(user);
    });
  }, [currentUserId]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              component="a"
              sx={{ flexGrow: 1 }}
              href="/"
            >
              Smilestones
            </Typography>
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenu}
                color="inherit"
              >
                <Typography fontSize="small" variant="overline">
                  Hi, {loggedInUser.firstName}!{" "}
                </Typography>
                <AccountCircle sx={{ width: 32, height: 32 }}></AccountCircle>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ManageAccounts />
                  </ListItemIcon>
                  <NavLink to={{ pathname: `/users/${currentUserId}` }}>
                    Profile
                  </NavLink>
                </MenuItem>
                {loggedInUser.admin === true && (
                  <>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <People />
                      </ListItemIcon>
                      <NavLink
                        to={{ pathname: `/users/${currentUserId}/myKids` }}
                      >
                        My Kids
                      </NavLink>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd />
                      </ListItemIcon>
                      <NavLink to={{ pathname: `/users/create` }}>
                        Add Child
                      </NavLink>
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <NavLink
                    to={{ pathname: `/users/${currentUserId}/achievements` }}
                  >
                    Achievements
                  </NavLink>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
