import React, { useEffect, useState } from 'react'
import { deleteUserMilestone, getAllUserMilestones } from '../../modules/APIManager';
import { MilestoneResultCard } from './MilestoneResultCard';

// Show ALL milestone results in the database
export const MilestoneResultList = () => {
    // the initial state is an empty array
    const [milestoneResults, setMilestoneResults] = useState([]);

    const getMilestonResults = () => {
        return getAllUserMilestones().then(userMilestonesFromAPI => {
            setMilestoneResults(userMilestonesFromAPI)
        })
    }

    const handleDeleteMilestoneResult = id => {
        deleteUserMilestone(id).then(() => getAllUserMilestones().then(setMilestoneResults))
    }

    useEffect(() => {
        getMilestonResults();
        
    }, [])

    return (
        <>
            <div>
                {milestoneResults.map(milestoneResult => <MilestoneResultCard key={milestoneResult.id} milestoneResult={milestoneResult} milestone={milestoneResult.milestone} user={milestoneResult.user} handleDeleteMilestoneResult={handleDeleteMilestoneResult} />) }
            </div>
        </>
    )
}