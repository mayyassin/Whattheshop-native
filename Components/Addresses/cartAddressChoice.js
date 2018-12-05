import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setAddress } from "../../store/actions/cartActions";

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

class cartAddressChoice extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Choose Address",
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

  async setAddress(id) {
    await this.props.setAddress(id);
    this.props.navigation.navigate("ProductCart");
  }

  renderItem(adress) {
    return (
      <TouchableOpacity key={adress.id}>
        <ImageBackground source={bubbles} style={styles.background}>
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Text style={styles.text}>
                  {"Governorate: " + adress.governorate + "\n"}
                  {"Area: " + adress.area + "\n"}
                  {"Block: " + adress.block + "\n"}
                  {"Street: " + adress.street + "\n"}
                  {"Building or House: " + adress.building_or_house}
                </Text>
                <Button
                  style={{
                    backgroundColor: "#79E5BE"
                  }}
                  onPress={() => this.setAddress(adress.id)}
                >
                  {/* <Icon
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
                type="MaterialCommunityIcons"
                name={this.props.user ? "logout" : "login"}
              /> */}
                  <Text>Choose</Text>
                </Button>
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
              onPress={() => this.props.navigation.navigate("AddressForm")}
            >
              <Text
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                New Address
              </Text>
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
  addresses: state.address.addresses
});

const mapActionsToProps = dispatch => {
  return {
    setAddress: id => dispatch(setAddress(id))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(cartAddressChoice);
