import {
  Avatar,
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useHistory } from "react-router";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import {
  AccountCircle,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar = ({ admin }) => {
  const history = useHistory();
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
  const adminCheck = sessionStorage.getItem("smilestones_admin");

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {admin.firstName}
                  </Avatar>
                </IconButton>
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
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={{ pathname: `/users/${currentUserId}` }}>
                      Profile
                    </Link>
                  </MenuItem>
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
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                  
                </Menu>
              </div>
            )}
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
        {admin && (
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
