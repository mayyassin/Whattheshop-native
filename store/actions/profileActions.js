import axios from "axios";
import jwt_decode from "jwt-decode";

import { AsyncStorage } from "react-native";

import * as actionTypes from "./types";

const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/"
});
export const fetchProfile = () => {
  return dispatch => {
    instance
      .get(`api/profile/`)
      .then(res => res.data)
      .then(user => {
        dispatch({
          type: actionTypes.FETCH_PROFILE,
          payload: user
        });
      })
      .catch(err => console.error(err));
  };
};

export const updateProfile = (profile, navigate, profile_id) => {
  console.log(profile);
  return dispatch => {
    instance
      .put(`api/profile/${profile_id}/update/`, profile)
      .then(res => res.data)
      .then(user => {
        dispatch({
          type: actionTypes.UPDATE_PROFILE,
          payload: profile
        });
        navigate.goBack();
      })
      .catch(err => console.error(err.response));
  };
};
