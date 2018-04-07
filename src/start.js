import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Catalog} from './catalog';
import {Cart} from './cart';
import axios from './axios';
import {Item} from './item';
import {Home} from './home';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            cartItemsNumber: 0,
            cartTotals: {},
            title: '/images/acme-rocket.png'
        };
        this.updateCart = this.updateCart.bind(this);
        this.updateCartNumber = this.updateCartNumber.bind(this);
    }
    updateCartNumber(totalCart) {
        //Loop through returned total, adding every quantity to calculate total number of items in cart
        let count = 0;
        for (var i = 0; i < totalCart.lines.length; i++) {
            count += totalCart.lines[i].quantity;
        }
        this.setState({
            cartItemsNumber: count
        })
    }
    updateCart(newItem) {
        //When updating cart, send a request for a new quote
        let cart = this.state.cart;
        cart.lines.push(newItem);
        this.updateCartNumber(cart);
        this.setState({
            cart
        })
        axios.put('http://challenge.monoqi.net/cart', cart)
            .then((res) => {
                this.setState({
                    cartTotals: res.data
                })
            })
            .catch((err) => {
                console.log("Put request error");
            })
    }
    componentDidMount(){
        //Receive an empty cart on mount
        axios.get('http://challenge.monoqi.net/cart')
            .then((res) => {
                let cart = res.data;
                this.setState({
                    cart
                })
            })
    }
    render() {
        return (
            <BrowserRouter>
            <div>
                <header>
                    <div className="intro-content">
                        <div className="title-container">
                            <Link to="/"><img className="title" src={this.state.title} /></Link>


                        </div>
                        <Link to="/cart"><div className="cart-button">
                            <img alt="shopping-cart" className="shopping-cart-image" src="./images/shopping-cart.svg" />
                            <p id="">({this.state.cartItemsNumber})</p>
                        </div></Link>

                        <div className="links">
                            <Link to="/catalog"><button className="catalog-button" type="button" onClick={this.catalogClick}>Catalog</button></Link>

                        </div>
                    </div>
                </header>
                <footer>   
                </footer>
                <Route
                    exact path="/"
                    component={() => (
                        <Home
                        />
                    )}
                />
                <Route
                    exact path="/catalog"
                    component={() => (
                        <Catalog
                        />
                    )}
                />
                <Route
                    exact path="/cart"
                    component={() => (
                        <Cart
                            cartTotals = {this.state.cartTotals}
                            cartItemsNumber = {this.state.cartItemsNumber}
                        />
                    )}
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
