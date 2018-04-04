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
        let allCartItems = [];
        if(cart.lines) {
            console.log("TOTAL", cart);

            let allAxiosCalls = new Promise((resolve, reject) => {
                for (var i = 0; i < cart.lines.length; i++) {
                    axios.get(' http://challenge.monoqi.net/article/' + cart.lines[i].sku)
                        .then((res) => {
                            allCartItems.push(
                                <div key={i} className="cart-item-container">
                                    <img className ="cart-item-picture" src={res.data.image} name={res.data.name} />
                                    <h2>{res.data.name}</h2>
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
                <h1>Cart</h1>
                <div className="cart-items">
                    {this.state.allCartItems}
                </div>
                <div className="total">
                    <p>Total is </p>
                    <button className="checkout-button" />
                </div>
            </div>
        );
    }
}
