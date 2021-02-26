import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';

const ChatPatient = () => {
    const [data, setdata] = useState('')
    
    const DoctorName = 'Juan Pedro Monzalve'

    useEffect(()=>{
        fetch(`/chats/lorena0118a@gmail.com`) 
        .then(res => res.json())
        .then(data => {
            setdata(data[0].messages)
            console.log(data)
        })
    },[])
    const array = Array.from(data)

    return (
        <body>
            <div className="chat">
                <div className="header-chat">
                    <button></button>
                    <h2>Doctor {DoctorName}</h2>
                    <img src="https://st.depositphotos.com/1771835/1477/i/950/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg"/>
                </div>
                <div className="messages">
                   {
                        array.map(data =>
                            <div className="message">
                                <h3>{data.author}: {data.message}</h3>
                            </div> 
                        )
                    }                               
                </div>
                <footer class="footer-chat">
                    <input type="text"></input>
                    <button></button>
                </footer>
            </div>
        </body>
    );
}

export default withRouter(ChatPatient);