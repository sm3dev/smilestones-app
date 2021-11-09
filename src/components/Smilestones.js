import React from "react";
import { Redirect, Route } from "react-router";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { BottomNav } from "./nav/BottomNav";
import { NavBar } from "./nav/NavBar";
import "./Smilestones.css";

export const Smilestones = () => (
  <>
    <Route
      render={() => {
        if (sessionStorage.getItem("smilestones_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
              <BottomNav />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
