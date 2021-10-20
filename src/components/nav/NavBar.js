import React from 'react';
import { Link } from 'react-router-dom'
import "./NavBar.css"

export const NavBar = () => {
    return (
        <div>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Smilestones</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/milestones">Milestones</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/users">New User</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/login">Login</Link>
                </li>
            </ul>
            
        </div>
    )
}
