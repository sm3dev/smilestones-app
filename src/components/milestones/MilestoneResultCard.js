import { Link } from "react-router-dom";

// const remoteURL = "http://localhost:7777";
export const MilestoneResultCard = ({
  milestoneResult,
  milestone,
  user,
  handleDeleteMilestoneResult
}) => {

  // const thisMilestoneTypeId = parseInt(milestone.milestoneTypeId)

  // //fetch milestoneType info by id show the properties where needed
  // const getMilestoneTypeData = (thisMilestoneTypeId) => {
  //   return fetch(`${remoteURL}/milestoneTypes/${thisMilestoneTypeId}`).then(results => results.json())
  // }

  return (
    <>
      <h2>{user.firstName}'s Milestone</h2>
      {/* <h4>Milestone Type {() => {getMilestoneTypeData(milestone.milestoneTypeId)}}</h4> */}
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
        <div>Date Achieved: {milestoneResult.date}</div>
      )}
      {milestoneResult.validated === true ? (
        <div>Validated: Yes</div>
      ) : (
        <div>Validation Needed -- Click <strong>Edit</strong> Button to Validate</div>
      )}
      <div>
        <Link to={`/achievements/${milestoneResult.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDeleteMilestoneResult(milestoneResult.id)}>
          Delete
        </button>
      </div>
      <button>Milestone Details <small>placeholder for expanding card</small></button>
      <p>Remarks: {milestoneResult.remarks}</p>
      <hr />
    </>
  );
};
