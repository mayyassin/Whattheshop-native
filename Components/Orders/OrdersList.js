import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getProducts, fetchProduct } from "../../store/actions/productActions";
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

class OrdersList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order List",
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

  componentDidMount() {
    this.props.fetchOrders();
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
  handlePress(order) {
    this.props.navigation.navigate("OrderDetail", {
      order: order
    });
  }

  renderItem(order) {
    return (
      <TouchableOpacity
        style={{ backgroundColor: "black", padding: 15 }}
        key={order.id}
        onPress={() => this.handlePress(order)}
      >
        <ImageBackground source={bubbles} style={styles.background}>
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Text style={styles.text}>
                  Order#: {order.id}
                  Date: {order.ordered_on}
                  {"\n"}
                  Status:{order.status}
                </Text>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    const orders = this.props.orders;
    let ListItems;
    if (orders) {
      ListItems = orders.map(order => this.renderItem(order));
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
  loading: state.orders.loadingA,
  orders: state.orders.orders,
  cartQuantity: quantityCounter(state.cart.cart)
});

const mapActionsToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(actionTypes.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OrdersList);
