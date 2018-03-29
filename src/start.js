import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Catalog} from './catalog';
import {Cart} from './cart';
import axios from './axios';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            currentCatalog: ''
        };
        this.catalogClick = this.catalogClick.bind(this);
    }
    catalogClick() {
        console.log("Hello!");
        axios.get('http://challenge.monoqi.net/catalog')
            .then((res) => {
                console.log("successful axios", res.data.articles);
                this.setState({
                    currentCatalog: res.data.articles
                })
            })
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                <header className="intro">

                    <div className="intro-content">
                        <Link to="/"><h1>ACME Tech Shop</h1></Link>
                        <div className="links">
                            <Link to="/catalog"><button className="catalog-button" type="button" onClick={this.catalogClick}>Catalog</button></Link>
                            <Link to="/cart"><button className="cart-button" type="button">View Cart</button></Link>
                        </div>
                    </div>

                </header>
                <h2>Welcome to the Shop!</h2>

                <Route
                    exact path="/catalog"
                    component={() => (
                        <Catalog
                            currentCatalog = {this.currentCatalog}
                        />
                    )}
                />

                <Route
                    exact path="/cart"
                    component={Cart}
                />
            </div>


        </BrowserRouter>



        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('main')
);
