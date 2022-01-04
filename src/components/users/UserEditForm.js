import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserByID, updateUser } from "../../modules/APIManager";
import { useNavigate } from "react-router";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Save } from "@mui/icons-material";

// Edit a User account
export const UserEditForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    DOB: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: "",
  });

  // const [parent, setParent] = useState({
  //   DOB: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   admin: false,
  // });

  // const [parentChildRelationship, setParentChildRelationship] = useState[{
  //   userId: useParams().userId,
  //   parentId: 0
  // }]

  const [isLoading, setIsLoading] = useState(false);

  // // For ONE PARENT
  // const getParentData = () => {
  //   let firstChildParentObj = {};
  //   // First, get the parent-child relationship using the userId (child) and the parentID.
  //   // It comes back as an array (boooo!)
  //   getUserChildByParentAndUser(userId, parentChildRelationship.parentId).then(userChildArrayFromAPI => {
  //     const getOnlyIdProperty = (obj) => {
  //       return obj.id === parentChildRelationship.id;
  //     }

  //     console.log(userChildArrayFromAPI.find(getOnlyIdProperty));
  //     firstChildParentObj = userChildArrayFromAPI.find(getOnlyIdProperty);
  //     setParentChildRelationship(firstChildParentObj);
  //   })

  //   getUserByID(parentChildRelationship.parentId).then(parentFromAPI => {
  //     setParent(parentFromAPI);
  //   })
  // }

  const handleFieldChange = (evt) => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange);
  };

  useEffect(() => {
    getUserByID(userId).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [userId]);

  // useEffect(() => {
  //   getParentData();
  // }, [])

  const updateExistingUser = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    const editedUser = {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      DOB: user.DOB,
      email: user.email,
      admin: user.admin,
    };

    // This is an edit, so I need the id
    updateUser(editedUser).then(() => navigate(`/users/${editedUser.id}`));
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        Update Account
      </Typography>
      <Box sx={{ minWidth: 345, maxWidth: 600 }}>
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth variant="outlined">
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={user.firstName}
              onChange={handleFieldChange}
              type="text"
              placeholder={user.firstName}
            ></TextField>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Last Name"
              onChange={handleFieldChange}
              id="lastName"
              name="lastName"
              type="text"
              placeholder={user.lastName}
              value={user.lastName}
            ></TextField>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Email Address"
              value={user.email}
              onChange={handleFieldChange}
              id="email"
              type="email"
              placeholder={user.email}
            />
          </FormControl>
          <Divider variant="middle" />
          <FormControl fullWidth variant="outlined">
            <TextField
              variant="outlined"
              type="date"
              id="DOB"
              value={user.DOB}
              onChange={handleFieldChange}
              label="Date of Birth"
              helperText={"Current DOB: " + user.DOB}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  id="admin"
                  name="admin"
                  checked={user.admin}
                  onChange={handleFieldChange}
                  inputProps={{ "aria-label": "controlled" }}
                  value={user.admin}
                  disabled
                />
              }
              label="Admin Account"
            />
          </FormGroup>
          <FormGroup>
            <Typography variant="body1">
              Your Parent(s):
              <small>
                <em>coming soon</em>
              </small>
            </Typography>
          </FormGroup>
          <ButtonGroup>
            <Button
              disabled={isLoading}
              onClick={updateExistingUser}
              variant="contained"
              startIcon={<Save />}
            >
              {" "}
              Save Changes
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
