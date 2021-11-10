import React from "react";
import { Route, Routes } from "react-router";
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

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/milestones" element={<MilestoneList />}>
          <Route path=":milestoneId(\d+)" element={<MilestoneCard />} />
          <Route
            path=":milestoneId(\d+)/achievements/create"
            element={<MilestoneResultForm />}
          />
        </Route>

        <Route path="/achievements" element={<MilestoneResultList />}>
          <Route
            path=":userMilestoneId(\d+)/edit"
            element={<MilestoneResultEditForm />}
          />
          <Route
            path={`user/:userId(\d+)`}
            element={<MilestoneResultListbyUser />}
          />
          <Route
            path={":userMilestoneId(\d+)"}
            element={<MilestoneResultDetail />}
          />
        </Route>

        <Route path="users" element={<UserList />}>
          <Route path=":userId(\d+)/edit" element={<UserEditForm />} />
          <Route path="create" element={<UserForm />} />
          <Route path=":userId(\d+)/myKids" element={<MyUserList />} />
          <Route path=":userId(\d+)" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};
