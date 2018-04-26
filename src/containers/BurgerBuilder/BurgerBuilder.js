import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            'salad': 0,
            'bacon': 0,
            'cheese': 0,
            'meat': 0
        },
        totalPrice: 4,
        isPurchable: false,
        isPurchasing: false
    }

    _addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this._updatePurchaseState(updatedIngredients);
    }

    _removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ingredientPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this._updatePurchaseState(updatedIngredients);
    }

    _updatePurchaseState = (ingredients) => {
        const ingredientsMap = Object.keys(ingredients)
        const sum = ingredientsMap.map(img => {
            return ingredients[img];
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
        this.setState({
            isPurchable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({ isPurchasing: true })
    }

    _purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false })
    }

    _purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disableInfos = { ...this.state.ingredients };
        for (const type in disableInfos) {
            disableInfos[type] = disableInfos[type] <= 0;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.isPurchasing}
                    modelClosed={this._purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancel={this._purchaseCancelHandler}
                        purchaseContinue={this._purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this._addIngredientHandler}
                    removeIngredient={this._removeIngredientHandler}
                    isDisable={disableInfos}
                    price={this.state.totalPrice}
                    isPurchable={this.state.isPurchable}
                    isPurchasing={this.purchaseHandler} />
            </Aux>
        );
    }
}

// function log(msg) {
//     console.log("rv911: ", msg);
// }

export default BurgerBuilder;