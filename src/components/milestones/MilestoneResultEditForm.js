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
      getUserMilestoneByID
  }, [])

  return (
  <>
  
  </>
  );
};
