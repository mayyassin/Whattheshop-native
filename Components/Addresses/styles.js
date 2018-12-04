import { StyleSheet } from "react-native";
import bubbles from "../../assets/images/bubbles.png";

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    flex: 5,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1
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
  },
  transparent: {
    flexDirection: "row"
  }
});

export default styles;
