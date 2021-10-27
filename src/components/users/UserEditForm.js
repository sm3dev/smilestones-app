import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAllParents, getAllUserChildByUserID, getUserByID, updateUser } from "../../modules/APIManager";

// Edit a User account
export const UserEditForm = () => {
  const [user, setUser] = useState({
    DOB: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
  });

  const [parents, setParents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  const history = useHistory();

  // A updated parent-child relationship (usersChildren object) needs to take in either a parentId or a userId the assign the other. It makes sense to pass-in the new user and assign that to userID, then assign parentId based on what is selected in the Parent Select input field
  const [userParentChild, setUserParentChild] = useState({
    userId: useParams().userId,
    parentId: 0,
  });

  //  I need a fetch that gets all parent users (for now get all Admins)
const getParents = () => {
  // after the parent data comes back from the API, update the state with setParents
  getAllParents().then((parentsFromAPI) => {
    setParents(parentsFromAPI);
  });
};

const getChildParentRelationships = () => {
  getAllUserChildByUserID(userId).then(arrayOfRelationships => {
    let arrayOfRelationships.map
  })
}

  const handleFieldChange = (evt) => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange);
  };

  const handleControlledInputChangeParent = (event) => {
    // When changing a state object or array, always create a copy, make changes, and then set state.
    const newuserParentChild = { ...userParentChild }
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
      getUserByID(userId).then(user => {
          setUser(user);
          setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    getParents();
  }, []);

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
    updateUser(editedUser).then(() => history.push("/users"))
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleFieldChange}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleFieldChange}/>
        </div>
        <div>
          <label htmlFor="DOB">Birthdate:</label>
          <input
            id="DOB"
            name="DOB"
            type="date"
            value={user.DOB}
            onChange={handleFieldChange}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleFieldChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="parent">Select Your Parent's Name:</label>
          <select
            value={userParentChild.parentId}
            name="parentId"
            id="parentId"
            onChange={handleControlledInputChangeParent}>
            <option value="0">Select a Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id} user={userId}>
                {parent.firstName} {parent.lastName}
              </option>
            ))}
          </select>
          {/* <input id="parent" type="text" required placeholder="Parent name" value={user.lastName} /> */}
        </div>
        <div>
          <label htmlFor="adminStatus">Administrator:</label>
          {/* This input needs to be a switch or radio button */}
          <input
            id="adminStatus"
            name="adminStatus"
            type="checkbox"
            checked={user.admin ? true : false}
            value={user.admin}
            onChange={handleFieldChange}/>
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
    </>
  );
};
