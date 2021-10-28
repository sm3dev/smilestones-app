import React from 'react';
import { Route } from 'react-router';
import { Home } from './Home';
import { MilestoneCard } from './milestones/MilestoneCard';
import { MilestoneList } from './milestones/MilestoneList';
import { MilestoneResultEditForm } from './milestones/MilestoneResultEditForm';
import { MilestoneResultForm } from './milestones/MilestoneResultForm';
import { MilestoneResultList } from './milestones/MilestoneResultList';
import { MilestoneResultListbyUser } from './milestones/MilestoneResultListbyUser';
import { UserEditForm } from './users/UserEditForm';
import { UserForm } from './users/UserForm';
import { UserList } from './users/UserList';

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/milestones">
                <MilestoneList />
            </Route>
            <Route exact path="/milestones/:milestoneId(\d+)">
                <MilestoneCard />
            </Route>
            <Route exact path="/achievements">
                <MilestoneResultList />
            </Route>
            <Route exact path="/achievements/:userMilestoneId(\d+)/edit">
                <MilestoneResultEditForm />
            </Route>
            <Route exact path="/milestones/:milestoneId(\d+)/achievements/create">
                <MilestoneResultForm />
            </Route>
            <Route exact path="/achievements/user/:userId(\d+)">
                <MilestoneResultListbyUser />                
            </Route>
            <Route exact path="/users/">
                <UserList />
            </Route>
            <Route exact path="/users/:userId(\d+)/edit">
                <UserEditForm />
            </Route>
            <Route exact path="/users/create">
                <UserForm />
            </Route>
            
        </>
    )
}
