import React, { useEffect, useState } from 'react'
import { getAllUserMilestones } from '../../modules/APIManager';
import { MilestoneResultCard } from './MilestoneResultCard';

export const MilestoneResultList = () => {
    // the initial state is an empty array
    const [milestoneResults, setMilestoneResults] = useState([]);

    const getMilestonResults = () => {
        return getAllUserMilestones().then(userMilestonesFromAPI => {
            setMilestoneResults(userMilestonesFromAPI)
        })
    }

    useEffect(() => {
        getMilestonResults();
        
    }, [])

    return (
        <>
            <div>
                {milestoneResults.map(milestoneResult => <MilestoneResultCard key={milestoneResult.id} milestoneResult={milestoneResult} milestone={milestoneResult.milestone} user={milestoneResult.user} />) }
            </div>
        </>
    )
}
