import React from 'react';
import { Route } from 'react-router';
import { Home } from './Home';

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            
        </>
    )
}
