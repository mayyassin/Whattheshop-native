import * as actionTypes from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      const orders = action.payload;
      return {
        ...state,
        orders: orders,
        loading: false
      };
    case actionTypes.FETCH_ORDER:
      const order = action.payload;
      return {
        ...state,
        order: order,
        loading: false
      };
    case actionTypes.SET_ORDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
