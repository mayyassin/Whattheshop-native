import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import bubbles from "../../assets/images/bubbles.png";

import axios from "axios";

// NativeBase Components
import {
  List,
  ListItem,
  Card,
  CardItem,
  Button,
  Thumbnail,
  Text,
  Left,
  Content,
  Icon,
  Footer,
  Container,
  Body,
  Image
} from "native-base";

// Style
import styles from "./styles";

// Actions
import { quantityCounter } from "../../utilities/quantityCounter";

class AddressList extends Component {
  // componentDidMount() {
  //   console.log("addressList");
  //   this.props.navigation.setParams({
  //     quantity: this.props.cartQuantity
  //   });
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.cartQuantity != this.props.cartQuantity) {
  //     this.props.navigation.setParams({
  //       quantity: this.props.cartQuantity
  //     });
  //   }
  // }
  static navigationOptions = ({ navigation }) => ({
    title: "Address List",
    headerLeft: (
      <Button light transparent onPress={() => navigation.navigate("Profile")}>
        <Text>
          <Icon
            type="Feather"
            name="user"
            // name="productping-cart"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    ),
    headerRight: (
      <Button
        light
        transparent
        onPress={() => navigation.navigate("ProductCart")}
      >
        <Text>
          {navigation.getParam("quantity", 0)}{" "}
          <Icon
            type="Feather"
            name="shopping-cart"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    )
  });
  handlePress(address) {
    this.props.navigation.navigate("UpdateAddress", {
      address_id: address
    });
  }
  componentDidMount() {
    console.log("addressList");
    this.props.navigation.setParams({
      quantity: this.props.cartQuantity
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cartQuantity != this.props.cartQuantity) {
      this.props.navigation.setParams({
        quantity: this.props.cartQuantity
      });
    }
  }

  renderItem(address) {
    return (

      <TouchableOpacity
        key={address.id}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Content>
          <ImageBackground source={bubbles} style={styles.background}>
            <View style={styles.overlay} />
            <ListItem style={styles.transparent}>
              <Card style={styles.transparent}>
                <CardItem style={styles.transparent}>
                  <Text style={styles.text}>
                    Governorate: {address.governorate + "\n"}
                    Area: {address.area + "\n"}
                    Block: {address.block + "\n"}
                    Street: {address.street + "\n"}
                    Building/House: {address.building_or_house + "\n"}
                    Floor: {address.street + "\n"}
                  </Text>
                </CardItem>
              </Card>
            </ListItem>
 <Button
            full
            style={{
              backgroundColor: "#79E5BE"
            }}
            onPress={() => this.handlePress(address)}
          >
            <Text style={{ fontWeight: "bold" }}>Update</Text>
          </Button>
          </ImageBackground>
        </Content>

      </TouchableOpacity>
    );
  }

  render() {
    const addressList = this.props.addresses;
    let ListItems;
    if (addressList) {
      ListItems = addressList.map(address => this.renderItem(address));
    }

    if (this.props.loading) {
      return <Text>loading</Text>;
    } else {
      return (
        <Container>
          <Content>
            <List>{ListItems}</List>
          </Content>
          <Footer
            style={{
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <Button
              style={{
                backgroundColor: "#16DE9B"
              }}
              onPress={
                this.props.user
                  ? () => this.props.logout()
                  : () => this.props.navigation.navigate("Login")
              }
            >
              {this.props.user ? (
                <Text>{this.props.user.username.toUpperCase()}</Text>
              ) : (
                <Text
                  style={{
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  Login
                </Text>
              )}
              <Icon
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
                type="MaterialCommunityIcons"
                name={this.props.user ? "logout" : "login"}
              />
            </Button>
          </Footer>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product,
  quantity: quantityCounter(state.cart.cart),
  user: state.auth.user,
  loading: state.product.loading,
  addresses: state.address.addresses,
  cartQuantity: quantityCounter(state.cart.cart)
});

export default connect(mapStateToProps)(AddressList);
