import React from "react";
import { createStackNavigator } from "react-navigation";

// Components
import ProductList from "../ProductList";
import ProductDetail from "../ProductDetail";
import ProductCart from "../ProductCart";
import Login from "../Login";
import HomePage from "../HomePage";
import Profile from "../Profile";
import UpdateProfile from "../UpdateProfile";

import AddressForm from "../Addresses";
import AddressList from "../Addresses/AddressList";
import cartAddressChoice from "../Addresses/cartAddressChoice";
import OrdersList from "../Orders/OrdersList";
import OrderDetail from "../Orders/OrderDetail";

export default createStackNavigator(
  {
    Profile: Profile,
    UpdateProfile: UpdateProfile,
    ProductList: ProductList,
    ProductDetail: ProductDetail,
    ProductCart: ProductCart,
    Login: Login,
    AddressForm: AddressForm,
    AddressList: AddressList,
    OrdersList: OrdersList,
    OrderDetail: OrderDetail,
    CartAddressChoice: cartAddressChoice
  },
  {
    initialRouteName: "ProductList",
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
