import React from 'react'
import { useHistory } from 'react-router'

export const MyUserCard = ({ user, handleDeleteUser }) => {
    // const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

    const history = useHistory();
    // I want to be able to show the total number of Milestone Achievements on the same line that links to the User's Milestone Achievements view

    return (
        <>
        <h3>{user.firstName} {user.lastName}</h3>
        <div>Age: {user.DOB}</div>
        {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}
        <button className="userMilestone__link" onClick={() => history.push(`/achievements/user/${user.id}`)}> {user.firstName}'s Milestone Achievements 
        </button>
        <button onClick={() => history.push(`/users/${user.id}/edit`)}>Manage</button>
        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        <hr/>
        </>
    )
}