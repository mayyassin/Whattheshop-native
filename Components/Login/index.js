import React, { Component } from "react";
import { connect } from "react-redux";

import {
  loginUser,
  registerUser,
  checkForExpiredToken
} from "../../store/actions/authActions";
import bubbles from "../../assets/images/bubbles.png";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import styles from "./styles";
// NativeBase Components
import {
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
  Container
} from "native-base";
import { quantityCounter } from "../../utilities/quantityCounter";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  static navigationOptions = {
    title: "Login"
  };

  login() {
    this.props.login(this.state, this.props.navigation);
  }

  register() {
    this.props.register(this.state, this.props.navigation);
  }

  componentDidMount() {
    // this.props.check(this.props.navigation);
    this.props.check();
  }
  render() {
    return (
      <Content style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
        <Header transparent />
        <ImageBackground source={bubbles} style={styles.background}>
          <List>
            <ListItem style={{ borderBottomWidth: 0 }}>
              <Body>
                <Form>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Username
                    </Label>
                  </Body>
                  <Item
                    rounded
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ username: value })}
                    />
                  </Item>

                  <Body>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Password
                    </Label>
                  </Body>
                  <Item
                    rounded
                    style={{ backgroundColor: "white", marginTop: 10 }}
                  >
                    <Input
                      autoCorrect={false}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ password: value })}
                    />
                  </Item>
                </Form>
              </Body>
            </ListItem>
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: 120,
                backgroundColor: "#16DE9B"
              }}
              success
              onPress={() => this.login()}
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </Button>
            <Text> </Text>
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: 120,
                backgroundColor: "#16DE9B"
              }}
              warning
              onPress={() => this.register()}
            >
              <Text style={{ fontWeight: "bold" }}>Register</Text>
            </Button>
          </List>
          <Body>
            <Label style={{ color: "red", opacity: 0.6 }} />
          </Body>
        </ImageBackground>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapActionsToProps = dispatch => {
  return {
    login: (user, navigation) => dispatch(loginUser(user, navigation)),
    register: (user, navigation) => dispatch(registerUser(user, navigation)),
    // check: navigation => dispatch(checkForExpiredToken(navigation))
    check: () => dispatch(checkForExpiredToken())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
