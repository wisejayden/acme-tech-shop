import React from 'react';
import ReactDOM from 'react-dom';


export class Catalog extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        console.log("log catalog", this.props.currentCatalog[0].image);
        if (!this.props) {
            return (
                <div>
                <p>Loading</p>
                </div>
            );
        } else {
            return (
                <div>
                    <img src={this.props.currentCatalog[0].image} />
                </div>
            );
        }
    }
}
