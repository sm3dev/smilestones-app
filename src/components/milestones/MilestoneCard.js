import React from 'react'

export const MilestoneCard = ({ milestone }) => {
    return (
        <div>
            <h3>{milestone.name}</h3>
            <p>{milestone.description}</p>
            <h4>{milestone.milestoneTypeId}</h4>
            <button>Submit Result</button>
            <button>Edit</button>
        </div>
    )
}
