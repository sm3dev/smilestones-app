import React from "react";

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
      ) : milestoneResult.length ? (
        <>
          <div>Result: {milestoneResult.length}</div>
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
      <button>Edit</button>
      <p>Remarks: {milestoneResult.remarks}</p>
      {milestoneResult.validated ? (
        <div>Validated: Yes</div>
      ) : (
        <div>Validation Needed </div>
      )}
    </>
  );
};
