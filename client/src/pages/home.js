import React from 'react';
import { withRouter } from 'react-router-dom'
import '../styles/styles.css'

const Home = () => {
    return (
        <body>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Nombre de la app</span>
                </div>
            </nav>
            <div className="main">
                <div className="items-center">
                    <div>
                        hola
                    </div>
                    
                </div>
            </div>
        </body>
    );
}

export default withRouter(Home);