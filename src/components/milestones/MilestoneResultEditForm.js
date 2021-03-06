import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();

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
      timeToComplete: parseInt(milestoneResult.timeToComplete),
      distance: milestoneResult.distance,
      height: milestoneResult.height,
      quantity: parseInt(milestoneResult.quantity),
      remarks: milestoneResult.remarks,
    };

    updateUserMilestone(editedMilestoneResult).then(() =>
      navigate(`/users/${editedMilestoneResult.userId}/achievements`)
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
      <h2>
        Achiever: {milestoneResult.user?.firstName}{" "}
        {milestoneResult.user?.lastName}
      </h2>
      <div className="form-group">
        <h3>Milestone: {thisMilestone.name}</h3>
      </div>
      <h5>Milestone Type: {thisMilestone.milestoneType?.name}</h5>
      <form>
        <div className="form-group">
          <input
            value={milestoneResult.userId}
            id="user"
            type="hidden"
            onChange={handleFieldChange}
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
                onChange={handleFieldChange}
              />
            </div>
          </>
        )}

        {thisMilestone.milestoneType?.id === 2 && (
          <>
            <TextField
              id="distance"
              type="number"
              label="Distance/Length"
              value={milestoneResult.distance}
              onChange={handleFieldChange}
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              focused
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ft</InputAdornment>
                ),
              }}
              inputProps={{
                step: "0.25",
              }}
            />
          </>
        )}

        {thisMilestone.milestoneType?.id === 3 && (
          <>
            <TextField
              type="number"
              value={milestoneResult.height}
              variant="outlined"
              inputProps={{
                maxLength: 999,
                step: "0.25",
              }}
              label="Height"
              id="height"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">inch</InputAdornment>
                ),
              }}
              onChange={handleFieldChange}
              focused
            />
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
                onChange={handleFieldChange}
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
            onChange={handleFieldChange}
            value={milestoneResult.date}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            onChange={handleFieldChange}
            name="remarks"
            id="remarks"
            cols="30"
            rows="5"
            value={milestoneResult.remarks}
          >
            {milestoneResult.remarks}
          </textarea>
        </div>
        <button onClick={updateExistingMilestoneResult} disabled={isLoading}>
          Save Changes
        </button>
        <Link to={`/achievements/${userMilestoneId}`}>
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
            {milestoneResult.validated === true && (
              <>
                <label htmlFor="validated">Yes: </label>
                <input
                  onChange={handleFieldChange}
                  id="validated"
                  name="validated"
                  type="checkbox"
                  checked
                  value={milestoneResult.validated}
                />
              </>
            )}
          </fieldset>
        </div>
      </form>
    </>
  );
};
