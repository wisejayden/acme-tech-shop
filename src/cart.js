import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';



export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            message: "Hello"
        };
    }
    componentDidMount() {
        let cart = this.props.cartTotals;
        this.setState({
            cart
        });
        let allCartItems = [];
        console.log("STATE CART", this.state.cart);
        if(cart.lines) {
            console.log("TOTAL", cart);
            console.log("AMOUNT?", this.props.cartTotals.total.amount);


            let allAxiosCalls = new Promise((resolve, reject) => {
                for (let i = 0; i < cart.lines.length; i++) {
                    var p = i;
                    axios.get(' http://challenge.monoqi.net/article/' + cart.lines[i].sku)
                        .then((res) => {
                            console.log("Log the quantity", cart.lines[p]);

                            allCartItems.push(
                                <div key={i} className="cart-item-container">
                                    <img className ="cart-item-picture" src={res.data.image} name={res.data.name} />
                                    <div className="cart-item-description">
                                        <p>{res.data.name}</p>
                                        <p>{res.data.price.amount} {res.data.price.currency}</p>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button name="minus">-</button>
                                        <p>{cart.lines[p].quantity}</p>
                                        <button name="plus">+</button>
                                    </div>

                                </div>
                            );
                        })
                }
                resolve();
            })
            allAxiosCalls.then(() => {
                console.log("LETS SEE THE OBJECT", allCartItems);
                this.setState({
                    allCartItems
                })
                console.log("LOG STATE", this.state.allCartItems);
            })
        }

    }
    render() {

        return (
            <div>

                <div className="cart-items">
                <h3 id="cart-title">YOUR CART({this.props.cartItemsNumber})</h3>
                    {this.state.allCartItems}
                </div>
                <div className="cart-summary">
                    <h2>SUMMARY</h2>

                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
        );
    }
}
