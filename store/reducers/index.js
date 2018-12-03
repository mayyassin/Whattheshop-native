import { combineReducers } from "redux";

// Reducers
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: profileReducer
});
