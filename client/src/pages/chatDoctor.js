import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/chat.css'

const ChatDoctor = () => {
    const [tipo_usuario, setTipo_usuario] = useState(0)
    
    const patientName = 'Miguel quintero'

    useEffect(()=>{
        fetch('/chats?' + new URLSearchParams({
   
            email: "lorena0118a@gmail.com"
        
        })).then((response) => {
            console.log(response)

        })
    },[])

    return (
        <div className="chat-container">
             
            <div className="available-chats">
            <button className="btn btn-secondary">Cerrar</button>
            <br/><br/>
            <div>
            hola
            </div>
                
            </div>
            <div className="messages-container">
                <div className="header-chat">
                    
                    <h2>Patient {patientName}</h2>
                    <img src="https://d500.epimg.net/cincodias/imagenes/2020/05/04/lifestyle/1588577532_319277_1588577593_noticia_normal.jpg"/>
                </div>
               <div className="messages">
               hola
               </div>
                
            </div>
            
               {/*  <footer class="footer-chat">
                    <input type="text"></input>
                    <button></button>
                </footer> */}
        </div>
    );
}

export default withRouter(ChatDoctor);