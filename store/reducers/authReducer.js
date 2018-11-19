import * as actionTypes from "../actions/types";

const initialState = {
  // complete me
  user: null,
  error: null,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
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

    default:
      return state;
  }
};
