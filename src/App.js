import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CourseSearch from './components/pages/CourseSearch';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/courses'
          render={props => (
            <Fragment>
              <CourseSearch />
            </Fragment>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
