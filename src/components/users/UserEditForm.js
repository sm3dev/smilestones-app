import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserByID, updateUser } from "../../modules/APIManager";

// Edit a User account
export const UserEditForm = () => {
  const [user, setUser] = useState({
    DOB: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  const history = useHistory();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange);
  };

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
    updateUser(editedUser).then(() => history.push("/users"));
  };

  useEffect(() => {
      getUserByID(userId).then(user => {
          setUser(user);
          setIsLoading(false);
      })
  }, [])

  return (
    <>
        <form>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" name="firstName" type="text" value={user.firstName} onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" name="lastName" type="text" value={user.lastName} onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="DOB">Birthdate:</label>
                <input id="DOB" name="DOB" type="date" value={user.DOB} onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" value={user.email} onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="adminStatus">Administrator:</label>
                {/* This input needs to be a switch or radio button */}
                <input id="adminStatus" name="adminStatus" type="checkbox" checked={user.admin ? true : false} value={user.admin} onChange={handleFieldChange} />
            </div>
            <div>
                <button disabled={isLoading} onClick={updateExistingUser}>Save Changes</button>
                <Link to="/users"><button>Cancel</button></Link>
            </div>

        </form>
    </>


  )
};
