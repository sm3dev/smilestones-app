import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import "./NavBar.css"
import { useHistory } from "react-router";

export const NavBar = ({ admin }) => {
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
    // const adminCheck = sessionStorage.getItem("smilestones_admin");

    return (
        <>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/milestones">Milestones</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/achievements">Milestone Achievements</Link>
                </li>
                {admin && 
                    <>
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/users">Users</Link>
                    </li>
                    <li className="navbar__item">
                        <Link className="navbar__link" to={{pathname: `/users/${currentUserId}/myKids`}}>My Kids</Link>
                    </li>
                    </>
                }

                <li className="navbar__item">
                    <Link className="navbar__link" to={{pathname: `/users/${currentUserId}`}}>My Profile</Link>
                </li>
                <li className="navbar__item">
                    <Button onClick={ () => {sessionStorage.clear(); history.push(`/login`)}}>Log out</Button>
                </li>
            </ul>
            
        </>
    )
}
