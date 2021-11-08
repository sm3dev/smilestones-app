import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { useHistory } from "react-router";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import { AccountCircle, Logout, PersonAdd } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { getUserByID } from "../../modules/APIManager";

export const NavBar = ({ admin }) => {
  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
  const adminCheck = sessionStorage.getItem("smilestones_admin");

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
    history.push(`/login`);
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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photos
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
                  vertical: "top",
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink
                    to={{ pathname: `/users/${currentUserId}` }}
                    style={(isActive) => ({
                      color: isActive ? "green" : "blue",
                    })}
                  >
                    Profile
                  </NavLink>
                </MenuItem>
                {adminCheck === true && (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link to={{ pathname: `/users/${currentUserId}/myKids` }}>
                        My Kids
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add a Child
                    </MenuItem>
                  </>
                )}

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

      <ul className="navbar">
        <li className="navbar__item">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/milestones">
            Milestones
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/achievements">
            Milestone Achievements
          </Link>
        </li>
        {adminCheck === true && (
          <>
            <li className="navbar__item">
              <Link className="navbar__link" to="/users">
                Users
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                className="navbar__link"
                to={{ pathname: `/users/${currentUserId}/myKids` }}
              >
                My Kids
              </Link>
            </li>
          </>
        )}

        <li className="navbar__item">
          <Link
            className="navbar__link"
            to={{ pathname: `/users/${currentUserId}` }}
          >
            My Profile
          </Link>
        </li>
        <li className="navbar__item">
          <Button
            onClick={() => {
              sessionStorage.clear();
              history.push(`/login`);
            }}
          >
            Log out
          </Button>
        </li>
      </ul>
    </>
  );
};
