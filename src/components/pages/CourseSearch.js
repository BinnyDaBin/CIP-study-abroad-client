import React, { Fragment, useState, useEffect } from 'react';
import Requestor from '../Requestor';
import Table from '../table/Table';
import { COURSES_COLUMN_CONFIG } from '../courses/course.constant';
import { CONFIG as TABLE_CONFIG } from '../courses/config';

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
      <Table
        config={TABLE_CONFIG}
        colConfig={COURSES_COLUMN_CONFIG}
        data={courses}
      />
    </Fragment>
  );
};

export default CourseSearch;
