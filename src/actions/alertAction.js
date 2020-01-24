import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = async (dispatch, message, type, timeout = 5000) => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { message, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
