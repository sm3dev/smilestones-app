import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  addNewUserMilestone,
  getMilestoneByID,
} from "../../modules/APIManager";

export const MilestoneResultForm = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: parseInt(useParams().milestoneId),
    userId: currentUserId,
    date: "",
    validated: true,
    timeToComplete: 0,
    distance: 0,
    height: 0,
    quantity: 0,
    remarks: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [thisMilestone, setThisMilestone] = useState({
    milestoneTypeId: 0,
    description: "",
    name: "",
    repeater: false,
  });

  const history = useHistory();

  const handleValidatedTrueFalse = (stringAnswer) => {
    let result;
    if (stringAnswer === "true") {
      result = true;
    } else {
      result = false;
    }
    return result;
  };

  const handleControlledInputChange = (event) => {
    const newMilestoneResult = { ...milestoneResult };
    let selectedVal = event.target.value;

    // forms always provide values as strings. But we want to save the ids as numbers.
    // I need a function that makes my number values save as integers and not strings. I can add on to this conditional. BOOM!
    if (
      event.target.id.includes("Id") ||
      event.target.id.includes("timeToComplete") ||
      event.target.id.includes("distance") ||
      event.target.id.includes("height") ||
      event.target.id.includes("quantity")
    ) {
      selectedVal = parseInt(selectedVal);
    }

    // run function tht makes the value a boolean that gets saved to the MilestoneResult
    if (event.target.id === "validated") {
      selectedVal = handleValidatedTrueFalse(event.target.value);
    }

    // set the property to the new value
    newMilestoneResult[event.target.id] = selectedVal;

    // update states
    setMilestoneResult(newMilestoneResult);
  };

  const getMilestoneData = () => {
    getMilestoneByID(milestoneResult.milestoneId).then((milestoneFromAPI) => {
      setThisMilestone(milestoneFromAPI);
    });
  };

  useEffect(() => {
    getMilestoneData();
    setIsLoading(false);
  }, [milestoneResult]);

  const handleClickSaveTask = (event) => {
    event.preventDefault();
    setIsLoading(true);

    addNewUserMilestone(milestoneResult).then(() =>
      history.push(`/achievements`)
    );
  };

  return (
    <>
      <h1>New Milestone Achievement</h1>
      <h2>Milestone: {thisMilestone.name}</h2>
      <h4>Type: {thisMilestone.milestoneType?.name}</h4>
      <form>
        <div className="form-group">
          <input
            value={milestoneResult.userId}
            id="user"
            type="hidden"
            onChange={handleControlledInputChange}
          />
        </div>

        {thisMilestone.milestoneType?.id === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="timeToComplete">
                Your Time &#40;seconds&#41;:
              </label>
              <input
                value={milestoneResult.timeToComplete}
                id="timeToComplete"
                type="number"
                onChange={handleControlledInputChange}
              />
            </div>
          </>
        )}

        {thisMilestone.milestoneType?.id === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="distance">Distance/Length &#40;feet&#41;:</label>
              <input
                id="distance"
                type="number"
                value={milestoneResult.distance}
                onChange={handleControlledInputChange}
              />
            </div>
          </>
        )}

        {thisMilestone.milestoneType?.id === 3 && (
          <>
            <div className="form-group">
              <label htmlFor="height">Height &#40;inches&#41;:</label>
              <input
                id="height"
                type="number"
                value={milestoneResult.height}
                onChange={handleControlledInputChange}
              />
            </div>
          </>
        )}

        {thisMilestone.milestoneType?.id === 4 && (
          <>
            <div className="form-group">
              <label htmlFor="quantity">Amount:</label>
              <input
                id="quantity"
                type="number"
                value={milestoneResult.quantity}
                onChange={handleControlledInputChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          {/* STRETCH: Do not allow a future date to be input */}
          <label htmlFor="date">Achievement Date:</label>
          <input
            required
            id="date"
            name="date"
            type="date"
            onChange={handleControlledInputChange}
            value={milestoneResult.date}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            onChange={handleControlledInputChange}
            name="remarks"
            id="remarks"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <fieldset className="form-group">
          <legend>Validated:</legend>
          <label htmlFor="validated">Yes: </label>
          <input
            onChange={handleControlledInputChange}
            id="validated"
            name="validated"
            type="checkbox"
            checked
            value="true"
          />
        </fieldset>
        <button
          onClick={handleClickSaveTask}
          disabled={isLoading}
          className="milestoneResult save__button"
        >
          Save Achievement
        </button>
        <Link to="/milestones">
          <button>Cancel</button>
        </Link>
        <div>
          <h4>More About This Milestone</h4>
          <div className="form-group">
            <p>{thisMilestone.description}</p>
          </div>
        </div>
      </form>
    </>
  );
};
