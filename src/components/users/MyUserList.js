import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { deleteUser, getAllChildrenConnectionsByParentID, getAllUsers } from '../../modules/APIManager';
import { MyUserCard } from './MyUserCard';

// show all user accounts in the database
export const MyUserList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

    const [users, setUsers] = useState([]);
    const [childConnections, setChildConnections] = useState([]);
    
    const history = useHistory();

    // I need to get userParentConnections with parentId values that match my User ID
    // Then, I need to take that result ARRAY and set the state of userParentConnections with it
    // SOLUTION: I need one fetch call that gets userParentConnections, and inside that fetch call, I'll need a conditional that runs a fetch call for Users who have matching userIds from the userParentConnections' fetch call
    const getMyUserChildrenConnections = () => {
        // Fetch call that uses logged-in User Id to get all userParentConnections where logged-in User Id is the parentId value
        getAllChildrenConnectionsByParentID(currentUserId).then(connections => {
            console.log(connections);
            const myConnections = connections.filter(connection => (connection.parentId === currentUserId ));
            console.log(myConnections);
            setChildConnections(myConnections);
        })
    
    }

    const handleDeleteUser = (id) => {
        deleteUser(id).then(() => getAllUsers().then(setUsers))
    }

    useEffect(() => {
        getMyUserChildrenConnections(); 
    }, [])

    return (
        <>
            <h2>My Managed Accounts</h2>
            <div>
                {/* This button with use the current logged-in user's user.id inside of the history.push to go that specific user's profile URL  */}
                <button className="my-profile__button" onClick={() => history.push(`/users/${currentUserId}`)}>My Account <small><em>coming soon</em></small></button>
                
            </div>
            <div>
            <button onClick={() => history.push("/users/create")}>Add User</button>
            <button onClick={() => history.push("/users/create")}>Add Child <small><em>coming soon</em></small></button>
            </div>
            <hr />
            <div>
                {childConnections.map(childConnection => <MyUserCard key={childConnection.id} user={childConnection.user} handleDeleteUser={handleDeleteUser} />)

                }
                {/* {childConnections.map(childConnection => <div userId={childConnection.user.id} key={childConnection.id} handleDeleteUser={handleDeleteUser}>{childConnection.user.firstName} childConnection</div>)
                } */}
            </div>

        </>
        
    )
}
