import React from 'react';
import { Route } from 'react-router';
import { Home } from './Home';
import { MilestoneList } from './milestones/MilestoneList';

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/milestones">
                <MilestoneList />
            </Route>
            
        </>
    )
}
