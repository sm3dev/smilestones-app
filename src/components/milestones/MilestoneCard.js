import React from 'react'

export const MilestoneCard = ({ milestone, milestoneType }) => {
    return (
        <div>
            <h3>{milestone.name}</h3>
            <p>{milestone.description}</p>
            <h4>{milestoneType.name}</h4>
            <button>Submit Result</button>
            <button>Edit</button>
        </div>
    )
}
