import axios from "axios";

// Types
import * as actionTypes from "./types";

const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/"
});
// Get all coffeeShops
export const getProducts = () => dispatch => {
  dispatch(setProductsLoading());

  instance
    .get("api/product/list/")

    .then(res => res.data)
    .then(products => {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        payload: products
      });
    })
    .catch(err => console.error(err));
};

export const fetchProduct = itemID => {
  return dispatch => {

    dispatch(setProductsLoading());
    instance
      .get(`api/product/${itemID}/detail/`)

      .then(res => res.data)
      .then(item => {
        dispatch({
          type: actionTypes.FETCH_PRODUCT,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};

// Set the loading state
export const setProductsLoading = () => ({
  type: actionTypes.PRODUCTS_LOADING
});


export const setProductLoading = () => ({
  type: actionTypes.PRODUCT_LOADING
});

export const filterProducts = query => {
  return {
    type: actionTypes.FILTER_PRODUCTS,
    payload: query
  };
};

