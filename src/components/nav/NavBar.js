import React from 'react';
import { Link } from 'react-router-dom'
import "./NavBar.css"

export const NavBar = () => {
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
                    <Link className="navbar__link" to="/milestone-achievements">Milestone Achievements</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/users">Users</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/login">Login</Link>
                </li>
            </ul>
            
        </>
    )
}
