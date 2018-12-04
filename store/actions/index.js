export {
  loginUser,
  logoutUser,
  registerUser,
  checkForExpiredToken
} from "./authActions";

// export { setErrors } from "./errors";

export {
  fetchProduct,
  fetchProducts,
  filterProducts,
  filterCategory
} from "./productActions";

export { fetchAddresses, createAddress, updateAddress } from "./AddressActions";

export { fetchProfile, updateProfile } from "./profileActions";

//
// export {
//   addProduct,
//   checkout,
//   removeItemFromCart,
//   setAddress
// } from "./CartActions";

export { fetchOrders, fetchOrder } from "./orderActions";
