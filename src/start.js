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
            cartItemsNumber: 0,
            cartTotals: {}
        };
        this.itemClick = this.itemClick.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.updateCartNumber = this.updateCartNumber.bind(this);
    }
    itemClick(item) {
        // console.log(item.target.name);
    }
    updateCartNumber(totalCart) {
        let count = 0;
        for (var i = 0; i < totalCart.lines.length; i++) {
            count += totalCart.lines[i].quantity;
            console.log("totalcartitems function", totalCart.lines[i].quantity);
        }
        this.setState({
            cartItemsNumber: count
        })
    }
    updateCart(newItem) {
        // let currentNumber = Number(this.state.cartItemsNumber);
        // let newCartNumber = currentNumber + numberAdded;
        let cart = this.state.cart;
        // for (var prop in newItem) {
        //     console.log("for in prop", prop);
        // }

        cart.lines.push(newItem);
        this.updateCartNumber(cart);
        this.setState({
            cart
        })
        axios.put('http://challenge.monoqi.net/cart', cart)
            .then((res) => {
                console.log("put request", res.data);
                this.setState({
                    cartTotals: res.data
                })
                console.log("updated cart", this.state.cart);
                console.log("updated cartValues", this.state.cartTotals);

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
                    component={() => (
                        <Cart
                            cartTotals = {this.state.cartTotals}
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
