import * as actionTypes from "../actions/types";

const initialState = {
  productLists: null,
  productList: null,

  loadingA: true,
  loadingB: true,
  filteredProducts: [],

  filteredCategory: [],
  loadingA: true,
  loadingB: true

};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        productLists: action.payload,

        filteredProducts: action.payload,
        loadingA: false
      };

    // case actionTypes.GET_PRODUCT_BY_ID:
    //   return {
    //     ...state,
    //     productList: action.payload
    //   };
    case actionTypes.FETCH_PRODUCT:
      return {
        ...state,
        productList: action.payload,
        loadingB: false
      };
    case actionTypes.PRODUCTS_LOADING:
      return {
        ...state,
        loadingA: true
      };
    case actionTypes.PRODUCT_LOADING:
      return {
        ...state,
        loadingB: true
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
        })
      };
    default:
      return state;
  }
}
