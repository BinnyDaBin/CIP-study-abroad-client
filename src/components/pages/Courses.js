import React, { Fragment, useEffect } from 'react';

const Courses = ({ getCourses, courses }) => {
  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>{courses}</h1>
    </Fragment>
  );
};

export default Courses;
