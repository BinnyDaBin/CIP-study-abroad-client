import React, { Fragment, useState, useEffect } from 'react';
import Requestor from '../Requestor';
import Table from '../courses/Table';
import colConfig from '../courses/course.constant';
import config from '../courses/config';

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

  return (
    <Fragment>
      <Table config={config} colConfig={colConfig} data={courses} />
    </Fragment>
  );
};

export default CourseSearch;
