const remoteURL = "http://localhost:7777";

// ******* USERS ******************************************

// get All Users
export const getAllUsers = () => {
    return fetch(`${remoteURL}/users`).then(results => results.json())
}

// get UserByID
export const getUserByID = (id) => {
    // expand userMilestones to fetch each of the user's milestones
    return fetch(`${remoteURL}/users/${id}?_embed=userMilestones`).then(results => results.json())
}

// Get All of Child Users of a Parent by Parent ID; Pass-in parentID
export const getAllChildrenByParentID = (id) => {
    
    // All Users Children by Parent ID expand User (children)
    return fetch(`${remoteURL}usersChildren?parentId=${id}&_expand=user`).then(results => results.json())
}

// Add New User
export const addUser = (newUser) => {
    return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then(results => results.json());
}

// Update a User
export const updateUser = (editedUser) => {
    return fetch(`${remoteURL}/users`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
    }).then(data => data.json());
}

// Delete a User by ID
export const deleteUser = (id) => {
    return fetch(`${remoteURL}/users/${id}`, {
        method: "DELETE"
    }).then(results => results.json())
}

// ******* USER MILESTONES aka Milestone Results ******************************************

// Get All of a User's Milestones by user ID;
export const getAllUserMilestonesByUserID = (id) => {

    // User Milestones by userID expand Milestone and User
    return fetch(`${remoteURL}/userMilestones/?userId=${id}&_expand=milestone&_expand=user`).then(results => results.json())
}

// Add New User Milestone
export const addNewUserMilestone = (newUserMilestone) => {
    return fetch(`${remoteURL}/userMilestones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserMilestone),
    }).then(results => results.json());
}

// Get User Milestone by ID
export const getUserMilestoneByID = (id) => {

    // User Milestones by userID expand Milestone and User
    return fetch(`${remoteURL}/userMilestones/${id}?_expand=user&_expand=milestone`).then(results => results.json())
}

// Update User Milestone by ID
export const updateUserMilestone = (editedUserMilestone) => {
    return fetch(`${remoteURL}/userMilestones`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserMilestone),
    }).then(data => data.json());
}

// Delete User Milestone by ID
export const deleteUserMilestone = (id) => {
    return fetch(`${remoteURL}/userMilestones/${id}`, {
        method: "DELETE"
    }).then(results => results.json())
}

// ******* MILESTONES ******************************************

// Get All Milestones
export const getAllMilestones = () => {

    // All Milestones expanded Milestone Type embed userMilestones
    return fetch(`${remoteURL}/milestones/?_expand=milestoneType&_embed=userMilestones`).then(results => results.json())
}
