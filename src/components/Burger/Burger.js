import React from 'react';
import styles from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {

    const receivedIngredients = Object.keys(props.ingredients);
    const transformedIngredients = receivedIngredients.map((ingKey) => {
        const ingArray = [...Array(props.ingredients[ingKey])];
        return ingArray.map((_, index) => {
            return <Ingredient key={ingKey + index} type={ingKey} />
        })
    })

    let finalIngredients = transformedIngredients.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    }, []);

    if (finalIngredients.length === 0) {
        finalIngredients = <p>Please add some ingredients</p>;
    }

    return (
        <div className={styles.Burger}>
            <Ingredient type="bread-top" />
            {finalIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

// function log(msg) {
//     console.log("rv911: ", msg);
// }

export default burger;