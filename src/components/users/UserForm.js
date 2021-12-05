import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addUser, addUserChild, getAllParents } from "../../modules/APIManager";
import { useNavigate } from "react-router";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

// Add New User Account to database
export const UserForm = () => {
  // State will contain both user data as well as an isLoading flag.
  // Define the initial state of the form inputs with useState()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    admin: false,
  });

  // A new parent-child relationship (userParentConnection object) needs to take in either a parentId or a userId the assign the other. It makes sense to pass-in the new user and assign that to userID, then assign parentId based on what is selected in the Parent Select input field
  const [userParentChild, setUserParentChild] = useState({
    userId: 1,
    parentId: "",
  });

  const [parents, setParents] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  // I need a fetch that gets all parent users (for now get all Admins)
  const getParents = () => {
    // after the parent data comes back from the API, update the state with setParents
    getAllParents().then((parentsFromAPI) => {
      setParents(parentsFromAPI);
    });
  };

  // With fetch parent users, I will add each to a dropdown select, so a new user can add their parent when creating the new account

  const handleControlledInputChange = (event) => {
    // When changing a state object or array, always create a copy, make changes, and then set state.
    const newUser = { ...user };
    let selectedVal = event.target.value;

    // forms always provide values as strings, but we want to save the ids as numbers
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    // set the property to the new value
    newUser[event.target.id] = selectedVal;

    // update state
    setUser(newUser);
  };

  const handleControlledInputChangeParent = (event) => {
    // When changing a state object or array, always create a copy, make changes, and then set state.
    const newuserParentChild = { ...userParentChild };
    let selectedVal = event.target.value;

    // forms always provide values as strings, but we want to save the ids as numbers
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    // set the property to the new value
    newuserParentChild[event.target.id] = selectedVal;

    // update state
    setUserParentChild(newuserParentChild);
  };

  useEffect(() => {
    getParents();
  }, []);

  // Run the addUserChild POST fetch call
  const handleClickSaveUser = (event) => {
    event.preventDefault();

    const newParentChild = {
      userId: userParentChild.userId,
      parentId: userParentChild.parentId,
    };

    addUser(user)
      .then((user) => {
        addUserChild(user.id, newParentChild.parentId);
      })
      .then(() => navigate("/users"));
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        Create New Child Account{" "}
      </Typography>
      {/* I want to have this form show a Switch or Radio to choose between Child Account or Parent Account */}
      <Box sx={{ minWidth: 360, width: 345 }}>
        <FormControl fullWidth>
          <InputLabel id="parentId__label">Parent</InputLabel>
          <Select variant="outlined"
            labelId="parentId__label"
            id="parentId"
            value={userParentChild.parentId}
            label="Parent"
            onChange={handleControlledInputChangeParent}
          >
            {parents.map((parent) => (
              <MenuItem key={parent.id} value={parent.id} user={userId}>
                {parent.firstName} {parent.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <form action="">
        <fieldset>
          <label htmlFor="parent">Select Your Parent's Name:</label>
          <select
            value={userParentChild.parentId}
            name="parentId"
            id="parentId"
            onChange={handleControlledInputChangeParent}
          >
            <option value="0">Select a Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id} user={userId}>
                {parent.firstName} {parent.lastName}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            value={userParentChild.userId}
            name="userId"
            id="userId"
            onChange={handleControlledInputChangeParent}
          />
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              onChange={handleControlledInputChange}
              id="firstName"
              type="text"
              required
              placeholder="First Name"
              value={user.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              onChange={handleControlledInputChange}
              id="lastName"
              type="text"
              required
              placeholder="Last Name"
              value={user.lastName}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="DOB">Date of Birth:</label>
            <input
              onChange={handleControlledInputChange}
              id="DOB"
              type="date"
              required
              value={user.DOB}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleControlledInputChange}
              id="email"
              type="email"
              placeholder="Email Address"
              value={user.email}
            />
          </div>
        </fieldset>

        <input id="email" type="hidden" value={user.admin} />
        <button onClick={handleClickSaveUser} className="save__button">
          Create Account
        </button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </>
  );
};
