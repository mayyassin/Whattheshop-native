import * as actionTypes from "./types";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/"
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
        console.log(addressDetail);
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
    // dispatch(setLoading());
    instance
      .get("api/address/list/")
      .then(res => res.data)
      .then(addresses => {
        return dispatch({
          type: actionTypes.FETCH_ADDRESSES,
          payload: addresses
        });
      })
      .catch(err => console.log(err));
  };
};

export const updateAddress = (addressInfo, navigate, address_id) => {
  console.log(address_id);
  return dispatch => {
    instance
      .put(`api/address/${address_id}/update/`, addressInfo)
      .then(res => res.data)
      .then(addressInfo => {
        dispatch({
          type: actionTypes.UPDATE_ADDRESS,
          payload: addressInfo
        });
        navigate.replace("Profile");
      })
      .catch(err => console.error(err.response));
  };
};
