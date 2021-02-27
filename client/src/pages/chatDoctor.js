import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/chat.css'

const ChatDoctor = () => {

    const [data, setdata] = useState([{}])
    const [individualChat, setIndividualChat] = useState({})

    const patientName = 'Miguel quintero'

    useEffect(() => {
        fetch(`/chats/lorena0118a@gmail.com`)
            .then(res => res.json())
            .then(data => setdata(data))
    }, [])

    return (
        <div className="chat-container">
            
            <div className="available-chats">
                <button className="btn btn-secondary">Cerrar</button>
                <br /><br />    
                {
                    data.map((item, index)=>{
                        return <button type="button" onClick={() => setIndividualChat(item)}>
                                
                                <div >
                                {item._id}
                                </div>
                        </button>
                        
                    })
                }
                

            </div>
            <div className="messages-container">
                <div className="header-chat">

                    <h2>Patient {patientName}</h2>
                    <img src="https://d500.epimg.net/cincodias/imagenes/2020/05/04/lifestyle/1588577532_319277_1588577593_noticia_normal.jpg" />
                </div>
                <div className="messages">
                    {
                        
                        individualChat.messages.map((item,index)=>{
                            return <div>
                                <h5>{item.author}</h5>
                                <p>{item.message}</p>
                            </div>
                        })
                    }
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