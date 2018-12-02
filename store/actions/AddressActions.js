import * as actionTypes from "./types";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.13:8000"
});

export const setLoading = () => ({
  type: actionTypes.SET_ADDRESS_LOADING
});

export const createAddress = (addressDetail, navigate) => {
  return dispatch => {
    instance
      .post("api/address/create/", addressDetail)
      .then(res => res.data)
      .then(addressDetail => {
        dispatch({
          type: actionTypes.CREATE_ADDRESS,
          payload: addressDetail
        });
        navigate.goBack();
      })
      .catch(err => console.error(err.response.data));
  };
};

export const fetchAddresses = () => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get("/api/address/list/")
      .then(res => res.data)
      .then(addresses => {
        return dispatch({
          type: actionTypes.FETCH_ADDRESSES,
          payload: addresses
        });
      })
      .catch(err => alert(err));
  };
};
