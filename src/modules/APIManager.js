const remoteURL = "http://localhost:7777";

// get All Users
export const getAllUsers = () => {
    return fetch(`${remoteURL}/users`).then(results => results.json())
}

// get UserByID
export const getUserByID = (id) => {
    // expand userMilestones to fetch each of the user's milestones
    return fetch(`${remoteURL}/users/${id}?_embed=userMilestones`)
}

// Get All Milestones

// Get All of a User's Milestones by ID

// Get All of 