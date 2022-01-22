import * as types from '../actions/actionTypes/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // login user and Register same ops so
    case types.LOGIN_START:
    case types.REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // logout user
    case types.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
      };

    // set Error Empty
    case types.SET_ERROR_EMPTY:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
