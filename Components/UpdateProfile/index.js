import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";

import {
  loginUser,
  registerUser,
  checkForExpiredToken
} from "../../store/actions/authActions";
import {
  fetchProfile,
  updateProfile
} from "../../store/actions/profileActions";
import bubbles from "../../assets/images/bubbles.png";
import DatePicker from "react-native-datepicker";
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

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitHandler = this.submitHandler.bind(this);
  }
  static navigationOptions = {
    title: "UpdateProfile"
  };

  submitHandler(e) {
    this.props.updateProfile(
      this.state,
      this.props.navigation,
      this.props.user.user_id - 1
    );
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }
  render() {
    const profile = this.props.profile;
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
                      First Name
                    </Label>
                  </Body>
                  <Item
                    rounded
                    style={{ backgroundColor: "white", marginTop: 10 }}
                  >
                    <Input
                      name="firstname"
                      type="text"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({ firstname: value })
                      }
                    />
                  </Item>
                  <Body>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Last Name
                    </Label>
                  </Body>
                  <Item
                    rounded
                    style={{ backgroundColor: "white", marginTop: 10 }}
                  >
                    <Input
                      name="lastname"
                      type="text"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ lastname: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Date of birth
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
                    <DatePicker
                      rounded
                      style={{
                        width: 320,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1900-01-01"
                      maxDate="2018-12-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={date => {
                        this.setState({ date: date });
                      }}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Email
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
                      type="text"
                      name="email"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ email: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Phone Number
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
                      type="text"
                      name="number"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ number: value })}
                    />
                  </Item>

                  <Item
                    rounded
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  />
                </Form>
              </Body>
            </ListItem>
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: 120,
                backgroundColor: "#79E5BE"
              }}
              success
              onPress={() => this.submitHandler()}
            >
              <Text style={{ fontWeight: "bold" }}>Update</Text>
            </Button>
            <Text> </Text>
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
  user: state.auth.user,
  profile: state.profile.profile,
  isAuthenticated: state.profile.isAuthenticated
});

const mapActionsToProps = dispatch => {
  return {
    updateProfile: (profile, navigation, profile_id) =>
      dispatch(updateProfile(profile, navigation, profile_id))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateProfile);
