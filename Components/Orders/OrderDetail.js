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
            Product name:{product.name} | Price: {product.price} | Quantity:{
              product.quantity
            }
          </Text>
        ));
      }

      return (
        <ImageBackground source={bubbles} style={styles.background}>
          <Content style={{ flex: 3 }}>
            <Body style={styles.bodyText}>
              <Text style={styles.text}>
                Order Number: {order.id + "\n"}
                Status: {order.status + "\n"}
                Date of Order: {order.ordered_on + "\n"}
              </Text>
              <Text style={styles.text}> {OrderItems}</Text>
              <Text style={styles.text}>
                Governorate: {order.address.governorate}
                Area:{order.address.area}
                Block:{order.address.block}
                Street:{order.address.street}
                Building:{order.address.building_or_house}
                Floor:{order.address.governorate}
                Extra Directions:{order.address.extra_directions}
              </Text>
            </Body>

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
                  backgroundColor: "#F32BBD"
                }}
                onPress={() => this.handleAdd()}
              >
                <Text>Add</Text>
              </Button>
            </Footer>
          </Content>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  order: state.orders.order,
  loading: state.orders.loadingB
});

const mapActionsToProps = dispatch => ({
  fetchOrder: orderID => dispatch(actionCreators.fetchOrder(orderID))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OrderDetail);
