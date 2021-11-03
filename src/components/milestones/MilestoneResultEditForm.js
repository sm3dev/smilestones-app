import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getMilestoneByID,
  getUserMilestoneByID,
  updateUserMilestone,
} from "../../modules/APIManager";

export const MilestoneResultEditForm = () => {
  const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: parseInt(useParams().milestoneId),
    userId: 0,
    date: "",
    validated: true,
    timeToComplete: 0,
    distance: 0,
    height: 0,
    quantity: 0,
    remarks: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { userMilestoneId } = useParams();
  const history = useHistory();

  const [thisMilestone, setThisMilestone] = useState({
    milestoneTypeId: 0,
    description: "",
    name: "",
    repeater: false,
  });

  const handleFieldChange = (evt) => {
    evt.preventDefault();
    const stateToChange = { ...milestoneResult };
    stateToChange[evt.target.id] = evt.target.value;
    setMilestoneResult(stateToChange);
  };

  const getMilestoneData = () => {
    getUserMilestoneByID(userMilestoneId).then((userMilestoneData) => {
      const currentMilestoneId = userMilestoneData.milestoneId;
      getMilestoneByID(currentMilestoneId).then((milestoneFromAPI) => {
        setThisMilestone(milestoneFromAPI);
      });
    });
  };

  const updateExistingMilestoneResult = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    const editedMilestoneResult = {
      id: userMilestoneId,
      milestoneId: parseInt(milestoneResult.milestoneId),
      userId: milestoneResult.userId,
      date: milestoneResult.date,
      validated: milestoneResult.validated,
      timeToComplete: milestoneResult.timeToComplete,
      distance: milestoneResult.distance,
      height: milestoneResult.height,
      quantity: milestoneResult.quantity,
      remarks: milestoneResult.remarks,
    };

    updateUserMilestone(editedMilestoneResult).then(() =>
      history.push("/achievements")
    );
  };

  useEffect(() => {
    getUserMilestoneByID(userMilestoneId).then((milestoneResult) => {
      setMilestoneResult(milestoneResult);
      setIsLoading(false);
    });
  }, [userMilestoneId, thisMilestone]);

  useEffect(() => {
    getMilestoneData();
    setIsLoading(false);
  }, []);

  return (
    <>
      <h1>Update an Achievement</h1>
      <div className="form-group">
        <h2>Milestone: {thisMilestone.name}</h2>
      </div>
      <div>Milestone Type: {thisMilestone.milestoneType?.name}</div>
      <form>
        <div className="form-group">
          <input
            value={milestoneResult.userId}
            id="user"
            type="hidden"
            onChange={handleFieldChange}
          />
        </div>

        {thisMilestone.milestoneType?.id === 1 ? (
          <>
            <div className="form-group">
              <label htmlFor="timeToComplete">Your Time:</label>
              <input
                value={milestoneResult.timeToComplete}
                id="timeToComplete"
                type="text"
                onChange={handleFieldChange}
              />
            </div>
            <div className="form-group">
              {/* STRETCH: Do not allow a future date to be input */}
              <label htmlFor="date">Date Milestone Achieved:</label>
              <input
                required
                id="date"
                name="date"
                type="date"
                onChange={handleFieldChange}
                value={milestoneResult.date}
              />
            </div>
          </>
        ) : thisMilestone.milestoneType?.id === 2 ? (
          <>
            <div className="form-group">
              <label htmlFor="distance">Distance/Length:</label>
              <input
                id="distance"
                type="number"
                value={milestoneResult.distance}
                onChange={handleFieldChange}
              />
            </div>
            <div className="form-group">
              {/* STRETCH: Do not allow a future date to be input */}
              <label htmlFor="date">Date Milestone Achieved:</label>
              <input
                required
                id="date"
                name="date"
                type="date"
                onChange={handleFieldChange}
                value={milestoneResult.date}
              />
            </div>
          </>
        ) : thisMilestone.milestoneType?.id === 3 ? (
          <>
            <div className="form-group">
              <label htmlFor="height">Height:</label>
              <input
                id="height"
                type="number"
                value={milestoneResult.height}
                onChange={handleFieldChange}
              />
            </div>
            <div className="form-group">
              {/* STRETCH: Do not allow a future date to be input */}
              <label htmlFor="date">Date Milestone Achieved:</label>
              <input
                required
                id="date"
                name="date"
                type="date"
                onChange={handleFieldChange}
                value={milestoneResult.date}
              />
            </div>
          </>
        ) : thisMilestone.milestoneType?.id === 4 ? (
          <>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={milestoneResult.quantity}
                onChange={handleFieldChange}
              />
            </div>
            <div className="form-group">
              {/* STRETCH: Do not allow a future date to be input */}
              <label htmlFor="date">Date Milestone Achieved:</label>
              <input
                required
                id="date"
                name="date"
                type="date"
                onChange={handleFieldChange}
                value={milestoneResult.date}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              {/* STRETCH: Do not allow a future date to be input */}
              <label htmlFor="date">Achievement Date:</label>
              <input
                required
                id="date"
                name="date"
                type="date"
                onChange={handleFieldChange}
                value={milestoneResult.date}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            onChange={handleFieldChange}
            name="remarks"
            id="remarks"
            cols="30"
            rows="10"
            value={milestoneResult.remarks}
          >
            {milestoneResult.remarks}
          </textarea>
        </div>
        <button onClick={updateExistingMilestoneResult} disabled={isLoading}>
          Save Changes
        </button>
        <Link to="/achievements">
          <button>Cancel</button>
        </Link>
        <div>
          <h4>More About This Milestone</h4>
          <div className="form-group">
            <p>
              Description:
              <br />
              {thisMilestone.description}
            </p>
          </div>
          <fieldset className="form-group">
            <legend>Validated:</legend>
            <label htmlFor="validated">Yes: </label>
            <input
              onChange={handleFieldChange}
              id="validated"
              name="validated"
              type="checkbox"
              checked
              value={milestoneResult.validated}
            />
          </fieldset>
        </div>
      </form>
    </>
  );
};
