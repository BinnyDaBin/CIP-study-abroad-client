import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';
import Container from '@material-ui/core/Container';
import Home from './components/pages/Home';
import CourseSearch from './components/courses/CourseSearch';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import ConfirmationSend from './components/auth/ConfirmationSend';
import ConfirmationSuccess from './components/auth/ConfirmationSuccess';
import ForgotPassword from './components/auth/ForgotPassword';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Container maxWidth='lg' style={{ marginTop: 100 }}>
            <Alerts />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/courses' component={CourseSearch} />
              <Route
                exact
                path='/login'
                render={props => (
                  <Fragment>
                    <Login />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/register'
                render={props => (
                  <Fragment>
                    <Register />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/confirmation-send'
                render={props => (
                  <Fragment>
                    <ConfirmationSend />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/confirmation-success/:token'
                render={props => (
                  <Fragment>
                    <ConfirmationSuccess token={props.match.params.token} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/forgot-password'
                render={props => (
                  <Fragment>
                    <ForgotPassword />
                  </Fragment>
                )}
              />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
