import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getProducts, fetchProduct } from "../../store/actions/productActions";
import { logoutUser } from "../../store/actions/authActions";

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
  static navigationOptions = ({ navigation }) => ({
    title: "Product List",
    headerLeft: <Text style={{ color: "white", fontSize: 15 }}>Zain</Text>,
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
            // name="productping-cart"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    )
  });

  componenDidMount() {
    this.props.navigation.setParams({ quantity: this.props.quantity });
    if (this.props.product.id) this.props.fetchProduct(product.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity != this.props.quantity) {
      this.props.navigation.setParams({ quantity: this.props.quantity });
    }
  }

  handlePress(product) {
    this.props.navigation.navigate("ProductDetail", {
      product: product,
      quantity: this.props.quantity
    });
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
      ListItems = productLists.map(product => this.renderItem(product));
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
                backgroundColor: "#C34EBE"
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
  quantity: quantityCounter(state.cart.list),
  user: state.auth.user,
  loading: state.product.loading
});

const mapActionsToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
    getProducts: () => dispatch(getProducts()),
    fetchProduct: itemID => dispatch(fetchProduct(itemID))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductList);
