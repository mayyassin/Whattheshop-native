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
  Icon,
  Footer
} from "native-base";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions
import {
  removeItemFromCart,
  checkoutCart
} from "../../store/actions/cartActions";
import styles from "./styles";

class ProductCart extends Component {
  handleCheckout() {
    this.props.checkoutCart();
  }

  handleRemove(item) {
    this.props.removeItemFromCart(item);
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.navigation.replace("Login");
    }
  }

  renderItem(item, index) {
    return (
      <ListItem key={index}>
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}> {item.name} </Text>
          <Text note style={{ marginLeft: 16 }}>
            {item.option}
          </Text>
        </Left>
        <Body>
          <Text style={{ color: "white" }}>{item.quantity}</Text>
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
    const { list } = this.props.cart;
    return (
      <ImageBackground source={bubbles} style={styles.background}>
        <List>{list.map((item, index) => this.renderItem(item, index))}</List>
        <Footer
          style={{
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}
        >
          <Button
            full
            style={{
              backgroundColor: "#79E5BE"
            }}
            onPress={() => this.handleCheckout()}
          >
            <Text style={{ fontWeight: "bold" }}>Checkout</Text>
          </Button>
        </Footer>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth.user
});

const mapActionsToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItemFromCart(item)),
  checkoutCart: () => dispatch(checkoutCart())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductCart);
