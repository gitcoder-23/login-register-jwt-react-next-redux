import * as types from './actionTypes/actionTypes';

export const logoutInitiate = (error) => ({
  type: types.LOGOUT_USER,
  payload: error,
});
