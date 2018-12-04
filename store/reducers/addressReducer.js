import * as actionTypes from "../actions/types";

const initialState = {
  addresses: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESSES:
      const address = action.payload;
      return {
        ...state,
        addresses: address
      };
    case actionTypes.CREATE_ADDRESS:
      const new_address = action.payload;
      return {
        ...state,
        addresses: state.addresses.concat(new_address)
      };
    default:
      return state;
  }
};

export default reducer;
