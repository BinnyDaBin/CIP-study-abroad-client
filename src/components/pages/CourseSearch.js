import React, { Fragment, useState, useEffect } from 'react';
import Requestor from '../Requestor';

const CourseSearch = () => {
  const [courses, setCourses] = useState([]);

  // Get courses
  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  });

  const getCourses = async () => {
    const coursesResponse = await Requestor.get('/courses');
    setCourses(coursesResponse.data);
  };

  const showCourses = courses.map(course => (
    <tr key={course.id}>
      <th>{course.id}</th>
      <th>{course.study_abroad_institution}</th>
      <th>{course.program_name}</th>
      <th>{course.year}</th>
      <th>{course.kzoo_course_name}</th>
      <th>{course.kzoo_discipline}</th>
      <th>{course.host_insti_course_number}</th>
      <th>{course.host_insti_course_name}</th>
    </tr>
  ));

  return (
    <Fragment>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Study Abroad Institution</th>
            <th>Program Name</th>
            <th>year</th>
            <th>Kzoo Course Name</th>
            <th>Kzoo Discipline</th>
            <th>Host Institution Course Number</th>
            <th>Host Institution Course Name</th>
          </tr>
          {showCourses}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CourseSearch;
