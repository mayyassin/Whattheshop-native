import * as actionTypes from "./types";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.32:8000/"
  // baseURL: "http://127.0.0.1:8000/"
});

// export const setLoading = () => ({
//   type: actionTypes.SET_PRODUCTS_LOADING
// });

export const checkout = cartWithAddress => {
  return dispatch => {
    instance
      .post("api/order/create/", cartWithAddress)
      .then(res => res.data)
      .then(order => {
        dispatch({
          type: actionTypes.POST_CHECKOUT,
          payload: order
        });
      })
      .catch(err => console.error(err));
  };
};

export const addProduct = product => {
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: product
  };
};

export const changeQuantity = (itemId, quantity) => {
  return {
    type: actionTypes.CHANGE_QUANTITY,
    payload: { itemId: itemId, quantity: quantity }
  };
};

export const removeItemFromCart = item => ({
  type: actionTypes.REMOVE_ITEM,
  payload: item
});

export const setAddress = addressId => {
  return {
    type: actionTypes.SET_ADDRESS,
    payload: addressId
  };
};

// // Types
// import * as actionTypes from "./types";

// // Add item to Cart
// export const addItemToCart = (item, cart) => dispatch => {
//   const index = cart.findIndex(
//     cartItem => cartItem.name == item.name && cartItem.option == item.option
//   );
//   if (index >= 0) {
//     cart[index].quantity++;
//   } else {
//     cart.push(item);
//   }
//   dispatch({
//     type: actionTypes.ADD_ITEM,
//     payload: cart
//   });
// };

// // Remove item from cart
// export const removeItemFromCart = item => dispatch => {
//   dispatch({
//     type: actionTypes.REMOVE_ITEM,
//     payload: item
//   });
// };

// // Checkout
// export const checkoutCart = () => dispatch => {
//   dispatch({
//     type: actionTypes.CHECKOUT
//   });
// };
