import axios from "axios";
import jwt_decode from "jwt-decode";

import { AsyncStorage } from "react-native";

import * as actionTypes from "./types";

const instance = axios.create({
  baseURL: "http://192.168.100.35:8000/"
  //baseURL: "http://127.0.0.1:8000/"
});

const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token).then(
      () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
    );
  } else {
    return AsyncStorage.removeItem("token").then(
      () => delete axios.defaults.headers.common.Authorization
    );
  }
};

// export const checkForExpiredToken = navigation => {
//   return dispatch => {
//     // Get token
//     AsyncStorage.getItem("token").then(token => {
//       if (token) {
//         const currentTime = Date.now() / 1000;

//         // Decode token and get user info
//         const user = jwt_decode(token);

//         // Check token expiration
//         if (user.exp >= currentTime) {
//           // Set auth token header
//           setAuthToken(token).then(() => dispatch(setCurrentUser(user)));
//           navigation.navigate("ProductList");
//         } else {
//           dispatch(logout());
//         }
//       }
//     });
//   };
// };

export const checkForExpiredToken = () => {
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
          setAuthToken(token).then(() => dispatch(setCurrentUser(user)));
        } else {
          dispatch(logoutUser());
        }
      }
    });
  };
};

export const loginUser = (userData, navigation) => {
  return dispatch => {
    instance
      .post("api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token).then(() =>
          dispatch(setCurrentUser(decodedUser))
        );
      })
      .then(() => navigation.navigate("ProductList"))
      .catch(err => console.error(err.response));
  };
};

export const registerUser = (userData, navigation) => {
  return dispatch => {
    instance
      .post("api/register/", userData)
      .then(() => loginUser(userData, navigation))
      .catch(err => console.error(err.response));
  };
};

export const logoutUser = () => {
  setAuthToken();
  return { type: actionTypes.LOGOUT_USER };
};

const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

const setError = () => ({
  type: actionTypes.SET_ERROR
});
