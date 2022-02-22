import * as types from './actionTypes/actionTypes';
import axios from 'axios';

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (token) => ({
  type: types.LOGIN_SUCCESS,
  payload: token,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

export const setErrorEmpty = () => ({
  type: types.SET_ERROR_EMPTY,
});

export const loginInitiate = (email, password) => {
  // "dispatch" redux-thunk used
  return function (dispatch) {
    dispatch(loginStart);
    axios
      .post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })
      .then((response) => {
        console.log('login-response', response);
        dispatch(
          loginSuccess({
            email: email,
            token: response.data.access_token,
          })
        );
      })
      .catch((error) => {
        dispatch(loginFail(error.response.data.message));
        setTimeout(() => {
          dispatch(loginFail(''));
        }, 2000);
      });
  };
};
