import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { getAllUsers } from '../../modules/APIManager';
import { UserCard } from './UserCard';

// show all user accounts in the database
export const UserList = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const getUsers = () => {
        return getAllUsers().then(usersFromAPI => {
            setUsers(usersFromAPI);
        })
    }

    useEffect(() => {
        getUsers(); 
    }, [])

    return (
        <>
        <h2>User Accounts</h2>
            <div>
            <button onClick={() => history.push("/users/create")}>Add User</button>
            <button onClick={() => history.push("/users/create")}>Add Child</button>
            </div>
            <div>
                {users.map(user => <UserCard key={user.id} user={user} userMilestones={user.userMilestones} totalMilestoneResults={user.userMilestones.length} /> )}
            </div>
        </>
        
    )
}
