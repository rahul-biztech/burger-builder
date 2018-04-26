import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    _closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    _openSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true })
    }

    render() {

        return (
            <Aux>
                <Toolbar openDrawer={this._openSideDrawerHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this._closeSideDrawerHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;