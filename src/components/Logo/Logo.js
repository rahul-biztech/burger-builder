import React from 'react';
import appLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.css';

const logo = (props) => (
    <div className={styles.Logo}
        style={{ height: props.height }}>
        <img src={appLogo} alt={'Burger Builder'} />
    </div >
);

export default logo;