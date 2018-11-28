import React, { Component } from "react";
import { connect } from "react-redux";

import {
  loginUser,
  registerUser,
  checkForExpiredToken
} from "../../store/actions/authActions";

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
    this.props.check(this.props.navigation);
  }
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ fontWeight: "bold", color: "#6C3483" }}>
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
                  <Label style={{ fontWeight: "bold", color: "#6C3483" }}>
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
              backgroundColor: "#C34EBE"
            }}
            success
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>
          <Text> </Text>
          <Button
            style={{
              alignSelf: "center",
              justifyContent: "center",
              width: 120,
              backgroundColor: "#C34EBE"
            }}
            warning
            onPress={() => this.register()}
          >
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
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
    check: navigation => dispatch(checkForExpiredToken(navigation))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
