import * as actionTypes from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  loadingA: true,
  loadingB: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      const orders = action.payload;
      return {
        ...state,
        orders: orders,
        loadingA: false
      };
    case actionTypes.FETCH_ORDER:
      const order = action.payload;
      return {
        ...state,
        order: order,
        loadingB: false
      };
    case actionTypes.SET_ORDER_LOADING:
      return {
        ...state,
        loadingB: true
      };
    case actionTypes.SET_ORDERS_LOADING:
      return {
        ...state,
        loadingA: true
      };
    default:
      return state;
  }
};

export default reducer;
