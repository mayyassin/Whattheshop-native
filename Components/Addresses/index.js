import React, { Component } from "react";
import { connect } from "react-redux";

import { createAddress } from "../../store/actions/AddressActions";
import { setAddress } from "../../store/actions/cartActions";
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
  TextInput,
  Item,
  Content,
  Header,
  Container,
  Picker
} from "native-base";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitHandler = this.submitHandler.bind(this);
  }
  static navigationOptions = {
    title: "Address Form"
  };

  submitHandler(e) {
    this.props.createAddress(this.state, this.props.navigation);
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
                      Governorate*
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
                    <Picker
                      mode="dropdown"
                      iosHeader="Select one"
                      placeHolder="Select a governorate"
                      selectedValue={this.state.governorate}
                      style={{ height: 50, width: 100 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ governorate: itemValue })
                      }
                      style={{ width: "100%" }}
                    >
                      <Picker.Item label="Al-Asimah" value="Al Asimah" />
                      <Picker.Item label="Hawalli" value="Hawalli" />
                      <Picker.Item
                        label="Mubarak Al-Kabeer"
                        value="Mubarak Al-Kabeer"
                      />
                      <Picker.Item label="Al-Ahmadi" value="Al-Ahmadi" />
                      <Picker.Item label="Farwaniya" value="Farwaniya" />
                      <Picker.Item label="Al-Jahra" value="Al-Jahra" />
                    </Picker>
                  </Item>

                  <Body>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Area*
                    </Label>
                  </Body>
                  <Item
                    rounded
                    style={{ backgroundColor: "white", marginTop: 10 }}
                  >
                    <Input
                      name="area"
                      type="text"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ area: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Block*
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
                      type="number"
                      name="block"
                      autoCorrect={false}
                      autoCapitalize="none"
                      keyboardType={"numeric"}
                      onChangeText={value => this.setState({ block: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Street*
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
                      name="street"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ street: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Building or House*
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
                      type="number"
                      name="building_or_house"
                      autoCorrect={false}
                      autoCapitalize="none"
                      keyboardType={"numeric"}
                      onChangeText={value =>
                        this.setState({ building_or_house: value })
                      }
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Floor
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
                      type="number"
                      name="floor"
                      keyboardType={"numeric"}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value => this.setState({ floor: value })}
                    />
                  </Item>
                  <Body>
                    <Text> </Text>
                    <Text> </Text>
                    <Label style={{ fontWeight: "bold", color: "#F32BBD" }}>
                      Extra Directions
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
                      name="extra_directions"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({ extra_directions: value })
                      }
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
                backgroundColor: "#79E5BE"
              }}
              success
              onPress={() => this.submitHandler()}
            >
              <Text style={{ fontWeight: "bold" }}>Add</Text>
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

const mapActionsToProps = dispatch => {
  return {
    createAddress: (address, navigation) =>
      dispatch(createAddress(address, navigation)),
    setAddress: id => dispatch(setAddress(id))
  };
};

export default connect(
  null,
  mapActionsToProps
)(AddressForm);
