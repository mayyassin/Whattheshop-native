import React, { Component } from "react";
import { connect } from "react-redux";
import NumericInput from "react-native-numeric-input";
// NativeBase Components
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Picker,
  Content,
  Footer
} from "native-base";

// Style
import styles from "./styles";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions
import * as actionCreators from "../../store/actions";
import { quantityCounter } from "../../utilities/quantityCounter";

class OrderDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order Details",
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
    const order = this.props.navigation.getParam("order", {});
    this.props.fetchOrder(order.id);
    this.props.navigation.setParams({
      quantity: this.props.cartQuantity
    });
  }

  componenetDidUpdate(prevProps) {
    if (prevProps.cartQuantity != this.props.cartQuantity) {
      this.props.navigation.setParams({
        quantity: this.props.cartQuantity
      });
    }
  }

  render() {
    if (this.props.loading) {
      return <Text>loading</Text>;
    } else {
      const order = this.props.order;
      let OrderItems;
      if (order) {
        OrderItems = order.order_product.map(product => (
          <Text style={styles.text}>
            Product name: {product.name + "\n"}
            Price: {product.price + "\n"}
            Quantity: {product.quantity + "\n"}

          </Text>
        ));
      }

      return (
        <ImageBackground
          source={bubbles}
          style={{ flex: 1, backgroundColor: "black" }}
        >
          <Content style={{ flex: 3 }}>
            <Body style={styles.bodyText}>
              <Text style={styles.text}>
                Order Number: {order.id + "\n"}
                Status: {order.status + "\n"}
                Date of Order: {order.ordered_on + "\n"}
                Total Price: {order.price + "\n"}
              </Text>
              <Text style={styles.text}> {OrderItems}</Text>
              <Text style={styles.text}>
                Governorate: {order.address.governorate + "\n"}
                Area: {order.address.area + "\n"}
                Block: {order.address.block + "\n"}
                Street: {order.address.street + "\n"}
                Building: {order.address.building_or_house + "\n"}
                Floor: {order.address.governorate + "\n"}
                Extra Directions: {order.address.extra_directions + "\n"}
              </Text>
            </Body>

            <Footer
              style={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "transparent"
              }}
            />
          </Content>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  order: state.orders.order,
  loading: state.orders.loadingB,
  cartQuantity: quantityCounter(state.cart.cart)
});

const mapActionsToProps = dispatch => ({
  fetchOrder: orderID => dispatch(actionCreators.fetchOrder(orderID))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OrderDetail);
