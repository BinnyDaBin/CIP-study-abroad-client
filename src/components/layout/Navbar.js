import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from '../../actions/authAction';
import { useAuth } from '../../hooks';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isAuthenticated, user } = useAuth(); 

  const onLogout = () => {
    logout(dispatch);
  };

  const authLinks = (
    <Fragment>
      <Button color='inherit' component={Link} to='/#!'>
        Hello {user && user.firstName}
      </Button>
      <Button
        color='inherit'
        component={Link}
        to='/'
        onClick={onLogout}
      >
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color='inherit' component={Link} to='/register'>
        Register
      </Button>
      <Button color='inherit' component={Link} to='/'>
        Login
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={clsx(classes.appBar)}>
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            Center for International Programs
          </Typography>

          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
