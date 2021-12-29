import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  FormControl,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Container,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { Home } from "../Home";

const remoteURL = "https://smilestones-app-api.herokuapp.com";

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
    <>
      <Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            component="form"
            onSubmit={handleLogin}
            sx={{
              p: 2,
              marginBlockStart: 4,
              flexShrink: 0,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "30ch",
            }}
          >
            <CardHeader title="Sign In" />
            <CardContent>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  id="email"
                  label="Email Address"
                  className="form-control"
                  placeholder="Email address"
                  autoFocus
                  value={loginUser.email}
                  onChange={handleInputChange}
                ></TextField>
              </FormControl>
            </CardContent>
            <CardActions sx={{ m: 1 }}>
              {" "}
              <Button type="submit" variant="contained" fullWidth>
                Sign In
              </Button>
            </CardActions>
            <Container>
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked disabled />}
                label="Remember me"
              />
              <Typography variant="body1">New to Smilestones? <Link color="secondary" title="Register for an Account" to="/register">Sign up now</Link>.</Typography>
            </Container>
          </Card>
          <main className="continer--login">
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
        </Grid>
      </Grid>
    </>
  );
};
