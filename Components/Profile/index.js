import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/";

import bubbles from "../../assets/images/bubbles.png";
// NativeBase Components
import {
  Thumbnail,
  Picker,
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header,
  Footer,
  Container,
  Icon,
  Left,
  Right
} from "native-base";

import { ImageBackground, View, TouchableOpacity } from "react-native";

import styles from "./styles";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerLeft: (
      <Button
        light
        transparent
        onPress={() => navigation.navigate("ProductList")}
      >
        <Text>
          <Icon
            type="FontAwesome"
            name="list-ul"
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
    this.props.fetchAddresses();
  }

  handlePress(product) {
    this.props.navigation.navigate("UpdateProfile", {
      user: user
    });
  }

  render() {
    const profile = this.props.profile;
    return (
      <ImageBackground source={bubbles} style={styles.background}>
        <Content>
          <List>
            <ListItem style={styles.top}>
              <Left>
                <Text style={styles.text}>
                  Name: {profile.firstname + " " + profile.lastname + "\n"}
                  Date of birth: {profile.dob + "\n"}
                  Email: {profile.email + "\n"}
                  Phone number: {profile.number + "\n"}
                </Text>
              </Left>

              <Body />
              <Right>
                <Thumbnail bordered source={{ uri: profile.profile_pic }} />
              </Right>
            </ListItem>
            <ListItem style={{ borderBottomWidth: 0 }}>
              <Left />
              <Body />
            </ListItem>
          </List>
          <Button
            full
            style={{
              backgroundColor: "#79E5BE"
            }}
            onPress={() => this.props.navigation.navigate("AddressForm")}
          >
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Button>
          <Button
            full
            style={{
              backgroundColor: "#79E5BE"
            }}
            onPress={() => this.props.navigation.navigate("AddressList")}
          >
            <Text style={{ fontWeight: "bold" }}>Check Addresses</Text>
          </Button>
          <Button
            full
            style={{
              backgroundColor: "#79E5BE"
            }}
            onPress={() => this.props.navigation.navigate("OrdersList")}
          >
            <Text style={{ fontWeight: "bold" }}>Check Order History</Text>
          </Button>
        </Content>
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
            onPress={() => this.props.navigation.navigate("UpdateProfile")}
          >
            <Text style={{ fontWeight: "bold" }}>Update</Text>
          </Button>
        </Footer>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  isAuthenticated: state.profile.isAuthenticated
});

const mapActionsToProps = dispatch => {
  return {


    fetchProfile: user => dispatch(actionTypes.fetchProfile(user)),
     fetchAddresses: () => dispatch(actionTypes.fetchAddresses()),
    updateProfile: profile => dispatch(actionTypes.updateProfile(user))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
