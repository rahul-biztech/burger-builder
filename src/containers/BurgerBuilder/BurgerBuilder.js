import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

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
        isPurchasing: false,
        isLoading: false,
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
        this.setState({isLoading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rahulprasad Verma',
                address: {
                    street: 'New S. G. Road',
                    zipCode: '380015',
                    country: 'India'
                },
                email: 'test.rv911@gmail.com'
            },
            deliveryMethod: 'Express'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({isLoading: false, isPurchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false, isPurchasing: false});
            });
    }

    render() {
        const disableInfos = { ...this.state.ingredients };
        for (const type in disableInfos) {
            disableInfos[type] = disableInfos[type] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancel={this._purchaseCancelHandler}
            purchaseContinue={this._purchaseContinueHandler} />;

        if (this.state.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.isPurchasing}
                    modelClosed={this._purchaseCancelHandler}>
                    {orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);