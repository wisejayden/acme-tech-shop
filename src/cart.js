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
        // let allCartItems = [];
        if(cart.lines) {
            console.log("Cart details", cart);

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
        if(this.props.cartTotals.total) {
             totalAmount = (
                 <div>Total: {this.props.cartTotals.total.amount} {this.props.cartTotals.total.currency}</div>
             )
        } else {
            totalAmount = (
                <div>Cart empty!</div>
            )
        }
        return (
            <div>

                <div className="cart-items">
                <h3 id="cart-title">YOUR CART({this.props.cartItemsNumber})</h3>
                    {this.state.allCartItems}
                </div>
                <div className="cart-summary">
                    <h2>SUMMARY</h2>
                    {totalAmount}
                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
        );
    }
}
