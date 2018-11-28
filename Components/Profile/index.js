import React, { Component } from "react";
import { connect } from "react-redux";

import {
  loginUser,
  registerUser,
  checkForExpiredToken,
  fetchProfile
} from "../../store/actions/authActions";

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
  Container,
  Icon,
  Left,
  Right
} from "native-base";

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
            // name="productping-cart"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    )
  });

  // componentDidMount() {
  //   this.props.fetchProfile(this.props.user.user_id);
  // }
  render() {
    const profile = this.props.profile;
    return (
      <Content>
        <List>
          <ListItem style={styles.top}>
            <Left>
              <Text style={styles.text}>{profile.firstname + "\n"}</Text>
            </Left>

            <Body />
            <Right>
              <Thumbnail bordered source={{ uri: profile.img }} />
            </Right>
          </ListItem>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Left />
            <Body />
          </ListItem>
          <Button
            full
            style={{
              backgroundColor: "#C34EBE"
            }}
            onPress={() => this.handleAdd()}
          >
            <Text>Add</Text>
          </Button>
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  isAuthenticated: state.auth.isAuthenticated
});

const mapActionsToProps = dispatch => {
  return {
    fetchProfile: user => dispatch(fetchProfile(user))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
