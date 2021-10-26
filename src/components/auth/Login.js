import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const remoteURL = "http://localhost:7777";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" });
    const [existDialog, setExistDialog] = useState(false);

    const history = useHistory();

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
          // The user if saved under key smilestones_user in Session Storage.
          sessionStorage.setItem("smilestones_user", exists.id);
          history.push("/");
        } else {
          setExistDialog(true);
        }
      });
    };

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>{"User does not exist"}</div>
                <button
                    className="button--close"
                    onClick={(e) => setExistDialog(false)}>
                    Close
                </button>
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
                <Link to="/register">{"Register for an account"}</Link>
            </section>
        </main>
    )
}
