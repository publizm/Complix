import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnauthedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = localStorage.getItem('token') || null;
  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn) {
          alert('User Already Logged-in');
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default UnauthedRoute;
