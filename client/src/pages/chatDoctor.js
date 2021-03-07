import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import io from 'socket.io-client'
import queryString from 'query-string';
import { Formik, Form, Field } from "formik";
import useAuthContext from '../hooks/useAuthContext';

import '../styles/chat.css'

/* let socket; */

const Chat = () => {
    const {Logout} = useAuthContext();

    const [data, setdata] = useState([{participants: [{}]}]);
    const [individualChat, setIndividualChat] = useState({ messages: [{ /* author: '', messages: '' */ }], participants: [{}] });
    const [chatName, setChatName] = useState();

    //Connection socket.io
    const socket = io('http://localhost:3000')  

    useEffect(() => {
        fetch(`/chats/lorena0118a@gmail.com`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setdata(data)
            })
    }, [])

    //Save new message in database
    function newMessage(values) {
        if (values.message != "") {

            socket.emit('chat:message', {
                message: values.message
            });

            fetch('/new_message', {
                method: "PUT",
                headers: { "content-Type": "application/JSON" },
                body: JSON.stringify({
                    email: "lorena0118a@gmail.com",
                    email_participant1: "lorena0118a@gmail.com",
                    email_participant2: "Carlos@gmail.com",
                    author: "Lorena",
                    message: values.message
                })
            })
        }
    }

    function logout() {
        Logout();
    }

    return (
        <body>


            <div className="chat-container">

                <div className="available-chats">
                    <button className="btn btn-secondary" onClick={logout}>Cerrar</button>
                    <br /><br />
                    {
                        data.map((item, index) => {
                            let chatName = 'no sirve';    

                            item.participants.map((item2,index2)=>{
                                 if(item2.email != 'lorena0118a@gmail.com'){
                                chatName = item2.name;
                                } 
                            })
                            
                            return <div className="chat-button">
                                <button type="button" className="btn chat" onClick={async () => {
                                    await setIndividualChat(item)
                                    item.participants.map((item2, index) => {
                                        if (item2.email != 'lorena0118a@gmail.com') {
                                            setChatName(item2.name)
                                        }
                                    })

                                    
                                }}>


                                    {chatName}

                                </button>
                            </div>


                        })

                    }




                </div>
                <div className="messages-container">
                    <div className="header-chat">
                        
                        <h2> {chatName}</h2>
                        <img src="https://d500.epimg.net/cincodias/imagenes/2020/05/04/lifestyle/1588577532_319277_1588577593_noticia_normal.jpg" />
                    </div>
                    <div className="messages">
                        {

                            individualChat.messages.map((item, index) => {

                                let messagesDesign = "leftMessage"

                                if (item.email == "lorena0118a@gmail.com") {
                                    messagesDesign = "rightMessage"
                                }
                                return <div className={messagesDesign}>
                                    {item.message} <br />

                                </div>


                            })


                        }
                    </div>
                    <div className="input-messages-container">
                        <Formik
                            initialValues={{
                                message: ""
                            }}
                            onSubmit={(values) => {
                                console.log(values)
                                newMessage(values)
                            }}
                        >
                            {(formik) => (
                                <Form>

                                    <div className="mb-3 input-messages-container">
                                        <label
                                            htmlFor="message"
                                            className="form-label letter general-letter"
                                        >

                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control input-messages"
                                            id="message"
                                            name="message"
                                        />
                                        -<button type="submit" className="btn btn-info">Enviar</button>
                                    </div>

                                    

                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>

                {/*  <footer class="footer-chat">
                    <input type="text"></input>
                    <button></button>
                </footer> */}
            </div>
        </body>
    );
}

export default withRouter(Chat);