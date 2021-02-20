import React from 'react';

const NavbarHome = (props) => {
    
    return (
        <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand">Navbar</a>
                    <div class="d-flex">
                        <a href='/login'>
                            <button type="button" class="btn btn-outline-light button">Iniciar Sesión</button>
                        </a>

                        <a href='/signup'>
                            <button type="button" class="btn btn-outline-light button">Registrarse</button>
                        </a>
                    </div>
                </div>
            </nav>
    );
}

export default NavbarHome;