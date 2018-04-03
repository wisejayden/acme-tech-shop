import React from 'react';
import axios from './axios';

export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
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
                            <button name="minus">-</button>
                            <input placeholder="1"></input>
                            <button name="plus">+</button>
                            <button className="add-cart-button"type="button">Add To Cart</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
