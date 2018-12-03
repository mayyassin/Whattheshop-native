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

export const updateProfile = profile_id => {
  return dispatch => {
    axios
      .post(`http://192.168.100.37/profile/${profile_id}/update/`)
      .then(res => res.data)
      .then(profile => {
        console.log(profile);
        dispatch({
          type: actionTypes.UPDATE_PROFILE,
          payload: profile
        });
      })
      .catch(err => console.error(err));
  };
};
