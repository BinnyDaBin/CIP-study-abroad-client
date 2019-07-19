import React, { Fragment, useState, useEffect } from 'react';
import Requestor from '../Requestor';

const CourseSearch = () => {
  const [courses, setCourses] = useState([]);

  // Get courses
  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  });

  const DEFAULT_PARAMS = {
    filters: {},
    offset: 0,
    size: 10
  };

  const getCourses = async ({ filters, offset, size } = DEFAULT_PARAMS) => {
    const coursesResponse = await Requestor.get(
      '/courses',
      {},
      {
        ...DEFAULT_PARAMS,
        filters,
        offset,
        size
      }
    );
    setCourses(coursesResponse.data);
  };

  const showCourses = courses.map(course => (
    <tr key={course.id}>
      <td>{course.id}</td>
      <td>{course.studyAbroadInstitution}</td>
      <td>{course.programName}</td>
      <td>{course.year}</td>
      <td>{course.kzooCourseName}</td>
      <td>{course.kzooDiscipline}</td>
      <td>{course.hostInstiCourseNumber}</td>
      <td>{course.hostInstiCourseName}</td>
    </tr>
  ));

  return (
    <Fragment>
      <table style={{ width: '100%' }}>
        <thead>
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
        </thead>
        <tbody>{showCourses}</tbody>
      </table>
    </Fragment>
  );
};

export default CourseSearch;
