import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// Filter Select
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

// Table
const useTableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}));

// Pagination Style
const usePaginationStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(10)
  }
}));

// Filter Style
const useFilterStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 300
  }
}));

const TablePaginationActions = props => {
  const paginationClasses = usePaginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={paginationClasses.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='First Page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='Previous Page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Next Page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Last Page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const SimpleTable = ({
  config,
  colConfig,
  data,
  page,
  rowsPerPage,
  totalRows,
  onPaginate,
  filterSelects,
  onFilter
}) => {
  const tableClasses = useTableStyles();
  const FilterClasses = useFilterStyles();

  const [filters, setFilters] = useState({
    studyAbroadInstitution: [],
    programName: [],
    year: [],
    kzooCourseName: [],
    kzooDiscipline: [],
    hostInstiCourseNumber: [],
    hostInstiCourseName: []
  });

  // call filter function everytime filters state gets updated
  useEffect(() => {
    onFilter(filters);
  }, [onFilter, filters]);

  // Each column options
  const studyAbroadInstitutions =
    filterSelects.studyAbroadInstitutionColumnOptions;
  const programNames = filterSelects.programNameColumnOptions;
  const years = filterSelects.yearColumnOptions;
  const kzooCourseNames = filterSelects.kzooCourseNameColumnOptions;
  const kzooDisciplines = filterSelects.kzooDisciplineColumnOptions;
  const hostInstiCourseNumbers =
    filterSelects.hostInstiCourseNumberColumnOptions;
  const hostInstiCourseNames = filterSelects.hostInstiCourseNamesColumnOptions;

  // Pagination Change
  const handleChangePage = newPage => {
    onPaginate(newPage);
  };

  // Filter Change
  const handleFilterChange = (event, filterType) => {
    setFilters({ ...filters, [filterType]: event.target.value });
  };

  const theadMarkup = (
    <TableRow>
      {colConfig.map((column, index) => (
        <TableCell key={index}>
          <div className={FilterClasses.root}>
            <FormControl className={FilterClasses.formControl}>
              <InputLabel shrink htmlFor='select-multiple-checkbox'>
                {column.display}
              </InputLabel>
              {column.id === 'studyAbroadInstitution' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {studyAbroadInstitutions !== undefined &&
                    studyAbroadInstitutions.map(institution => (
                      <MenuItem key={institution} value={institution}>
                        <Checkbox
                          checked={
                            filters.studyAbroadInstitution.indexOf(
                              institution
                            ) > -1
                          }
                        />
                        <ListItemText primary={institution} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'programName' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {programNames !== undefined &&
                    programNames.map(programName => (
                      <MenuItem key={programName} value={programName}>
                        <Checkbox
                          checked={
                            filters.programName.indexOf(programName) > -1
                          }
                        />
                        <ListItemText primary={programName} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'year' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {years !== undefined &&
                    years.map(year => (
                      <MenuItem key={year} value={year}>
                        <Checkbox checked={filters.year.indexOf(year) > -1} />
                        <ListItemText primary={year} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'kzooCourseName' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {kzooCourseNames !== undefined &&
                    kzooCourseNames.map(kzooCourseName => (
                      <MenuItem key={kzooCourseName} value={kzooCourseName}>
                        <Checkbox
                          checked={
                            filters.kzooCourseName.indexOf(kzooCourseName) > -1
                          }
                        />
                        <ListItemText primary={kzooCourseName} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'kzooDiscipline' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {kzooDisciplines !== undefined &&
                    kzooDisciplines.map(kzooDiscipline => (
                      <MenuItem key={kzooDiscipline} value={kzooDiscipline}>
                        <Checkbox
                          checked={
                            filters.kzooDiscipline.indexOf(kzooDiscipline) > -1
                          }
                        />
                        <ListItemText primary={kzooDiscipline} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'hostInstiCourseNumber' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {hostInstiCourseNumbers !== undefined &&
                    hostInstiCourseNumbers.map(hostInstiCourseNumber => (
                      <MenuItem
                        key={hostInstiCourseNumber}
                        value={hostInstiCourseNumber}
                      >
                        <Checkbox
                          checked={
                            filters.hostInstiCourseNumber.indexOf(
                              hostInstiCourseNumber
                            ) > -1
                          }
                        />
                        <ListItemText primary={hostInstiCourseNumber} />
                      </MenuItem>
                    ))}
                </Select>
              )}
              {column.id === 'hostInstiCourseName' && (
                <Select
                  multiple
                  value={filters[column.id]}
                  onChange={event => handleFilterChange(event, column.id)}
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {hostInstiCourseNames !== undefined &&
                    hostInstiCourseNames.map(hostInstiCourseName => (
                      <MenuItem
                        key={hostInstiCourseName}
                        value={hostInstiCourseName}
                      >
                        <Checkbox
                          checked={
                            filters.hostInstiCourseName.indexOf(
                              hostInstiCourseName
                            ) > -1
                          }
                        />
                        <ListItemText primary={hostInstiCourseName} />
                      </MenuItem>
                    ))}
                </Select>
              )}
            </FormControl>
          </div>
        </TableCell>
      ))}
    </TableRow>
  );

  const tbodyMarkup = data.map((row, index) => (
    <TableRow key={index}>
      {colConfig.map((col, index) => (
        <TableCell key={index}>{row[col.id]}</TableCell>
      ))}
    </TableRow>
  ));

  return (
    <Paper className={tableClasses.root}>
      <div className={tableClasses.tableWrapper}>
        <Table className={tableClasses.table}>
          <TableHead>{theadMarkup}</TableHead>
          <TableBody>{tbodyMarkup}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
};

SimpleTable.propTypes = {
  config: PropTypes.object,
  colConfig: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  filterSelects: PropTypes.object.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default SimpleTable;
