import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';

import Signin from './pages/Signin';
import NotFound from './pages/NotFound';

import UnauthedRoute from './components/Auth/UnauthedRoute';
import AuthedRoute from './components/Auth/AuthedRoute';

import MainContainer from './containers/MainContainer';
import ResultContainer from './containers/ResultContainer';

import { history } from './redux/create';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <ConnectedRouter history={history}>
        <Switch>
          <UnauthedRoute path="/signin" component={Signin} />
          <AuthedRoute path="/result" component={ResultContainer} />
          <AuthedRoute exact path="/" component={MainContainer} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
