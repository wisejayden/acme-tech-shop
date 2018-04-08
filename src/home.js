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
                    <div className="home-content-box">
                        <h2>Lorem</h2>
                        <p>An velit fabulas reprehenderit. In incididunt hic admodum. Singulis in export
                        senserit est tempor te constias ad cillum.Labore non ullamco, ex an arbitrantur.
                        Ea cillum praetermissum. Officia legam commodo consequat o mandaremus ad aute do
                        quo o quid quis legam aut cupidatat veniam ingeniis cernantur. Fabulas o
                        fabulas, sed nulla fore non mandaremus, ipsum incurreret ea familiaritatem, quae
                        constias ubi duis malis, ea duis appellat ne non legam legam ut proident,
                        iudicem illum excepteur cupidatat aut minim litteris se occaecat.</p>
                    </div>

                </div>
            </div>
        )
    }
}
