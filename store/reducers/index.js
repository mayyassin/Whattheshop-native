import { combineReducers } from "redux";

// Reducers
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer
});
