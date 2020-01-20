import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from './types';
import Requestor from '../components/Requestor';
import setAuthToken from '../utils/setAuthToken';

const config = {
  'Content-Type': 'application/json'
};

export const register = async (dispatch, user) => {
  try {
    const response = await Requestor.post('/users', config, user);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg
    });
  }
};

export const login = async (dispatch, user) => {
  try {
    const response = await Requestor.post('/auth', config, user);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    loadUser(dispatch);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg
    });
  }
};

export const logout = (dispatch) => dispatch({ type: LOGOUT });

export const loadUser = async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await Requestor.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });
