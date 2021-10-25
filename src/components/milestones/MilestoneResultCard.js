import React from "react";
import { Link } from "react-router-dom";

export const MilestoneResultCard = ({ milestoneResult, milestone, user }) => {
  return (
    <>
      <h3>{user.firstName}'s Milestone</h3>
      <h4>Milestone Type</h4>
      <h3>{milestone.name}</h3>
      <p>{milestone.description}</p>
      {milestoneResult.timeToComplete ? (
        <>
          <div>Result: {milestoneResult.timeToComplete}</div>
          <div>Achieved on {milestoneResult.date}</div>
        </>
      ) : milestoneResult.distance ? (
        <>
          <div>Result: {milestoneResult.distance}</div>
          <div>Achieved on {milestoneResult.date}</div>
        </>
      ) : milestoneResult.quantity ? (
        <>
          <div>Result: {milestoneResult.quantity}</div>
          <div>Achieved on {milestoneResult.date}</div>
        </>
      ) : (
        <div>Result Date: {milestoneResult.date}</div>
      )}

      <button>Details/More</button>
      <Link to={`/achievements/${milestoneResult.id}/edit`}><button>Edit</button></Link>
      <p>Remarks: {milestoneResult.remarks}</p>
      {milestoneResult.validated ? (
        <div>Validated: Yes</div>
      ) : (
        <div>Validation Needed </div>
      )}
    </>
  );
};
