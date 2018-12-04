import * as actionTypes from "./types";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.37/"
});

const setOrderLoading = () => ({
  type: actionTypes.SET_ORDER_LOADING
});

const setOrdersLoading = () => ({
  type: actionTypes.SET_ORDERS_LOADING
});

export const fetchOrders = () => {
  return dispatch => {
    dispatch(setOrdersLoading());
    instance
      .get("api/order/list/")
      .then(res => res.data)
      .then(orders => {
        dispatch({
          type: actionTypes.FETCH_ORDERS,
          payload: orders
        });
      })
      .catch(err => console.error(err));
  };
};

export const fetchOrder = orderId => {
  return dispatch => {
    dispatch(setOrderLoading());
    instance
      .get(`api/order/${orderId}/detail/`)
      .then(res => res.data)
      .then(order => {
        dispatch({
          type: actionTypes.FETCH_ORDER,
          payload: order
        });
      })
      .catch(err => console.error(err));
  };
};
