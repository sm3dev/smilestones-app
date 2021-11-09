import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  deleteUser,
  getAllUsers,
} from "../../modules/APIManager";
import { UserCard } from "./UserCard";

// show all user accounts in the database
export const UserList = () => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

  const [users, setUsers] = useState([]);
  const history = useHistory();

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
       <p>View All Smilestoners<small><em> No, that definitely won't work</em></small></p>
      <div>
        <button
          className="my-profile__button"
          onClick={() => history.push(`/users/${currentUserId}`)}>
          My Account{" "}
          <small>
            <em>coming soon</em>
          </small>
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/users/create")}>Add User</button>
        <button onClick={() => history.push("/users/create")}>
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
