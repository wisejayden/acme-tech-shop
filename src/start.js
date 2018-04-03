import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import {Catalog} from './catalog';
import {Cart} from './cart';
import axios from './axios';
import {ItemModal} from './itemmodal';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            itemModalVisible: false
        };
        this.itemClick = this.itemClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this);
    }
    itemClick(item) {
        console.log(item.target.name);
        this.setState({
            itemModalVisible: true
        })
    }
    closeModal(e) {
        console.log("Close modal!", e.target);
        this.setState({
            itemModalVisible: false
        })
    }
    stopPropagation(e) {
        e.stopPropagation(e);
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
                            itemClick = {this.itemClick}
                        />
                    )}
                />

                <Route
                    exact path="/cart"
                    component={Cart}
                />

                {this.state.itemModalVisible &&
                    <div className="modal-behind">
                        <div onClick = {this.stopPropagation} className="modal-window">
                            <button onClick={this.closeModal} id="closemenu" onClick={this.closeLargerModal}>X</button>

                            <Route
                                exact path="/item/:sku"
                                component={ItemModal}
                            />
                        </div>
                    </div>
                }


            </div>




        </BrowserRouter>



        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('main')
);
