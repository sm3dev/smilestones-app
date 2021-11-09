import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, Route, Routes } from "react-router";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { BottomNav } from "./nav/BottomNav";
import { NavBar } from "./nav/NavBar";
import "./Smilestones.css";
import { Home } from "./Home";

export const Smilestones = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Layout />} />
  </Routes>
);

const Layout = () => {
  <Home />
  if (sessionStorage.getItem("smilestones_user")) {
    return (
      <>
        <NavBar />
        <Container maxWidth={false}>
          <Box sx={{ flexGrow: 1 }}>
            <ApplicationViews />
          </Box>
        </Container>
        <BottomNav />
      </>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};
