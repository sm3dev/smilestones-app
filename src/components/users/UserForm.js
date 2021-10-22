import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { addUser } from '../../modules/APIManager';

// Add New User Account to database
export const UserForm = () => {
// State will contain both user data as well as an isLoading flag.
// Define the initial state of the form inputs with useState()
const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      DOB: "",
      admin: false
});

const history = useHistory();

// I need a fetch that gets all parent users

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

// Run the addUserChild POST fetch call
const handleClickSaveUser = (event) => {
    event.preventDefault();

    addUser(user).then(() => history.push("/users"))

}


    return (
        <>
        <h1>Add New Account</h1>
        {/* I want to have this form show a Switch or Radio to choose between Child Account or Parent Account */}
        <form action="">
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input onChange={handleControlledInputChange} id="firstName" type="text" required placeholder="First Name" value={user.firstName} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input onChange={handleControlledInputChange} id="lastName" type="text" required placeholder="Last Name" value={user.lastName} />
            </div>
            <div className="form-group">
                <label htmlFor="parent">Select Your Parent's Name:</label>
                <select></select>
                {/* <input id="parent" type="text" required placeholder="Parent name" value={user.lastName} /> */}
            </div>
            <div className="form-group">
                <label htmlFor="DOB">Date of Birth:</label>
                <input onChange={handleControlledInputChange} id="DOB" type="date" required value={user.DOB} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input onChange={handleControlledInputChange} id="email" type="email" required placeholder="Email Address" value={user.email} />
            </div>
            <input id="email" type="hidden" value={user.admin} />
            <button onClick={handleClickSaveUser} className="save__button">Save User</button>
            <Link to="/users"><button>Cancel</button></Link>
        </form>
            
        </>
    )
}
