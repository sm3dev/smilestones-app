import React from 'react'

export const UserCard = ({ user, userMilestones }) => {

    return (
        <>
        <h3>{user.firstName}</h3>
        <div>Age: {user.DOB}</div>
        <div>
            {/* I need to map through the array of userMilestones
            <ul>{userMilestones.map(userMilestone => key=userMilestones.id
                <li>userMilestone.milestoneId</li>)
            }</ul>  */}
                
        </div>
        <button>Manage</button>
        <button>Delete</button>
        <div></div>
            
        </>
    )
}
