import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { updateUserMilestone } from '../../modules/APIManager';

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

    const { userMilestoneId } = useParams();
    const history = useHistory();

    const handleFieldChange = (event) => {
        const stateToChange = { ...milestoneResult };
        stateToChange[event.target.id] = event.target.value;
        setMilestoneResult(stateToChange);
    }

    const updateExistingUserMilestone = (event) => {
        event.preventDefault();

        // This is an encodeURIComponent, we need the id
        const editedUserMilestone = {
            id: userMilestoneId,
            milestoneId: milestoneResult.milestoneId,
            userId: milestoneResult.userId,
            date: milestoneResult.date,
            validated: milestoneResult.validated,
            timeToComplete: milestoneResult.timeToComplete,
            distance: milestoneResult.distance,
            quantity: milestoneResult.quantity,
            remarks: milestoneResult.remarks
        };

        updateUserMilestone(editedUserMilestone).then(() => history.push(`achievements/user/${editedUserMilestone.userId}`))
    }


    return (
        <>
            
        </>
    )
}
