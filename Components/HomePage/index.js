import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Actions
import { getProducts, fetchProduct } from "../../store/actions/productActions";
import { checkForExpiredToken } from "../../store/actions/authActions";
// Navigation
import Nav from "../Navigation";

class HomePage extends Component {
  componentDidMount() {
    const { productLists } = this.props.product;
    if (!productLists) this.props.getProducts();
    this.props.check();
  }

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  product: state.product
});

const mapActionsToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  fetchProduct: () => dispatch(fetchProduct()),
  check: () => dispatch(checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
