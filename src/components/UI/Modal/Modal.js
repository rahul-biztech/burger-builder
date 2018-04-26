import React, { Component } from 'react';
import styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }
    
    componentWillUpdate(){
        log("componentWillUpdate");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modelClosed} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

function log(msg){
    console.log("rv911-Modal: ", msg);
}

export default Modal;