import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 15,

    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  top: {
    marginLeft: 0
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
  container: {
    flex: 1,
    justifyContent: "flex-end"
  }
});

export default styles;
