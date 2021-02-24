import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const ChatDoctor = () => {
    const [tipo_usuario, setTipo_usuario] = useState(0)
    
    const patientName = 'Miguel quintero'

    return (
        <body>
            <div className="chat">
                <div className="header-chat">
                    <button></button>
                    <h2>Patient {patientName}</h2>
                    <img src="https://d500.epimg.net/cincodias/imagenes/2020/05/04/lifestyle/1588577532_319277_1588577593_noticia_normal.jpg"/>
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