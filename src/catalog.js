import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';



export class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            monoqiAPI: 'http://challenge.monoqi.net/catalog',
            mockAPI: '/catalog/api'
        };
    }
    componentDidMount() {
        //On mount, retrieve entire catalog from server and then dynamically add to the DOM
        axios.get(this.state.mockAPI)
            .then((res) => {
                var articles = res.data.articles;
                console.log("articles", articles);
                console.log("resdata", res.data);
                let allArticles = [];
                for (var i = 0; i < articles.length; i++) {
                    var sku = articles[i].sku;
                    allArticles.push(
                            <div key={i} className="catalog-item-container">
                                <Link to={"/item/" + articles[i].sku}><img name={articles[i].sku} className= "catalog-item-picture" src={articles[i].image} />
                                <div className="catalog-middle">
                                    <div className="catalog-text">Show More</div>
                                </div></Link>
                                <Link to={"/item/" + articles[i].sku}><h2>{articles[i].name}</h2></Link>
                                <p>{articles[i].price.amount} {articles[i].price.currency}</p>
                            </div>
                    )
                }
                this.setState({
                    allArticles
                })
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    render() {
        return(
            <div className="catalog">
                {this.state.allArticles}
            </div>
        )
    }
}
