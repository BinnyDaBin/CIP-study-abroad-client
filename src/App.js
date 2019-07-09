import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import Requestor from './components/Requestor';

const App = () => {
  const [courses, setCourses] = useState('');

  // Get courses
  const getCourses = async () => {
    const coursesResponse = await Requestor.get('/courses');

    setCourses(coursesResponse.data);
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/courses'
          render={props => (
            <Fragment>
              <Courses getCourses={getCourses} courses={courses} />
            </Fragment>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
