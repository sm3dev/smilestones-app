import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../modules/APIManager';
import { UserCard } from './UserCard';

export const UserList = () => {
    const [users, setUsers] = useState([]);

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
            <button>Add User</button>
            <button>Add Child</button>
            </div>
            <div>
                {users.map(user => <UserCard key={user.id} user={user} userMilestones={user.userMilestones} /> )}
            </div>
        </>
        
    )
}
