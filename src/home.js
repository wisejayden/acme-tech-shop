import React from 'react';
import {Link} from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        return (
            <div>
                <div className="splash">
                    <img src="/images/desk-tech.jpg" className="splash-image" alt="Our Tech Splash" />
                    <Link to="/catalog"><button className ="splash-button"  type="button">SHOP NOW</button></Link>
                </div>
                <div className="home-content">

                </div>
            </div>
        )
    }
}
