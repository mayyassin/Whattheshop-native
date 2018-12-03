import * as actionTypes from "../actions/types";

const initialState = {
  // complete me
  profile: null,
  error: null,
  isAuthenticated: false,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE:
      console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: true
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
