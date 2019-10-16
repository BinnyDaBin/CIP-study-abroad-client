import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { setAlert } from '../../actions/alertAction';
import { register, clearErrors } from '../../actions/authAction';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color='inherit' href='https://material-ui.com/'>
        Material-UI.
      </Link>
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = ({ setAlert, auth: { error }, register, clearErrors }) => {
  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { firstName, lastName, email, password, passwordConfirm } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      setAlert('Please enter all fields', 'error');
    } else if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'error');
    } else if (!email.endsWith('@kzoo.edu')) {
      setAlert('Please use kzoo email address', 'error');
    } else if (password.length < 7) {
      setAlert('Password should be more than 6 characters', 'error');
    } else {
      register(user);
    }
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='text'
            value={firstName}
            id='firstName'
            label='First Name'
            name='firstName'
            onChange={onChange}
            autoComplete='firstName'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='text'
            value={lastName}
            id='lastName'
            label='Last Name'
            name='lastName'
            onChange={onChange}
            autoComplete='lastName'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='email'
            value={email}
            id='email'
            label='Email Address'
            name='email'
            onChange={onChange}
            autoComplete='email'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            value={password}
            id='password'
            onChange={onChange}
            autoComplete='current-password'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='passwordConfirm'
            label='Confirm Password'
            type='password'
            value={passwordConfirm}
            id='passwordConfirm'
            onChange={onChange}
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onSubmit={onSubmit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/login' variant='body2'>
                {'Already have an account? Log In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert, register, clearErrors }
)(Register);
