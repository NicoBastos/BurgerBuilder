import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://bugerbuilder-2c321.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => this.setState({ error: true }));
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        mame: "nick",
        address: {
          street: "street!",
          zip: 78749,
          country: "estonia",
        },
        email: "nick@Nick.com",
      },
      deliverMethod: "fast",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };

  updatePurchaseSate(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const originalCount = this.state.ingredients[type];

    if (originalCount === 5) {
      return;
    }
    const updatedCount = originalCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseSate(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const originalCount = this.state.ingredients[type];

    if (originalCount < 1) {
      return;
    }

    const updatedCount = originalCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseSate(updatedIngredients);
  };
  render() {
    const lessDisabledInfo = {
      ...this.state.ingredients,
    };
    const moreDisabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in lessDisabledInfo) {
      lessDisabledInfo[key] = lessDisabledInfo[key] <= 0;
    }
    for (let key in moreDisabledInfo) {
      moreDisabledInfo[key] = moreDisabledInfo[key] > 4;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            lessDisabled={lessDisabledInfo}
            moreDisabled={moreDisabledInfo}
            totalPrice={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          pruchaseContinue={this.purchaseContinueHandler}
          total={this.state.totalPrice}
        />
      );
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
