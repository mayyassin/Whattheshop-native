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
  Footer,
  Card,
  CardItem
} from "native-base";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions

import { removeItemFromCart, checkout } from "../../store/actions/cartActions";
import styles from "./styles";

class ProductCart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     address: {}
  //   };
  // }
  // componentDidUpdate(prevProps) {
  //   if (this.props.address != prevProps.address) {
  //     this.setState({ address: this.props.address });
  //   }
  // }

  // componentDidMount(prevProps) {
  //   this.setState({ address: this.props.address });
  // }
  handleCheckout() {
    if (this.props.user && this.props.address) {
      const cart = {
        cart: this.props.cart.cart,
        address: this.props.cart.address
      };
      this.props.checkout(cart);
      alert(
        "You have successfully checked out \nThank you for shopping with us!"
      );
      this.props.navigation.navigate("ProductList");
    } else if (!this.props.user) {
      alert("You have to login first to checkout");
      this.props.navigation.navigate("Login");
    } else {
      alert("You have to choose address before checkout");
      this.props.navigation.navigate("CartAddressChoice");
    }
  }

  chooseAddress() {
    this.props.navigation.navigate("CartAddressChoice");
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
          <Button transparent onPress={() => this.handleRemove(oneProduct)}>
            <Icon name="trash" style={{ color: "pink", fontSize: 21 }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    const list = this.props.cart.cart;
    const adress = this.props.addresses.find(
      address => address.id === this.props.address
    );
    return (
      <ImageBackground source={bubbles} style={styles.background}>
        <List>
          {list.map(product => this.renderItem(product))}

          {this.props.cart.cart.length === 0 && (
            <View>
              <Text>No Items in your cart</Text>
            </View>
          )}
        </List>

        {adress && (
          <Card style={styles.transparent}>
            <CardItem style={styles.transparent}>
              <Text style={styles.text}>
                {"Governorate: " + adress.governorate + "\n"}
                {"Area: " + adress.area + "\n"}
                {"Block: " + adress.block + "\n"}
                {"Street: " + adress.street + "\n"}
                {"Building or House: " + adress.building_or_house}
              </Text>
            </CardItem>
          </Card>
        )}

        <Button
          full
          style={{
            backgroundColor: "#79E5BE"
          }}
          onPress={() => this.props.navigation.navigate("ProductList")}
        >
          <Text>Continue Shopping</Text>
        </Button>

        {this.props.cart.cart.length !== 0 && (
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
              <Text>Checkout</Text>
            </Button>
            {this.props.user && (
              <Button
                full
                style={{
                  backgroundColor: "#79E5BE"
                }}
                onPress={() => this.chooseAddress()}
              >
                {this.props.address ? (
                  <Text>Change Address</Text>
                ) : (
                  <Text>Choose Address</Text>
                )}
              </Button>
            )}
          </Footer>
        )}
      </ImageBackground>

      // <<<<<<< to_fix_product_list
      //       <List>
      //         {list.map(product => this.renderItem(product))}
      //         {this.props.cart.cart.length !== 0 ? (
      //           <Button
      //             full
      //             style={{
      //               backgroundColor: "#C34EBE"
      //             }}
      //             onPress={() => this.handleCheckout()}
      //           >
      //             <Text>Checkout</Text>
      //           </Button>
      //         ) : (
      //           <Text>No Items in your cart</Text>
      //         )}
      //       </List>
      // =======
      //       <ImageBackground source={bubbles} style={styles.background}>
      //         <List>{list.map((item, index) => this.renderItem(item, index))}</List>
      //         <Footer
      //           style={{
      //             width: "100%",
      //             alignSelf: "center",
      //             justifyContent: "center",
      //             backgroundColor: "transparent"
      //           }}
      //         >
      //           <Button
      //             full
      //             style={{
      //               backgroundColor: "#79E5BE"
      //             }}
      //             onPress={() => this.handleCheckout()}
      //           >
      //             <Text style={{ fontWeight: "bold" }}>Checkout</Text>
      //           </Button>
      //         </Footer>
      //       </ImageBackground>
      // >>>>>>> master
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth.user,
  addresses: state.address.addresses,
  address: state.cart.address
});

const mapActionsToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItemFromCart(item)),
  checkout: cart => dispatch(checkout(cart))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductCart);
