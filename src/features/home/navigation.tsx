import React from 'react';
import { Route } from 'src/navigation/Route';
import { HomeScreen } from './screens/Home';

export const HOME_ROUTES = {
  itself: '/',
};

export const HomeNavigation = (): JSX.Element => (
  <React.Fragment>
    <Route
      exact
      path={HOME_ROUTES.itself}
      component={HomeScreen}
      //   isPrivateRoute={true}
    />
  </React.Fragment>
);
