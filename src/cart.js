import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import {Link} from 'react-router-dom';



export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            message: "Hello",
            discount: '',
            quantities: []
        };
        this.minusOne = this.minusOne.bind(this);
        this.plusOne = this.plusOne.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    minusOne(i) {
        var self = this;
        return function() {
            let cart = self.props.cart;
            let currentSku = cart.lines[i].sku;
            for (var s = 0; s < cart.lines.length; s++) {
                if (cart.lines[s].sku === currentSku && cart.lines[s].quantity > 1) {
                    cart.lines[s].quantity --;
                    self.props.changeCart(cart);
                    break;
                }
            }
        }
    }

    plusOne(i) {
        var self = this;
        return function() {
            let cart = self.props.cart;
            cart.lines[i].quantity ++;
            self.props.changeCart(cart);
        }
    }
    removeItem(item) {
        var self= this;
        return function() {
            let cart = self.props.cart;
            let currentItemSku = self.props.cartTotals.lines[item].sku;
            let key = "lines";
            let newCart = {};
            newCart[key] = cart.lines.filter((el) =>  el.sku != currentItemSku);
            self.props.changeCart(newCart);
        }
    }
    componentDidMount() {
        let cart = this.props.cartTotals;
        this.setState({
            cart
        });
        if(cart.lines) {
            let cartTotal = [];
            let quantities = [];
            for (var i = 0; i < cart.lines.length; i++) {
                if (cart.lines[i].sku == 332119) {
                    //Filter out discounts
                    this.setState ({
                        discount: "earplugs"
                    })
                    cart.lines = cart.lines.filter(function(el) {
                        return el.sku != 332119;
                    })
                } else if(cart.lines[i].sku == 999999) {
                    this.setState ({
                        discount: "twin"
                    })
                    cart.lines = cart.lines.filter(function(el) {
                        return el.sku != 999999;
                    })
                }

                if(cart.lines[i]) {
                    quantities.push(cart.lines[i].quantity);

                }
            }
            this.setState({
                quantities
            })
        }
    }

    render() {
        // Send Get requests to get information of all remaining items in cart then render.
        if (this.props.cartTotals.lines) {
            let cart = this.props.cartTotals;
            Promise.all(
                cart.lines.map(
                    (cart, i) => axios.get('http://challenge.monoqi.net/article/' + cart.sku)
                )
            ).then(res => {
                const allCartItems = res.map((res, i) => {
                    const data = res.data;
                    return(
                        <div key={i} className="cart-item-container">
                            <img className ="cart-item-picture" src={data.image} name={data.name} />
                            <div className="cart-item-description">
                                <p>{data.name}</p>
                                <p>{data.price.amount} {data.price.currency}</p>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={this.minusOne(i)} name="minus">-</button>
                                <p className="cart-current-quantity">{this.props.cartTotals.lines[i].quantity}</p>
                                <button onClick={this.plusOne(i)} name="plus">+</button>
                                <button onClick={this.removeItem(i)} className="remove-item" name="remove">Remove</button>
                            </div>

                        </div>
                    )
                })
                if(this.state.allCartItems != allCartItems) {
                    this.setState({
                        allCartItems
                    })
                }
            })
        }


        let totalAmount;
        let discount;
        if(this.props.cartTotals.total) {
             totalAmount = (
                 <div className="cart-total">Total: {this.props.cartTotals.total.amount} {this.props.cartTotals.total.currency}</div>
             )
        } else {
            totalAmount = (
                <div className="cart-total">Cart empty!</div>
            )
        }
        if (this.state.discount) {

            if(this.state.discount == "earplugs") {
                discount = (
                    <p>Free Earplugs with 2x Ipads</p>
                )
            }
            if(this.state.discount == "twin") {
                discount = (
                    <p id="twin-discount">DISCOUNT: Turntable Twin Pack</p>
                )
            }

        }

        return (
            <div className="cart">
                <div className="cart-header">
                    <div className="arrow-left"></div>
                    <Link to="/catalog"><p id="continue-shopping">Continue Shopping</p></Link>
                </div>
                <div className="cart-main">
                    <div id="white-space">
                    </div>
                    <div className="cart-items">
                        <h3 id="cart-title">YOUR CART({this.props.cartItemsNumber})</h3>
                        {this.state.allCartItems}
                    </div>
                    <div className="cart-summary">
                        <h2>SUMMARY</h2>
                        {discount}
                        {totalAmount}
                        <div className="checkout-button-container">
                            <button className="checkout-button">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
