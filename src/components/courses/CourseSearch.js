import React, { Fragment, useState, useEffect } from 'react';
import Requestor from '../Requestor';
import SimpleTable from '../table/Table';
import { COURSES_COLUMN_CONFIG } from './course.constant';
import { CONFIG as TABLE_CONFIG } from './config';
import _ from 'lodash';
import { loadUser } from '../../actions/authAction';
import {useDispatch} from 'react-redux';

const CourseSearch = () => {
  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [coursesPerPage] = useState(10);
  const [selects, setSelects] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch);

    const params = {
      filters,
      offset: currentPage,
      size: coursesPerPage
    };

    getCourses(params);
  }, [filters, currentPage, coursesPerPage]);

  useEffect(() => {
    getColumnOptions();
  }, []);

  const getCourses = async ({ filters, offset, size }) => {
    // setLoading(true);

    const coursesResponse = await Requestor.get(
      '/courses',
      {},
      {
        filters: _.omitBy(filters, _.isEmpty),
        offset,
        size
      }
    );

    const courses = coursesResponse.data.result;
    const totalCourses = coursesResponse.data.totalLength;

    setCourses(courses);
    setTotalCourses(totalCourses);
    // setLoading(false);
  };

  const getColumnOptions = async () => {
    const columnOptionsResponse = await Requestor.get(
      '/courseColumnOptions',
      {},
      {}
    );

    setSelects(columnOptionsResponse.data);
  };

  const onPaginate = newPage => {
    setCurrentPage(newPage);
  };

  const onFilter = filters => {
    setFilters(filters);
  };

  return (
    <Fragment>
      <SimpleTable
        config={TABLE_CONFIG}
        colConfig={COURSES_COLUMN_CONFIG}
        data={courses}
        page={currentPage}
        rowsPerPage={coursesPerPage}
        totalRows={totalCourses}
        onPaginate={onPaginate}
        filterSelects={selects}
        onFilter={onFilter}
      />
    </Fragment>
  );
};

export default CourseSearch;
