import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const ChatPatient = () => {
    const [tipo_usuario, setTipo_usuario] = useState(0)
    
    const DoctorName = 'Juan Pedro Monzalve'

    return (
        <body>
            <div className="chat">
                <div className="header-chat">
                    <button></button>
                    <h2>Doctor {DoctorName}</h2>
                    <img src="https://st.depositphotos.com/1771835/1477/i/950/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg"/>
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

export default withRouter(ChatPatient);