import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllUserMilestonesByUserID } from '../../modules/APIManager';
import { MilestoneResultCard } from './MilestoneResultCard';

// Shows Milestone Results List by a User
export const MilestoneResultListbyUser = () => {
    // the initial state is an empty array
    const [milestoneResults, setMilestoneResults] = useState([]);
    const {userId} = useParams();

    const getMilestonResults = (userId) => {
        return getAllUserMilestonesByUserID(userId).then(userMilestonesFromAPI => {
            setMilestoneResults(userMilestonesFromAPI);
        })
    }

    useEffect(() => {
        getMilestonResults(userId);
        
    }, [userId])

    return (
        <>
            <div>
                {milestoneResults.map(milestoneResult => <MilestoneResultCard key={milestoneResult.id} milestoneResult={milestoneResult} milestone={milestoneResult.milestone} user={milestoneResult.user} />) }
            </div>
        </>
    )
}
