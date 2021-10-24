import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { addNewUserMilestone, getMilestoneByID } from '../../modules/APIManager';

export const MilestoneResultForm = () => {
    const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: 0,
    userId: 0,
    date: "",
    validated: false,
    timeToComplete: 0,
    distance: 0,
    quantity: 0,
    remarks: ""
    });

    const [milestone, setMilestone] = useState();
    const { milestoneId } = useParams();

    // I need to have the fetch call that gets the milestone by ID -- getMilestoneByID
    const getMilestones = () => {
        return getMilestoneByID().then(milestoneFromAPI => {
            setMilestone(milestoneFromAPI);
        });
      };

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newMilestoneResult = { ...milestoneResult };
        let selectedVal = event.target.value;

        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }

        // set the property to the new value
        newMilestoneResult[event.target.id] = event.target.value;

        // update statea
        setMilestoneResult(newMilestoneResult);
    }

    const handleClickSaveTask = (event) => {
        event.preventDefault();

        // This is an encodeURIComponent, we need the id
        const newMilestone = {
            milestoneId: milestoneResult.milestoneId,
            userId: milestoneResult.userId,
            date: milestoneResult.date,
            validated: milestoneResult.validated,
            timeToComplete: milestoneResult.timeToComplete,
            distance: milestoneResult.distance,
            quantity: milestoneResult.quantity,
            remarks: milestoneResult.remarks
        };

        addNewUserMilestone(newMilestone).then(() => history.push(`achievements/`))
    }

    return (
        <>
            <h1>New Milestone Result</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor=""></label>
                    <input type="text" />
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
    )
}
