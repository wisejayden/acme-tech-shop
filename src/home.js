import React from 'react';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        return (
            <div className="splash">
                <img src="/images/desk-tech.jpg" className="splash-image" alt="Our Tech Splash" />
            </div>
        )
    }
}
