import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../modules/APIManager";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// show all user accounts in the database
export const UserList = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = () => {
    return getAllUsers().then((usersFromAPI) => {
      setUsers(usersFromAPI);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => getAllUsers().then(setUsers));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users Everywhere</h1>
      <p>
        View All Smilestoners
        <small>
          <em> No, that definitely won't work</em>
        </small>
      </p>
      <div>
    
        <button
          className="my-profile__button"
          // onClick={() => <Link to={`user/${currentUserId}`} />}
        >
          <Link to={`/users/${currentUserId}`}>My Account</Link>
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/users/create")}>Add User</button>
        <button onClick={() => navigate("/users/create")}>
          Add Child
          <small>
            <em>coming soon</em>
          </small>
        </button>
      </div>
      <div>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            userMilestones={user.userMilestones}
            totalMilestoneResults={user.userMilestones.length}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </>
  );
};
