import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';

import UnauthedRoute from './components/Auth/UnauthedRoute';
import AuthedRoute from './components/Auth/AuthedRoute';
import { history } from './redux/create';
import MainContainer from './containers/MainContainer';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <ConnectedRouter history={history}>
        <Switch>
          <UnauthedRoute path="/signin" component={Signin} />
          <AuthedRoute path="/" component={MainContainer} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
