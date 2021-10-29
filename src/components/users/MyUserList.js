import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { deleteUser, getAllChildrenByParentID, getAllUsers } from '../../modules/APIManager';
import { UserCard } from './UserCard';

// show all user accounts in the database
export const MyUserList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

    const [users, setUsers] = useState([]);
    const history = useHistory();

    const getMyChildren = () => {
        // First, look up userParentConnections that have logged-in user's userId as the parentId
        getAllChildrenByParentID(currentUserId).then(usersByParentFromAPI => {
            console.log(usersByParentFromAPI)
            console.log(usersByParentFromAPI.userId)

        })
        // Next, use this result ARRAY to grab the expanded users and set the state of users (setUsers) 

        // Last, pass the user's into the UserCard 

    }
    const getUsers = () => {
        return getAllUsers().then(usersFromAPI => {
            setUsers(usersFromAPI);
        })
    }

    const handleDeleteUser = (id) => {
        deleteUser(id).then(() => getAllUsers().then(setUsers))
    }

    useEffect(() => {
        getUsers(); 
    }, [])

    return (
        <>
            <h2>User Accounts</h2>
            <div>
                {/* This button with use the current logged-in user's user.id inside of the history.push to go that specific user's profile URL  */}
                <button className="my-profile__button" onClick={() => history.push(`/users/${currentUserId}`)}>My Account <small><em>coming soon</em></small></button>
                
            </div>
            <div>
            <button onClick={() => history.push("/users/create")}>Add User</button>
            <button onClick={() => history.push("/users/create")}>Add Child <small><em>coming soon</em></small></button>
            </div>
            <div>
                {users.map(user => <UserCard key={user.id} user={user} userMilestones={user.userMilestones} totalMilestoneResults={user.userMilestones.length} handleDeleteUser={handleDeleteUser} /> )}
            </div>
        </>
        
    )
}
