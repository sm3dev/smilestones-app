import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import "./Login.css"

const remoteURL = "http://localhost:7777";
export const Register = () => {
    const [registerUser, setRegisterUser] = useState({
        firstName: "",
        lastName: "",
        DOB: "",
        email: "",
        admin: false
    })
    const [conflictDialog, setConflictDialog] = useState(false)

    const history = useHistory();

    const handleInputChange = (event) => {
        const newUser = { ...registerUser };
        newUser[event.target.id] = event.target.value;
        setRegisterUser(newUser);
    };

    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`${remoteURL}/users?email=${registerUser.email}`)
            .then((res) => res.json())
            .then((user) => !!user.length);
    }

    const handleRegister = e => {
        e.preventDefault();

        existingUserCheck().then(userExists => {
            if (!userExists) {
                // If your json-server URL is different, please change it below!
                fetch(`${remoteURL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: registerUser.email,
                        firstName: registerUser.lastName,
                        lastName: registerUser.lastName,
                        DOB: registerUser.DOB,
                        admin: registerUser.admin,
                    }),
                }).then(res => res.json()).then(createdUser => {
                    if (createdUser.hasOwnProperty("id")) {
                        // The user id is saved under the key smilestones_user in session Storage.
                        sessionStorage.setItem("smilestones_user", createdUser.id);
                        history.push("/");
                    }
                })
                
            } else {
                setConflictDialog(true)
            }
        })
    }

    return (
        <main>
        <dialog className="dialog dialog--password" open={conflictDialog}>
            <div>
                {"Account with that email address already exists"}
            </div>
            <button
                className="button--close"
                onClick={(e) => setConflictDialog(false)}>
                Close
            </button>
        </dialog>

        <form className="form--login" onSubmit={handleRegister}>
            <h1 className="h3 mb-3 font-weight-normal">
                Register to Use Smilestones
            </h1>
            <fieldset>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="form-control"
                            placeholder="First name"
                            required
                            autoFocus
                            value={registerUser.firstName}
                            onChange={handleInputChange}
                        />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required
                        value={registerUser.lastName}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="DOB">Date of Birth:</label>
                <input
                    type="date"
                    name="DOB"
                    id="DOB"
                    className="form-control"
                    required
                    value={registerUser.DOB}
                    onChange={handleInputChange}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email address:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                    value={registerUser.email}
                    onChange={handleInputChange}
                />
            </fieldset>

            <input id="admin" type="hidden" value={registerUser.admin} />
            <div>
                <button type="submit"> Register and Sign-in </button>
                
                <Link to="/login">
                    <button>Cancel</button>
                </Link>
            </div>
        </form>
    </main>
    )
}
