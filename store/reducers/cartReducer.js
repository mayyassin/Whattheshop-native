import * as actionTypes from "../actions/types";

const initialState = {
  loading: true,
  cart: [],
  address: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      let newProduct = action.payload;
      let cartItem = state.cart.find(cartItem => cartItem.id === newProduct.id);
      let cart;
      if (cartItem) {
        cartItem.quantity =
          parseInt(cartItem.quantity) + parseInt(newProduct.quantity);

        cart = [...state.cart];
      } else {
        cart = state.cart.concat(newProduct);
      }

      return {
        ...state,
        cart,
        loading: false
      };
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.payload)
      };
    case actionTypes.POST_CHECKOUT:
      return {
        ...state,
        cart: [],
        address: 0
      };
    case actionTypes.SET_PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

// import * as actionTypes from "../actions/types";

// const initialState = {
//   list: []
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case actionTypes.ADD_ITEM:
//       return {
//         ...state,
//         list: action.payload
//       };
//     case actionTypes.REMOVE_ITEM:
//       return {
//         ...state,
//         list: state.list.filter(item => item !== action.payload)
//       };
//     case actionTypes.CHECKOUT:
//       return {
//         ...state,
//         list: []
//       };
//     default:
//       return state;
//   }
// }
