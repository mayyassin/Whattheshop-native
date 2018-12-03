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
import { addProduct } from "../../store/actions/cartActions";
import { fetchProduct } from "../../store/actions/productActions";
import { quantityCounter } from "../../utilities/quantityCounter";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    const product = this.props.navigation.getParam("product", {});
    this.props.fetchProduct(product.id);
    // this.props.navigation.setParams({ quantity: this.state.quantity });
  }

  handleChange(number) {
    console.log(number);
    this.setState({ quantity: number });
  }

  handleAdd() {
    let product = {
      id: this.props.item.id,
      item: this.props.item,
      quantity: this.state.quantity
    };
    this.props.addProduct(product);
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

  // componentDidUpdate(prevProps) {
  //   if (prevProps.quantity != this.props.quantity) {
  //     this.props.navigation.setParams({ quantity: this.props.quantity });
  //   }
  // }

  // changeDrink(value) {
  //   this.setState({
  //     name: value
  //   });
  // }

  // changeOption(value) {
  //   this.setState({
  //     option: value
  //   });
  // }

  render() {
    if (this.props.loading) {
      return <Text>loading</Text>;
    } else {
      return (
        <Content>
          <ImageBackground source={bubbles} style={styles.background}>
            <List>
              <ListItem style={styles.top}>
                <Left>
                  <Text style={styles.text}>
                    {this.props.item.name + "\n"}
                    {this.props.item.category + "\n"}
                    {this.props.item.price + " KD" + "\n"}
                    {"Description: " + this.props.item.description + "\n"}
                    {this.props.item.quantity + " in stock\n"}
                  </Text>
                </Left>

                <Body />
                <Right>
                  <Thumbnail bordered source={{ uri: this.props.item.img }} />
                </Right>
              </ListItem>

              <ListItem style={{ borderBottomWidth: 0 }}>
                <Body>
                  <NumericInput
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    type="up-down"
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
                <Text>Add to cart</Text>
              </Button>
            </List>
          </ImageBackground>
        </Content>
      );
    }
  }
}
const mapStateToProps = state => ({
  item: state.product.productList,
  loading: state.product.loadingB,
  productState: state.product
});

const mapActionsToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
  fetchProduct: itemID => dispatch(fetchProduct(itemID))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductDetail);
