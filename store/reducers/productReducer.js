import * as actionTypes from "../actions/types";

const initialState = {
  productLists: null,
  productList: null,
  filteredProducts: [],
  filteredCategory: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        productLists: action.payload,
        filteredProducts: action.payload,
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
    case actionTypes.FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: state.productLists.filter(product => {
          return `${product.name}`.toLowerCase().includes(action.payload);
        }),
        loading: false
      };
    case actionTypes.FILTER_CATEGORY:
      return {
        ...state,
        filteredProducts: state.productLists.filter(product => {
          return `${product.category}`
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
        loading: false
      };
    default:
      return state;
  }
}
