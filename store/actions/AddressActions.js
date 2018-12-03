import * as actionTypes from "./types";

import axios from "axios";

export const setLoading = () => ({
  type: actionTypes.SET_ADDRESS_LOADING
});

export const createAddress = (addressDetail, navigate) => {
  return dispatch => {
    axios
      .post("http://192.168.100.37/api/address/create/", addressDetail)
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
    dispatch(setLoading());
    axios
      .get("http://192.168.100.37/api/address/list/")
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
