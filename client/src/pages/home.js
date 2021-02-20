import React from 'react';
import { withRouter } from 'react-router-dom'
import '../styles/styles.css'
import NavbarHome from '../components/navbarHome'

const Home = () => {
    return (
        <body>
            <NavbarHome/>
            
            <div className="main">
                <div className="items-center">
                    <div>
                        
                    </div>

                </div>
            </div>
        </body>
    );
}

export default withRouter(Home);