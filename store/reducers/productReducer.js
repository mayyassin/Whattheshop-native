import * as actionTypes from "../actions/types";

const initialState = {
  productLists: null,
  productList: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        productLists: action.payload,
        loading: false
      };
    case actionTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productList: action.payload
      };
    case actionTypes.FETCH_PRODUCT:
      return {
        ...state,
        productList: action.payload,
        loading: false
      };
    case actionTypes.PRODUCTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
