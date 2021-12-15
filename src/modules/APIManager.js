const remoteURL = "https://git.heroku.com/smilestones-app-api.git";

// ******* USERS ******************************************

// get All Users 
export const getAllUsers = () => {
    // embed userMilestones to access each user's milestone results 
    return fetch(`${remoteURL}/users?_embed=userParentConnection&_embed=userMilestones`).then(results => results.json())
}

// get UserByID
export const getUserByID = (id) => {
    // expand userMilestones to fetch each of the user's milestones
    return fetch(`${remoteURL}/users/${id}?_embed=userParentConnection&_embed=userMilestones`).then(results => results.json())
}

// Get all Parents/Admin User (User Accounts with admin: true)
// Note: Eventually, this will look for a parent-type user account
export const getAllParents = () => {
    // embed userMilestones to access each user's milestone results 
    return fetch(`${remoteURL}/users?admin=true`).then(results => results.json())
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
    return fetch(`${remoteURL}/users/${editedUser.id}`, {
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

// ******* USER-CHILD RELATIONSHIP ******************************************

// Get All Child Users of a Parent by Parent ID; Pass-in parentID; expand user
export const getAllChildrenConnectionsByParentID = (parentId) => {
    
    // All Users Children by Parent ID expand User (children)
    return fetch(`${remoteURL}/userParentConnection?parentId=${parentId}&_expand=user`).then(results => results.json())
}

// Get a User-Child relationship should be a fetch that looks for a given userId and a given parentId. Then, that ARRAY object result should be parsed and mapped to grab the id of the first result
export const getUserChildByParentAndUser = (aUserId, aParentId) => {
    // This returns an ARRAY
    return fetch(`${remoteURL}/userParentConnection/?userId=${aUserId}&parentId=${aParentId}`).then(results => results.json())
}

// Get All User-Parent relationships by userID. Returns an ARRAY
export const getAllUserChildByUserID = (userId) => {
    // this returns an ARRAY
    return fetch(`${remoteURL}/userParentConnection/?userId=${userId}`).then(results => results.json())
}

// Add new User-Parent relationship
export const addUserChild = (newUserID, selectedParentID) => {
    return fetch(`${remoteURL}/userParentConnection`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userId": newUserID,
            "parentId": selectedParentID
          })
    }).then(results => results.json());
}

// Get a User-Child relationship 
export const getUserChild = (userIdToEdit, parentIdToEdit) => {
    return fetch(`${remoteURL}/userParentConnection`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userId": userIdToEdit,
            "parentId": parentIdToEdit
          })
    }).then(results => results.json());
}

// Update a User-Child relationship 
export const updateUserChild = (userParentObj, userToEdit, parentToEdit) => {
    return fetch(`${remoteURL}/userParentConnection/${userParentObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userId": userToEdit.id,
            "parentId": parentToEdit.id
          })
    }).then(results => results.json());
}

// ******* USER MILESTONES aka Milestone Results ******************************************

// Get All User Milestones;
export const getAllUserMilestones = () => {

    // User Milestones and expand Milestone and User
    return fetch(`${remoteURL}/userMilestones?_expand=milestone&_expand=user`).then(results => results.json())
}

// Get All of a User's Milestones by user ID;
export const getAllUserMilestonesByUserID = (userId) => {

    // User Milestones by userID expand Milestone and User
    return fetch(`${remoteURL}/userMilestones/?userId=${userId}&_expand=milestone&_expand=user`).then(results => results.json())
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
export const getUserMilestoneByID = (milestoneResultId) => {

    // User Milestones by userID expand Milestone and User
    return fetch(`${remoteURL}/userMilestones/${milestoneResultId}?_expand=user&_expand=milestone`).then(results => results.json())
}

// Update User Milestone by ID
export const updateUserMilestone = (editedUserMilestone) => {
    return fetch(`${remoteURL}/userMilestones/${editedUserMilestone.id}`, {
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

// Get Milestone by ID
export const getMilestoneByID = (milestoneId) => {
    return fetch(`${remoteURL}/milestones/${milestoneId}?_expand=milestoneType&_embed=userMilestones`).then(results => results.json())
} 

// ******* MILESTONE TYPES ******************************************
