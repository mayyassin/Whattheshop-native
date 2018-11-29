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
  Content
} from "native-base";

// Style
import styles from "./styles";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
// Actions
import { addItemToCart } from "../../store/actions/cartActions";
import { quantityCounter } from "../../utilities/quantityCounter";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Product",
      option: "Small"
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("product", {}).name,
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

  componenDidMount() {
    this.props.navigation.setParams({ quantity: this.props.quantity });
    this.props.fetchProduct(this.props.match.params.itemID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity != this.props.quantity) {
      this.props.navigation.setParams({ quantity: this.props.quantity });
    }
  }

  changeDrink(value) {
    this.setState({
      name: value
    });
  }

  changeOption(value) {
    this.setState({
      option: value
    });
  }

  handleAdd() {
    const { name, option } = this.state;
    const { list } = this.props.cart;
    let item = {
      name: name,
      option: option,
      quantity: 1
    };
    this.props.addItemToCart(item, list);
  }

  render() {
    const productList = this.props.navigation.getParam("product", {});
    return (
      <Content>
        <ImageBackground source={bubbles} style={styles.background}>
          <List>
            <ListItem style={styles.top}>
              <Left>
                <Text style={styles.text}>
                  {productList.name + "\n"}
                  {productList.category + "\n"}
                  {productList.price + " KD" + "\n"}
                  {productList.description + "\n"}
                  {productList.quantity + "\n"}
                  <Text note>{productList.location}</Text>
                </Text>
              </Left>

              <Body />
              <Right>
                <Thumbnail bordered source={{ uri: productList.img }} />
              </Right>
            </ListItem>
            <ListItem style={{ borderBottomWidth: 0 }}>
              <Left>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 150 }}
                  selectedValue={this.state.name}
                  onValueChange={this.changeDrink.bind(this)}
                >
                  <Picker.Item label="Product" value="Product" />
                  <Picker.Item label="Lattee" value="Lattee" />
                  <Picker.Item label="Espresso" value="Espresso" />
                </Picker>
              </Left>
              <Body>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 150 }}
                  selectedValue={this.state.option}
                  onValueChange={this.changeOption.bind(this)}
                >
                  <Picker.Item label="Small" value="Small" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Large" value="Large" />
                </Picker>
                <NumericInput
                  label="quantity"
                  type="up-down"
                  onChange={value => console.log(value)}
                />
              </Body>
            </ListItem>
            <Button
              full
              style={{
                backgroundColor: "#79E5BE"
              }}
              onPress={() => this.handleAdd()}
            >
              <Text>Add</Text>
            </Button>
          </List>
        </ImageBackground>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
  user: state.auth.user,
  quantity: quantityCounter(state.cart.list)
});

const mapActionsToProps = dispatch => ({
  addItemToCart: (item, cart) => dispatch(addItemToCart(item, cart)),
  fetchProduct: itemID => dispatch(fetchProduct(itemID))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductDetail);
