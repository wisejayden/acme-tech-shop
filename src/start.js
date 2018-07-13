import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Catalog} from './catalog';
import {Cart} from './cart';
import axios from './axios';
import {Item} from './item';
import {Home} from './home';
import Top100 from './top100';
import Trending from './trending';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            cartItemsNumber: 0,
            cartTotals: {},
            title: '/images/acme-rocket.png',
            errorMessages: {
                missing: '/images/404error.png'

            },
            monoqiAPI_cart: 'http://challenge.monoqi.net/cart',
            mockAPI_cart: '/cart/api'
        };
        this.updateCart = this.updateCart.bind(this);
        this.updateCartNumber = this.updateCartNumber.bind(this);
        this.changeCart = this.changeCart.bind(this);
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
        //When updating cart, send a request for a new quote. updateCart adds an object to the current cart and then updates.
        let cart = this.state.cart;
        cart.lines.push(newItem);
        this.updateCartNumber(cart);
        this.setState({
            cart
        })
        axios.put(this.state.mockAPI_cart, cart)
            .then((res) => {
                this.setState({
                    cartTotals: res.data
                })
            })
            .catch((err) => {
                console.log("Put request error");
            })
    }
    changeCart(cart) {
        //changeCart takes a whole new cart and then updates.
        this.updateCartNumber(cart);
        this.setState({
            cart
        })
        //If cart is empty (item deleted), retrieve an empty cart from the server.
        if(cart.lines.length === 0) {
            axios.get(this.state.mockAPI_cart)
                .then((res) => {
                    let cart = res.data;
                    this.setState({
                        cart: cart,
                        cartTotals: {}
                    })
                })
        //If cart is not empty, retrieve quote.
        } else {
            axios.put(this.state.mockAPI_cart, cart)
                .then((res) => {
                    this.setState({
                        cartTotals: res.data
                    })
                })
                .catch((err) => {
                    console.log("Put request error");
                })
        }

    }

    componentDidMount(){
        console.log("Hello app");
        //Receive an empty cart on mount
        axios.get(this.state.mockAPI_cart)
            .then((res) => {
                console.log("cart data", res.data);
                let cart = res.data;
                this.setState({
                    cart
                })
            })
            .catch(err => {
                console.log("ERROR", err);
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
                            <p id="cart-image">({this.state.cartItemsNumber})</p>
                        </div></Link>

                        <div className="links">
                            <Link to="/catalog"><button className="header-links" type="button" onClick={this.catalogClick}>Catalog</button></Link>
                            <Link to="/trending"><button className="header-links" type="button" onClick={this.catalogClick}>Trending</button></Link>
                            <Link to="/top100"><button className="header-links" type="button" onClick={this.catalogClick}>Top 100</button></Link>

                        </div>
                    </div>
                </header>

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
                            cart = {this.state.cart}
                            updateCart = {this.updateCart}
                            changeCart = {this.changeCart}
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
                            errorMessages = {this.state.errorMessages}
                        />
                    )}
                />
                <Route
                    exact path="/top100"
                    component={Top100}
                />
                <Route
                    exact path="/trending"
                    component={Trending}
                />
                <footer>
                    <ul>
                        <li>FIND A STORE</li>
                        <li>SIGN UP FOR EMAIL</li>
                        <li>BECOME A MEMBER</li>


                    </ul>
                    <ul>
                    <li>ABOUT US</li>
                    <li>CAREERS</li>
                    <li>PRESS</li>
                    </ul>
                    <div className="social">
                        <ul className="social-list">
                            <li><img className="social-images" src="/images/twitter.png" alt="twitter" /></li>
                            <li><img className="social-images" src="/images/facebook.png" alt="facebook" /></li>
                            <li><img className="social-images" src='/images/instagram.png' /></li>
                        </ul>
                    </div>
                </footer>
            </div>

        </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('main')
);
