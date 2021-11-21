import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, Route, Routes } from "react-router";
// import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { BottomNav } from "./nav/BottomNav";
import { NavBar } from "./nav/NavBar";
import "./Smilestones.css";
import { Home } from "./Home";
import { MilestoneCard } from "./milestones/MilestoneCard";
import { MilestoneList } from "./milestones/MilestoneList";
import { MilestoneResultDetail } from "./milestones/MilestoneResultDetail";
import { MilestoneResultEditForm } from "./milestones/MilestoneResultEditForm";
import { MilestoneResultForm } from "./milestones/MilestoneResultForm";
import { MilestoneResultList } from "./milestones/MilestoneResultList";
import { MilestoneResultListbyUser } from "./milestones/MilestoneResultListbyUser";
import { MyUserList } from "./users/MyUserList";
import { UserEditForm } from "./users/UserEditForm";
import { UserForm } from "./users/UserForm";
import { UserList } from "./users/UserList";
import { UserProfile } from "./users/UserProfile";

export const Smilestones = () => {
  return (
    <>
      <NavBar />
      {sessionStorage.getItem("smilestones_user") ? (
        <>
          {" "}
          <Container maxWidth={false}>
            <Box sx={{ flexGrow: 1 }}>
              <ApplicationViews />
            </Box>
          </Container>
          <BottomNav />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="milestones" element={<MilestoneList />}>
          <Route path=":milestoneId" element={<MilestoneCard />} />
        </Route>
        <Route
          path="milestones/:milestoneId/achievements/create"
          element={<MilestoneResultForm />}
        />

        <Route path="achievements" element={<MilestoneResultList />} />
        <Route
          path="achievements/:userMilestoneId/edit"
          element={<MilestoneResultEditForm />}
        />
        <Route
          path={"achievements/:userMilestoneId"}
          element={<MilestoneResultDetail />}
        />

        <Route path="/users" element={<UserList />} />
        <Route path="users/:userId" element={<UserProfile />} />
        <Route path="users/create" element={<UserForm />} />
        <Route
          path={"users/:userId/achievements"}
          element={<MilestoneResultListbyUser />}
        />
        <Route path="users/:userId/edit" element={<UserEditForm />} />
        <Route path="users/:userId/myKids" element={<MyUserList />} />
      </Routes>
    </>
  );
};
