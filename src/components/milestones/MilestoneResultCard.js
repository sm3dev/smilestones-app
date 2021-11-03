import React from "react";
import { Link } from "react-router-dom";

// const remoteURL = "http://localhost:7777";
export const MilestoneResultCard = ({ milestoneResult, milestone, user }) => {
  // const thisMilestoneTypeId = parseInt(milestone.milestoneTypeId)

  // //fetch milestoneType info by id show the properties where needed
  // const getMilestoneTypeData = (thisMilestoneTypeId) => {
  //   return fetch(`${remoteURL}/milestoneTypes/${thisMilestoneTypeId}`).then(results => results.json())
  // }

  return (
    <>
      <Link to={`/achievements/${milestoneResult.id}`}>
        <h2>{user.firstName}'s Milestone Achievement</h2>
      </Link>
      {/* <h4>Milestone Type {() => {getMilestoneTypeData(milestone.milestoneTypeId)}}</h4> */}
      <h3>{milestone.name}</h3>
      <p>{milestone.description}</p>
      <div>Date Achieved: {milestoneResult.date}</div>

      {milestoneResult.timeToComplete !== 0 && (
        <>
          <div>Time &#40;seconds&#41;: {milestoneResult.timeToComplete}</div>
        </>
      )}

      {milestoneResult.distance !== 0 && (
        <>
          <div>Distance &#40;feet&#41;: {milestoneResult.distance}</div>
        </>
      )}

      {milestoneResult.height !== 0 && (
        <>
          <div>Height &#40;inches&#41;: {milestoneResult.height}</div>
        </>
      )}

      {milestoneResult.quantity !== 0 && (
        <>
          <div>Amount: {milestoneResult.quantity}</div>
        </>
      )}

      <div>
        <button>
          More <small>placeholder for expanding card</small>
        </button>
      </div>
      <div>
        <Link to={`/achievements/${milestoneResult.id}`}>
          <button>Achievement Details</button>
        </Link>
      </div>

      <p>Remarks: {milestoneResult.remarks}</p>
      <hr />
    </>
  );
};
