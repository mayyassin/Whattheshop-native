import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

import { SearchBar } from "react-native-elements";
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

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryChoice: false
    };
    this.handleCategory = this.handleCategory.bind(this);
  }
  state = {
    firstQuery: ""
  };

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

  componentDidMount() {
    this.props.check(this.props.navigation);
    if (this.props.user) {
      this.props.fetchProfile();
      this.props.fetchAddresses();
    }

    this.props.navigation.setParams({ quantity: this.props.quantity });
    if (this.props.product.id) {
      this.props.fetchProduct(product.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity != this.props.quantity) {
      this.props.navigation.setParams({ quantity: this.props.quantity });
    }

    if (this.props.user !== prevProps.user) {
      this.props.fetchProfile();
      this.props.fetchAddresses();
    }
  }

  handlePress(product) {
    this.props.navigation.navigate("ProductDetail", {
      product: product,
      quantity: this.props.quantity
    });
  }

  handleCategory(product) {
    this.props.categoryChoice(product);
  }

  renderItem(product) {
    return (
      <TouchableOpacity
        key={product.id}
        onPress={() => this.handlePress(product)}
      >
        <ImageBackground
          source={{ uri: product.img }}
          style={styles.background}
        >
          <View style={styles.overlay} />

          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: product.img }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{product.name}</Text>
                  <Text note style={styles.text}>
                    {product.distance}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    const { productLists } = this.props.product;
    let ListItems;
    if (productLists) {
      ListItems = this.props.filteredProducts.map(product =>
        this.renderItem(product)
      );
    }

    if (this.props.loading) {
      return <Text>loading</Text>;
    } else {
      return (
        <Container>
          <SearchBar
            onChangeText={event => this.props.onSearch({ ListItems })}
            placeholder="Type Here..."
          />
          <Content>
            <Button
              style={{
                backgroundColor: "#79E5BE"
              }}
              onPress={event => this.props.categoryChoice("")}
            >
              <Text
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                All
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#79E5BE"
              }}
              onPress={event => this.props.categoryChoice("Food")}
            >
              <Text
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                Food
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#79E5BE"
              }}
              onPress={event => this.props.categoryChoice("Drinks")}
            >
              <Text
                style={{
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                Drinks
              </Text>
            </Button>
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

  quantity: quantityCounter(state.cart.cart),
  filteredProducts: state.product.filteredProducts,

  user: state.auth.user,
  loading: state.product.loadingA
});

const mapActionsToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logoutUser()),
    getProducts: () => dispatch(actionCreators.getProducts()),
    fetchProduct: itemID => dispatch(actionCreators.fetchProduct(itemID)),
    fetchProfile: user => dispatch(actionCreators.fetchProfile(user)),
    onSearch: query => dispatch(actionCreators.filterProducts(query)),
    categoryChoice: query => dispatch(actionCreators.filterCategory(query)),
    check: navigation =>
      dispatch(actionCreators.checkForExpiredToken(navigation)),
    fetchAddresses: () => dispatch(actionCreators.fetchAddresses())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductList);
