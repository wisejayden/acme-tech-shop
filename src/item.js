import React from 'react';
import axios from './axios';

export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            numberOfItemsToAdd: 1
        };
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.addToCart = this.addToCart.bind(this);

    }
    componentDidMount() {
        //Make an API request for item details by SKU
        axios.get(' http://challenge.monoqi.net/article/' + this.props.match.params.sku)
            .then((res) => {
                let item = res.data
                item.description = item.description.replace(/<(?:.|\n)*?>/gm, '');
                this.setState({
                    item
                })
            })
            .catch((err) => {
                //In case of error from server, provide error message.
                this.setState({
                    errorMessage: this.props.errorMessages.missing
                })
            })
    }
    minusOne() {
        if(this.state.numberOfItemsToAdd > 1) {
            let newNumber = this.state.numberOfItemsToAdd - 1;
            this.setState({
                numberOfItemsToAdd: newNumber
            })
        }
    }
    addOne() {
        let newNumber = this.state.numberOfItemsToAdd + 1;
        this.setState({
            numberOfItemsToAdd: newNumber
        })
    }
    addToCart() {
        //Create object to update cart details
        let numberAdded = Number(this.refs.numberOfItems.value);
        let addItem = {
            'sku': this.props.match.params.sku,
            'quantity': numberAdded
        }
        this.props.updateCart(addItem);
    }
    render() {
        let displayErrorMessage;
        if (this.state.errorMessage) {
            displayErrorMessage = (
                <div className="error-container">
                    <h2>Error 404</h2>
                    <img className ="error-missing" src={this.state.errorMessage} alt="error 404"/>

                    <p>It appears this product has vanished. We're hunting for it now so please try again later.</p>
                </div>
            )
        }
        return(
            <div className="item-page">
                {this.state.item &&
                    <div className = "item">
                        <div className="item-container">
                            <img src={this.state.item.image} className="item-image"/>
                            <div className="item-add">
                                <button onClick={this.minusOne} name="minus">-</button>
                                <input id="item-quantity" type="text" value={this.state.numberOfItemsToAdd} ref="numberOfItems"/>
                                <button onClick={this.addOne} name="plus">+</button>
                                <button onClick={this.addToCart} className="add-cart-button"type="button">Add To Cart</button>
                            </div>
                        </div>
                            <div id="item-description">
                                <h2>{this.state.item.name}</h2>
                                <p>{this.state.item.price.amount} {this.state.item.price.currency}</p>
                                <p>{this.state.item.description}</p>
                            </div>

                    </div>
                }
                {displayErrorMessage}

            </div>
        )
    }
}
