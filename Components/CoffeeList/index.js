import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

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
  Body
} from "native-base";

// Style
import styles from "./styles";

// Actions
import { quantityCounter } from "../../utilities/quantityCounter";

class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
    headerRight: (
      <Button
        light
        transparent
        onPress={() => navigation.navigate("CoffeeCart")}
      >
        <Text>
          {navigation.getParam("quantity", 0)}{" "}
          <Icon
            type="FontAwesome"
            name="coffee"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    )
  });

  componenDidMount() {
    this.props.navigation.setParams({ quantity: this.props.quantity });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity != this.props.quantity) {
      this.props.navigation.setParams({ quantity: this.props.quantity });
    }
  }

  handlePress(shop) {
    this.props.navigation.navigate("CoffeeDetail", {
      shop: shop,
      quantity: this.props.quantity
    });
  }

  renderItem(shop) {
    return (
      <TouchableOpacity key={shop.id} onPress={() => this.handlePress(shop)}>
        <ImageBackground
          source={{ uri: shop.background }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: shop.img }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{shop.name}</Text>
                  <Text note style={styles.text}>
                    {shop.distance}
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
    const { coffeeshops } = this.props.coffee;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(shop => this.renderItem(shop));
    }
    return (
      <Container>
        <Content>
          <List>{ListItems}</List>
        </Content>
        <Footer>
          <Button
            success
            onPress={
              this.props.user
                ? () => this.props.logout()
                : () => this.props.navigation.navigate("Login")
            }
          >
            <Icon
              name={this.props.user ? "logout" : "login"}
              type="MaterialCommunityIcons"
            />
          </Button>
          {this.props.user ? (
            <Text>{this.props.user.username.toUpperCase()}</Text>
          ) : (
            <Text>Login</Text>
          )}
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  coffee: state.coffee,
  quantity: quantityCounter(state.cart.list),
  user: state.auth.user
});

const mapActionsToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CoffeeList);
