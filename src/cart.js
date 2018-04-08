import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import {Link} from 'react-router-dom';



export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            message: "Hello",
            discount: []
        };
    }
    componentDidMount() {
        let cart = this.props.cartTotals;
        console.log("");
        this.setState({
            cart
        });
        // let allCartItems = [];
        if(cart.lines) {
            console.log("Cart details", cart);

            let cartTotal = [];
            for (var i = 0; i < cart.lines.length; i++) {
                if (cart.lines[i].sku == 332119) {
                    //Filter out discounts
                    this.setState ({
                        discount: "earplugs"
                    })
                    console.log("Log 332119 discount", cart.lines[i]);
                    cart.lines = cart.lines.filter(function(el) {
                        return el.sku != 332119;
                    })
                } else if(cart.lines[i].sku == 999999) {
                    this.setState ({
                        discount: "twin"
                    })
                    console.log("Log 999999 discount", cart.lines[i]);
                    cart.lines = cart.lines.filter(function(el) {
                        return el.sku != 999999;
                    })
                }
            }
            console.log("CART BEFORE AXIos", cart);
            Promise.all(
                cart.lines.map(
                    (cart, i) => axios.get('http://challenge.monoqi.net/article/' + cart.sku)
                )
            ).then(res => {
                console.log("res", res);

                const allCartItems = res.map((res, i) => {
                    const data = res.data;
                    console.log("data", data);
                    return(
                        <div key={i} className="cart-item-container">
                            <img className ="cart-item-picture" src={data.image} name={data.name} />
                            <div className="cart-item-description">
                                <p>{data.name}</p>
                                <p>{data.price.amount} {data.price.currency}</p>
                            </div>
                            <div className="cart-item-quantity">
                                <button name="minus">-</button>
                                <p>{cart.lines[i].quantity}</p>
                                <button name="plus">+</button>
                            </div>

                        </div>
                    )
                })
                this.setState({
                    allCartItems
                })
            })
        }
    }
    render() {
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
                console.log("EARPLUGS");
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
