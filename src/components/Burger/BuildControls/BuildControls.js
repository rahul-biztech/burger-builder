import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {
            controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    isDisable={props.isDisable[control.type]}
                    added={() => props.addIngredient(control.type)}
                    removed={() => props.removeIngredient(control.type)} />
            ))
        }
        <button
            className={styles.OrderButton}
            disabled={!props.isPurchable}
            onClick={props.isPurchasing}>ORDER NOW</button>
    </div>
);

export default buildControls;