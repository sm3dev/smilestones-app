import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserByID, updateUser } from "../../modules/APIManager";
import { useNavigate } from "react-router";
import {
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

// Edit a User account
export const UserEditForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    DOB: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
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
              required
              placeholder={user.firstName}
            ></TextField>
          </FormControl>
        </Box>
        <form>
          {/* <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleFieldChange}
          />
        </div> */}
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="DOB">Birthdate:</label>
            <input
              id="DOB"
              name="DOB"
              type="date"
              value={user.DOB}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleFieldChange}
            />
          </div>
          <div className="form-group">
            {user.admin === true ? (
              <>
                <label htmlFor="admin">Administrator:</label>
                {/* This input needs to be a switch or radio button */}
                <input
                  id="admin"
                  name="admin"
                  type="checkbox"
                  checked
                  value={user.admin}
                  onChange={handleFieldChange}
                />
                <p>
                  Your Parent/Account Manager(s):{" "}
                  <small>
                    <em>coming soon</em>
                  </small>
                  {/* {parent.firstName} {parent.lastName}  */}
                </p>
                {/* <input id="parent" type="text" required placeholder="Parent name" value={user.lastName} /> */}
              </>
            ) : (
              <>
                <p>
                  Your Parent/Account Manager(s):{" "}
                  <small>
                    <em>coming soon</em>
                  </small>
                  {/* {parent.firstName} {parent.lastName}  */}
                </p>
                {/* <input id="parent" type="text" required placeholder="Parent name" value={user.lastName} /> */}
              </>
            )}
          </div>
          <div>
            <button disabled={isLoading} onClick={updateExistingUser}>
              Save Changes
            </button>
            {/* To make delete work here, I think I have to create a User Detail View that will have this Edit form inside it. Maybe I can re-use the UserCard and show it on the same view as this edit form -- like a side-by-side, so you can easily see what the User's info is currently   */}
            {/* <button onClick={() => handleDeleteUser(userId)}>Delete</button> */}
            <Link to="/users">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
};
