import React from 'react'

export const MilestoneCard = ({ milestone, milestoneType }) => {
    return (
        <div>
            <h3>{milestone.name}</h3>
            <p>{milestone.description}</p>
            <h4>{milestoneType.name}</h4>
            {/* Can I get the milestone card to show how many Milestone Achievements this milestone has? */}

            {/* Submit result opens the MilestoneResultForm using milestone.id */}
            <button>Submit Result</button>

             {/* The Edit button should only be visible (OR DISABLED) if the logged-in user is an Admin */}
            <button>Edit</button>
        </div>
    )
}
