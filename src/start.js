import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Welcome />,
    document.querySelector('main')
);


export class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>Hello?</div>
        );
    }
}
