import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';



export class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        axios.get('http://challenge.monoqi.net/catalog')
            .then((res) => {
                var articles = res.data.articles;
                let allArticles = [];
                console.log("Successful axios", articles[0]);
                for (var i = 0; i < articles.length; i++) {
                    allArticles.push(
                            <div key={i} className="catalog-item-container">
                                <Link to="/item/199203
                                "><img onClick={this.props.itemClick} name={articles[i].sku} className= "catalog-item-picture" src={articles[i].image} /></Link>
                                <h2>{articles[i].name}</h2>
                                <p>{articles[i].price.amount} {articles[i].price.currency}</p>
                            </div>
                    )
                }
                this.setState({
                    allArticles
                })
                    console.log("this state", this.state.allArticles);
            })
    }
    // articleClick(e) {
    //     console.log(e.target.name);
    // }
    render() {
        console.log(this.state.allArticles);
        return(
            <div className="catalog">
                {this.state.allArticles}
            </div>
        )
    }
}
