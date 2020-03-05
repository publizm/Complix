import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = localStorage.getItem('token') || null;
  return (
    <Route
      render={props => {
        if (loggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default AuthedRoute;
