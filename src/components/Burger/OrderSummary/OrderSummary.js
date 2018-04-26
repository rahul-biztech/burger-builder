import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){
        log("componentWillUpdate");
    }

    render() {
        const ingredients = this.props.ingredients;
        const summary = Object.keys(ingredients)
            .map(ing => {
                return <li key={ing}><span style={{ textTransform: 'capitalize' }}>{ing}: {ingredients[ing]}</span></li>
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients: </p>
                <ul>
                    {summary}
                </ul>
                <p>Continute to checkout?</p>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <Button
                    btnType={'Danger'}
                    clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button
                    btnType={'Success'}
                    clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}

function log(msg){
    console.log("rv911-OS: ", msg);
}

export default OrderSummary;

