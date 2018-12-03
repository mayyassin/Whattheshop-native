import * as actionTypes from "../actions/types";

const initialState = {
  // complete me
  user: null,
  profile: null,
  error: null,
  isAuthenticated: false,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        error: null,
        isAuthenticated: false
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true
      };

    default:
      return state;
  }
};
