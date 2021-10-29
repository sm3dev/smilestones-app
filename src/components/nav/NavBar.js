import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'
import "./NavBar.css"
import { useHistory } from "react-router";

export const NavBar = () => {
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
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
                <li className="navbar__item">
                    <Link className="navbar__link" to="/users">Users</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={{pathname: `/users/${currentUserId}/yourKids`}}>My Kids</Link>
                </li>
                <li className="navbar__item">
                    <Button onClick={ () => {sessionStorage.clear(); history.push(`/login`)}}>Log out</Button>
                </li>
            </ul>
            
        </>
    )
}
