import { StyleSheet } from "react-native";
import bubbles from "../../assets/images/bubbles.png";

const styles = StyleSheet.create({
  text: {
    color: "#8E44AD",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 16,

    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    borderBottomColor: "transparent",
    borderBottomWidth: 0
  },
  top: {
    marginLeft: 0
    // backgroundImage: bubbles,
  },
  middleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center"
  },
  addIcon: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white"
  },
  item: {
    color: "white"
  },
  background: {
    flex: 1
  }
});

export default styles;
