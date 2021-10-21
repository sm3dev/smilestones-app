import React from 'react';
import { Route } from 'react-router';
import { Home } from './Home';
import { MilestoneList } from './milestones/MilestoneList';
import { MilestoneResultList } from './milestones/MilestoneResultList';

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/milestones">
                <MilestoneList />
            </Route>
            <Route exact path="/milestone-achievements">
                <MilestoneResultList />
            </Route>
            
        </>
    )
}
