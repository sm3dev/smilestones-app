import { BottomNavigation, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import { getUserByID } from '../../modules/APIManager';

export const BottomNav = () => {
    const [activeNavItem, setActiveNavItem] = useState('recents');
    const [loggedInUser, setLoggedInUser] = useState({
        firstName: "Michael",
        lastName: "Wright",
        DOB: "1980-12-11",
        email: "michael@nss.pizza",
        admin: true
    })

    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));

    useEffect(() => {
        getUserByID(currentUserId).then(user => {
            setLoggedInUser(user);
        })
    }, [currentUserId])

    return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showlabels="false" value={activeNavItem} onChange={(event, newActiveNavItem) => {
                    setActiveNavItem(newActiveNavItem);
                }}>
                    <p>Hi, {loggedInUser.firstName}!</p>
                </BottomNavigation>
            </Paper>
            
        </Box>
        
    )
}