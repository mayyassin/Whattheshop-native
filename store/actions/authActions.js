import axios from "axios";
import jwt_decode from "jwt-decode";

import { AsyncStorage } from "react-native";

import * as actionTypes from "./types";

const setAuthToken = token => {
  console.log(token);
  if (token) {
    AsyncStorage.setItem("token", token).then(
      () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
    );
  } else {
    AsyncStorage.removeItem("token").then(
      () => delete axios.defaults.headers.common.Authorization
    );
  }
};

export const checkForExpiredToken = navigation => {
  return dispatch => {
    // Get token
    AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;

        // Decode token and get user info
        const user = jwt_decode(token);

        // Check token expiration
        if (user.exp >= currentTime) {
          // Set auth token header
          setAuthToken(token);
          // Set user
          dispatch(setCurrentUser(user));
          navigation.navigate("CoffeeList");
        } else {
          dispatch(logout());
        }
      }
    });
  };
};

export const loginUser = (userData, navigation) => {
  return dispatch => {
    axios
      .post("http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
      })
      .then(() => navigation.navigate("CoffeeList"))
      .catch(err => console.error(err.response));
  };
};

export const registerUser = (userData, navigation) => {
  return dispatch => {
    axios
      .post("http://coffee.q8fawazo.me/api/register/", userData)
      .then(() => loginUser(userData, navigation))
      .catch(err => console.error(err.response));
  };
};

export const logoutUser = () => {
  setAuthToken();
  return { type: actionTypes.LOGOUT_USER };
};

const setCurrentUser = user => {
  console.log(user);
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

const setError = () => ({
  type: actionTypes.SET_ERROR
});
