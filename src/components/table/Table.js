import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import _ from 'lodash';

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

const usePaginationStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(10)
  }
}));

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
  const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  const handlePaginate = (event, newPage) => {
    onChangePage(event, newPage);
  };

  const getPageIcon = (type, direction) => {
    if (type === 'first') {
      return direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />;
    }
    if (type === 'previous') {
      return direction === 'rtl' ? (
        <KeyboardArrowRight />
      ) : (
        <KeyboardArrowLeft />
      );
    }
    if (type === 'next') {
      return direction === 'rtl' ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      );
    }
    if (type === 'last') {
      return direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />;
    }
  };

  return (
    <div className={paginationClasses.root}>
      <IconButton
        onClick={event => handlePaginate(event, 0)}
        disabled={page === 0}
        aria-label='First Page'
      >
        {getPageIcon('first', theme.direction)}
      </IconButton>
      <IconButton
        onClick={event => handlePaginate(event, page - 1)}
        disabled={page === 0}
        aria-label='Previous Page'
      >
        {getPageIcon('previous', theme.direction)}
      </IconButton>
      <IconButton
        onClick={event => handlePaginate(event, page + 1)}
        disabled={page >= lastPage}
        aria-label='Next Page'
      >
        {getPageIcon('next', theme.direction)}
      </IconButton>
      <IconButton
        onClick={event => handlePaginate(event, lastPage)}
        disabled={page >= lastPage}
        aria-label='Last Page'
      >
        {getPageIcon('last', theme.direction)}
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

  const [filters, setFilters] = useState(
    _.transform(
      colConfig,
      (initialFilter, config) => {
        initialFilter[config.id] = [];
        return initialFilter;
      },
      {}
    )
  );

  useEffect(() => {
    onFilter(filters);
  }, [onFilter, filters]);

  const handlePageChange = (evnet, newPage) => {
    onPaginate(newPage);
  };

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
              <Select
                multiple
                value={filters[column.id]}
                onChange={event => handleFilterChange(event, column.id)}
                input={<Input id='select-multiple-checkbox' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {filterSelects[column.id] !== undefined &&
                  filterSelects[column.id].map(selectOption => (
                    <MenuItem key={selectOption} value={selectOption}>
                      <Checkbox
                        checked={filters[column.id].indexOf(selectOption) > -1}
                      />
                      <ListItemText primary={selectOption} />
                    </MenuItem>
                  ))}
              </Select>
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
                onChangePage={handlePageChange}
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
