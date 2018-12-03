import React, { Component } from "react";
import { connect } from "react-redux";

// NativeBase Components
import {
  Text,
  Left,
  Body,
  Right,
  List,
  Button,
  ListItem,
  Icon
} from "native-base";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions
import { removeItemFromCart, checkout } from "../../store/actions/cartActions";

class ProductCart extends Component {
  handleCheckout() {
    if (this.props.user) {
      const cart = {
        cart: this.props.cart.cart,
        address: this.props.cart.address
      };
      this.props.checkout(cart);
      alert("You have successfully checked out");
    } else {
      alert("You have to login first to checkout");
      this.props.navigation.navigate("Login");
    }
  }

  handleRemove(item) {
    this.props.removeItemFromCart(item);
  }

  componentDidMount() {
    // if (!this.props.user) {
    //   this.props.navigation.replace("Login");
    // }
  }

  renderItem(oneProduct) {
    return (
      <ListItem key={oneProduct.item.id}>
        <Left>
          <Text style={{ color: "black", marginLeft: 16 }}>
            {oneProduct.item.name}
          </Text>
          <Text note style={{ marginLeft: 16 }}>
            {oneProduct.item.price + " KD"}
          </Text>
        </Left>
        <Body>
          <Text>{oneProduct.quantity}</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => this.handleRemove(item)}>
            <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    const list = this.props.cart.cart;
    return (
      <List>
        {list.map(product => this.renderItem(product))}
        {this.props.cart.cart.length !== 0 ? (
          <Button
            full
            style={{
              backgroundColor: "#C34EBE"
            }}
            onPress={() => this.handleCheckout()}
          >
            <Text>Checkout</Text>
          </Button>
        ) : (
          <Text>No Items in your cart</Text>
        )}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth.user
});

const mapActionsToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItemFromCart(item)),
  checkout: cart => dispatch(checkout(cart))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductCart);
