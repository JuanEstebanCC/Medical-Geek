import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const ChatDoctor = () => {
    const [tipo_usuario, setTipo_usuario] = useState(0)
    
    const doctorName = 'Juan Pedro Monzalve'

    return (
        <body>
            <div className="chat">
                <div className="header-chat">
                    <button></button>
                    <h2>Doctor {doctorName}</h2>
                    <img src="https://www.educima.com/imagen-doctor-dm29789.jpg"/>
                </div>
                <div className="messages"></div>
                <footer class="footer-chat">
                    <input type="text"></input>
                    <button></button>
                </footer>
            </div>
        </body>
    );
}

export default withRouter(ChatDoctor);