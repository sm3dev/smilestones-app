import React from "react";
import { MilestoneResultList } from "./milestones/MilestoneResultList";

export const Home = () => (
  <>
    <h1>Welcome to Smilestones!</h1>
    <em>
      This app allows parents and kids to create and track milestones for kids.
      Smilestones App, Frontend Capstone Project, C51, Nashville Software
      School. And, do it a lot more excitingly than this paragraph reads!
    </em>
    <hr />
    {sessionStorage.getItem("smilestones_user") && <MilestoneResultList />}
  </>
);
