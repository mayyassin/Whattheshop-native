import axios from "axios";
import jwt_decode from "jwt-decode";

import { AsyncStorage } from "react-native";

import * as actionTypes from "./types";

export const fetchProfile = () => {
  return dispatch => {
    axios
      .get(`http://192.168.100.37/api/profile/`)
      .then(res => res.data)
      .then(user => {
        console.log(user);
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
    axios
      .put(`http://192.168.100.37/api/profile/${profile_id}/update/`, profile)
      .then(res => res.data)
      .then(user => {
        console.log(user);
        dispatch({
          type: actionTypes.UPDATE_PROFILE,
          payload: profile
        });
        navigate.goBack();
      })
      .catch(err => console.error(err.response));
  };
};
