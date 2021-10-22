import React from 'react'
import { useHistory } from 'react-router'

export const UserCard = ({ user, totalMilestoneResults }) => {

    const history = useHistory();
    // I want to be able to show the total number of Milestone Achievements on the same line that links to the User's Milestone Achievements view

    return (
        <>
        <h3>{user.firstName}</h3>
        <div>Age: {user.DOB}</div>
        {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}
        <button className="userMilestone__link" onClick={() => history.push(`/milestone-achievements/user/${user.id}`)}> <strong>{totalMilestoneResults}</strong> {user.firstName}'s Milestone Achievements 
        </button>
        <button>Manage</button>
        <button>Delete</button>
        <hr/>
            
        </>
    )
}
