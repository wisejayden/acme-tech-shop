import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Catalog} from './catalog';
import {Cart} from './cart';
import axios from './axios';
import {Item} from './item';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            cartItemsNumber: 0
        };
        this.itemClick = this.itemClick.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }
    itemClick(item) {
        console.log(item.target.name);
    }
    updateCart(numberAdded) {
        let currentNumber = Number(this.state.cartItemsNumber);
        let newCartNumber = currentNumber + numberAdded;
        this.setState({
            cartItemsNumber: newCartNumber
        })
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                <header className="intro">

                    <div className="intro-content">
                        <Link to="/"><h1>ACME Tech Shop</h1></Link>
                        <div className="links">
                            <Link to="/catalog"><button className="catalog-button" type="button" onClick={this.catalogClick}>Catalog</button></Link>
                            <Link to="/cart"><button className="cart-button" type="button">View Cart ({this.state.cartItemsNumber})</button></Link>
                        </div>
                    </div>

                </header>
                <h2>Welcome to the Shop!</h2>

                <Route
                    exact path="/catalog"
                    component={() => (
                        <Catalog
                            itemClick = {this.itemClick}
                        />
                    )}
                />

                <Route
                    exact path="/cart"
                    component={Cart}
                />


                <Route
                    exact path="/item/:sku"
                    component={(props) => (
                        <Item
                            match = {props.match}
                            history = {props.history}
                            updateCart = {this.updateCart}
                        />
                    )}
                />




            </div>




        </BrowserRouter>



        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('main')
);
