import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Home } from "../Home";

const remoteURL = "https://git.heroku.com/smilestones-app-api.git";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({ email: "" });
  const [existDialog, setExistDialog] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newUser = { ...loginUser };
    newUser[event.target.id] = event.target.value;
    setLoginUser(newUser);
  };

  const existingUserCheck = () => {
    return fetch(`${remoteURL}/users?email=${loginUser.email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        console.log(exists);
        // The user is saved under key smilestones_user in Session Storage.
        sessionStorage.setItem("smilestones_user", exists.id);
        sessionStorage.setItem("smilestones_admin", exists.admin);
        sessionStorage.setItem("smilestones_userObj", exists);
        navigate("/");
      } else {
        setExistDialog(true);
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" open={existDialog}>
        <div>{"User does not exist"}</div>
        <div>
          <button
            className="button--close"
            onClick={(e) => setExistDialog(false)}
          >
            Close
          </button>
        </div>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Smilestones</h1>
          <h2>Please sign-in to get started</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              value={loginUser.email}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <NavLink to="/register">
          <Button variant="outlined">Register for an account</Button>
        </NavLink>
      </section>
    </main>
  );
};
