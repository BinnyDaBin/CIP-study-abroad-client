import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/Kalamazoo_College_logo.png';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Navbar = ({ title, icon, auth: { isAuthenticated, user }, logout }) => {
  const classes = useStyles();

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Button color='inherit' component={Link} to='/#!'>
        Hello {user && user.firstName}
      </Button>
      <Button color='inherit' component={Link} to='/register'>
        Register
      </Button>
      <Button
        color='inherit'
        component={Link}
        to='/#!'
        type='submit'
        className={classes.submit}
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
      <Button color='inherit' component={Link} to='/login'>
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
            {title}
          </Typography>

          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.defaultProps = {
  title: 'Center for International Programs',
  icon: logo
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
