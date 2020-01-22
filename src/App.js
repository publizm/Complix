import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import Main from './pages/Main';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  // loggedIn?
  // console.log(loggedIn);

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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <BrowserRouter>
        <Switch>
          <AuthedRoute path="/signin" component={Signin} />
          <AuthedRoute path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
