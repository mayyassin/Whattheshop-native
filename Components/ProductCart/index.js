import React, { Component } from "react";
import { connect } from "react-redux";
import NumericInput from "react-native-numeric-input";
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
  CardItem,
  Row
} from "native-base";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions

import {
  removeItemFromCart,
  checkout,
  changeQuantity
} from "../../store/actions/cartActions";
import styles from "./styles";

class ProductCart extends Component {
  constructor(props) {
    super(props);
    this.state = { totalPrice: 0 };
    this.getTotalPrice = this.getTotalPrice.bind(this);
  }

  // componentDidMount() {
  //   this.getTotalPrice(this.props.cart.cart);
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.cart !== this.props.cart) {
  //     this.getTotalPrice(this.props.cart.cart);
  //   }
  // }
  getTotalPrice() {
    let cart = this.props.cart.cart;
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += parseFloat(cart[i].item.price) * cart[i].quantity;
    }
    return sum;
    // this.setState({ totalPrice: sum });
  }
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

  changeHandler(itemId, value) {
    this.props.changeQuantity(itemId, value);
  }

  handleCheckout(total) {
    if (this.props.user && this.props.address) {
      const cart = {
        cart: this.props.cart.cart,
        address: this.props.cart.address,
        totalPrice: total
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
        </Left>

        <View>
          <Text note style={{ marginLeft: 16 }}>
            {oneProduct.item.price + " KD "}
          </Text>
        </View>
        <View>
          <NumericInput
            initValue={oneProduct.quantity}
            minValue={1}
            maxValue={oneProduct.item.quantity}
            type="up-down"
            onChange={value => this.changeHandler(oneProduct.item.id, value)}
          />
        </View>

        <Right>
          <Button transparent onPress={() => this.handleRemove(oneProduct)}>
            <Text>
              <Icon
                type="FontAwesome"
                name="trash"
                style={{ color: "#FA07A5", fontSize: 21, fontWeight: "bold" }}
              />
            </Text>
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    const list = this.props.cart.cart;
    const address = this.props.addresses.find(
      address => address.id === this.props.address
    );
    // let total = cart => {
    //   let sum = 0;
    //   for (let i = 0; i < cart.length; i++) {
    //     sum += parseFloat(cart[i].item.price) * cart[i].quantity;
    //   }
    //   return sum;
    // };
    let total = this.getTotalPrice();

    return (
      <ImageBackground source={bubbles} style={styles.background}>
        <List>
          {list.map(product => this.renderItem(product))}

          {this.props.cart.cart.length !== 0 && (
            <View>
              <Text>Total: {total} KD</Text>
            </View>
          )}
          {this.props.cart.cart.length === 0 && (
            <View>
              <Text>No Items in your cart</Text>
            </View>
          )}
        </List>

        {address && (
          <Card style={styles.transparent}>
            <CardItem style={styles.transparent}>
              <Text style={styles.text}>
                {"Governorate: " + address.governorate + "\n"}
                {"Area: " + address.area + "\n"}
                {"Block: " + address.block + "\n"}
                {"Street: " + address.street + "\n"}
                {"Building or House: " + address.building_or_house}
              </Text>
            </CardItem>
          </Card>
        )}

        <Button
          style={{
            alignSelf: "center",
            justifyContent: "center",
            width: 190,
            backgroundColor: "#16DE9B"
          }}
          onPress={() => this.props.navigation.navigate("ProductList")}
        >
          <Text>Continue Shopping</Text>
        </Button>
        <Text />
        {this.props.cart.cart.length !== 0 && (
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: 190,
                backgroundColor: "#16DE9B"
              }}
              onPress={() => this.handleCheckout(total)}
            >
              <Text>Checkout</Text>
            </Button>
            <Text />

            {this.props.user && (
              <Button
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  width: 190,
                  backgroundColor: "#16DE9B"
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
          </View>
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
  checkout: cart => dispatch(checkout(cart)),
  changeQuantity: (itemId, quantity) =>
    dispatch(changeQuantity(itemId, quantity))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductCart);
