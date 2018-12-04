import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getProducts, fetchProduct } from "../../store/actions/productActions";
import * as actionTypes from "../../store/actions/authActions";
import { logoutUser } from "../../store/actions/authActions";
import { fetchProfile } from "../../store/actions/profileActions";
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
  static navigationOptions = ({ navigation }) => ({
    title: "Product List",
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

  renderItem(adress) {
    return (
      <TouchableOpacity key={adress.id}>
        <ImageBackground source={bubbles} style={styles.background}>
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Text style={styles.text}>
                  Governorate: {adress.governorate}
                  {adress.area}
                  {adress.block}
                  {adress.street}
                  {adress.area}
                </Text>

                <Text style={styles.text} />

                <Text style={styles.text} />

                <Text style={styles.text} />

                <Text style={styles.text} />
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
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
                backgroundColor: "#79E5BE"
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
  quantity: quantityCounter(state.cart.list),
  user: state.auth.user,
  loading: state.product.loading,
  addresses: state.address.addresses
});

const mapActionsToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddressList);
