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
        axios.get(' http://challenge.monoqi.net/article/' + this.props.match.params.sku)
            .then((res) => {
                console.log("Successful sku GET", res.data);
                let item = res.data
                item.description = item.description.replace(/<(?:.|\n)*?>/gm, '');
                this.setState({
                    item
                })
                console.log(this.state.item.description);
            })
    }
    minusOne() {
        console.log("minus one!");
        if(this.state.numberOfItemsToAdd > 1) {
            let newNumber = this.state.numberOfItemsToAdd - 1;
            this.setState({
                numberOfItemsToAdd: newNumber
            })
        }
    }
    addOne() {
        console.log("Add one!");
        let newNumber = this.state.numberOfItemsToAdd + 1;
        this.setState({
            numberOfItemsToAdd: newNumber
        })
    }
    addToCart() {
        let numberAdded = Number(this.refs.numberOfItems.value);
        this.props.updateCart(numberAdded);
    }
    render() {
        return(
            <div>

                {this.state.item &&
                    <div>
                        <div className="item-container">
                            <img src={this.state.item.image} className="item-image"/>
                            <h2>{this.state.item.name}</h2>
                            <p>{this.state.item.price.amount} {this.state.item.price.currency}</p>
                            {this.state.item.description}
                        </div>
                        <div className="item-add">
                            <button onClick={this.minusOne} name="minus">-</button>
                            <input type="text" value={this.state.numberOfItemsToAdd} ref="numberOfItems"/>
                            <button onClick={this.addOne} name="plus">+</button>
                            <button onClick={this.addToCart} className="add-cart-button"type="button">Add To Cart</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
