import * as types from './actionTypes/actionTypes';
import axios from 'axios';

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (token) => ({
  type: types.REGISTER_SUCCESS,
  payload: token,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

export const setErrorEmpty = () => ({
  type: types.SET_ERROR_EMPTY,
});

export const registerInitiate = (email, password) => {
  // "dispatch" redux-thunk used
  return function (dispatch) {
    dispatch(registerStart);
    axios
      .post('http://localhost:5000/api/auth/register', {
        email,
        password,
      })
      .then((response) => {
        console.log('reg-response', response);
        dispatch(registerSuccess(response.data.access_token));
      })
      .catch((error) => {
        dispatch(registerFail(error.response.data.message));
        setTimeout(() => {
          dispatch(registerFail(''));
        }, 2000);
      });
  };
};
