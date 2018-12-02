import React from "react";
import { createStackNavigator } from "react-navigation";

// Components
import ProductList from "../ProductList";
import ProductDetail from "../ProductDetail";
import ProductCart from "../ProductCart";
import Login from "../Login";
import HomePage from "../HomePage";
import Profile from "../Profile";
import AddressForm from "../Addresses";

export default createStackNavigator(
  {
    Profile: Profile,
    ProductList: ProductList,
    ProductDetail: ProductDetail,
    ProductCart: ProductCart,
    Login: Login,
    AddressForm: AddressForm
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#5B2C6F"
      },
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "white"
    }
  }
);
