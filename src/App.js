import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import Main from './pages/Main';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import UnauthedRoute from './components/UnauthedRoute';
import AuthedRoute from './components/AuthedRoute';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <BrowserRouter>
        <Switch>
          <UnauthedRoute path="/signin" component={Signin} />
          <AuthedRoute path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
