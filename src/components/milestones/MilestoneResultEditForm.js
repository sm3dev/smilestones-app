import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getUserMilestoneByID, updateUserMilestone } from "../../modules/APIManager";

export const MilestoneResultEditForm = () => {
  const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: 0,
    userId: 0,
    date: "",
    validated: false,
    timeToComplete: 0,
    distance: 0,
    quantity: 0,
    remarks: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { userMilestoneId } = useParams();
  const history = useHistory();

  const handleFieldChange = evt => {
      const stateToChange = { ...milestoneResult };
      stateToChange[evt.target.id] = evt.target.value;
      setMilestoneResult(stateToChange);
  }

  const updateExistingMilestoneResult = evt => {
      evt.preventDefault();
      setIsLoading(true);

      const editedMilestoneResult = {
        id: userMilestoneId,
        milestoneId: milestoneResult.milestoneId,
        userId: milestoneResult.userId,
        date: milestoneResult.date,
        validated: milestoneResult.validated,
        timeToComplete: milestoneResult.timeToComplete,
        distance: milestoneResult.distance,
        quantity: milestoneResult.quantity,
        remarks: milestoneResult.remarks
      }

      updateUserMilestone(editedMilestoneResult).then(() => history.push("/achievements"))
  }

  useEffect(() => {
      getUserMilestoneByID().then(milestoneResult => {
          setMilestoneResult(milestoneResult);
          setIsLoading(false);
      })
  }, [])

  return (
  <>
    <h1>Update an Achievement</h1>
    <form>
        <div className="form-group">
            <h2>{milestoneResult.milestoneId}</h2>
            <label htmlFor="milestone">Milestone:</label>
            <input value={milestoneResult.milestoneId} id="milestone" type="text" onChange={handleFieldChange} />
        </div>
        <div>Milestone Type</div>
        <div className="form-group">
            <label htmlFor="user">User: {milestoneResult.userId}</label>
            <input value={milestoneResult.userId} id="user" type="hidden" onChange={handleFieldChange} />
        </div>
        <div className="form-group">
            <label htmlFor="timeToComplete">Time to Complete:</label>
            <input value={milestoneResult.timeToComplete} id="timeToComplete" type="text" onChange={handleFieldChange} />
        </div>
        <div className="form-group">
            <label htmlFor="distance">Distance:</label>
            <input type="text" value={milestoneResult.distance} onChange={handleFieldChange} />
            </div>
        <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="text" value={milestoneResult.quantity} onChange={handleFieldChange} />
            </div>
        <div className="form-group">
            <label htmlFor="date">Achievement Date:</label>
            <input id="date" name="date" type="date" value={milestoneResult.date} onChange={handleFieldChange} />
            </div>
        <div className="form-group">
            <label htmlFor=""></label>
            </div>
        <div className="form-group">
            <label htmlFor=""></label>
            </div>
        <div className="form-group">
            <label htmlFor=""></label>
            </div>
        <div className="form-group">
            <label htmlFor=""></label>
        </div>
    </form>
  </>
  );
};
