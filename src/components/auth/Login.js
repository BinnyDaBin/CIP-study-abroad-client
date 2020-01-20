import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setAlert } from '../../actions/alertAction';
import { login, clearErrors } from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../hooks';
import {useHistory} from 'react-router-dom';

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

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const {isAuthenticated, error} = useAuth();
  const history = useHistory();
  
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/courses');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'error');
      clearErrors();
    }
  }, [error]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'error');
    } else {
      login(dispatch, user);
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
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
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
            autoFocus
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onSubmit={onSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
