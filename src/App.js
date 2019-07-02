import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';

const App = () => {
  const [courses, setCourses] = useState('');

  // Get courses
  const getCourses = async () => {
    const res = await axios.get('http://localhost:5000/courses');

    console.log(res.data);
    setCourses(res.data);
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
