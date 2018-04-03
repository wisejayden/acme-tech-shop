import React from 'react';
import axios from './axios';

export class ItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        axios.get(' http://challenge.monoqi.net/article/' + this.props.match.params.sku)
            .then((res) => {
                console.log("Successful sku GET");
            })
    }
    render() {
        return(
            <p>Hello</p>
        )
    }
}
