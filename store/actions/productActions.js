import axios from "axios";

// Types
import * as actionTypes from "./types";

// Get all coffeeShops
export const getProducts = () => dispatch => {
  dispatch(setProductsLoading());
  axios
    .get("http://192.168.100.37/api/product/list/")
    .then(res => res.data)
    .then(products => {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        payload: products
      });
    })
    .catch(err => console.log(err));
};

export const fetchProduct = itemID => {
  return dispatch => {
    dispatch(setProductsLoading());
    axios
      .get(`http://192.168.100.37/api/product/${itemID}/detail/`)
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
