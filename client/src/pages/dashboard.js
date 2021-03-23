import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { Formik, Form, Field } from "formik";
import io from "socket.io-client";
import Logo from "../images/logo.ico";

const socket = io('http://localhost:3000')

/*socket.on('new:message', function(data){
  let container =  document.getElementById('container-messages')

  if (data.sender_id != localStorage.getItem("id")) {('msg_history').append (
    container.innerHTML += `<div class="rightMessage">${data.message} <br /></div>`
  )
}})*/
socket.on('new:message', function(data){
  let container =  document.getElementById('container-messages')
  container.innerHTML += `<div class="rightMessage">${data.message} <br /></div>`
})

const Dashboard = () => {
  const [datos, setdatos] = useState([{}]);
  const [chats, setChats] = useState([{ participants: [] }]);
  const [individualChat, setIndividualChat] = useState({
    messages: [
      {
        /* author: '', messages: '' */
      },
    ],
    participants: [{}],
  });
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const { Logout } = useAuthContext();

  useEffect(() => {
    (async () => {
      await fetch("/user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => setdatos(data));

      fetch(`/chats/${localStorage.getItem("email")}`)
        .then((res) => res.json())
        .then((data) => {
          setChats(data);
        });
    })();
  }, [token]);

  function logout() {
    Logout();
  }

  //Save new message in database
  async function newMessage(values) {
    if (individualChat.participants[0].email && values.message) {
      await socket.emit("chat:message", {
        message: values.message,
        sender_id: localStorage.getItem("id")
      });

      fetch("/new_message", {
        method: "PUT",
        headers: { "content-Type": "application/JSON" },
        body: JSON.stringify({
          email: datos.email,
          email_participant1: individualChat.participants[0].email,
          email_participant2: individualChat.participants[1].email,
          author: datos.full_name,
          message: values.message,
        }),
      });

      const context_message =  document.getElementById('message');
      context_message.value = "";
      values.message = "";
      
    } else if (!individualChat.participants[0].email){
      alert('choose a recipient')
    } else {alert('write a message')}
  }

  return (
    <>
      <div className="row">
        <div className="col s4">
          <h4 className="text-center">
            {datos.usertype === 2 ? "Your doctor" : "Your patients"}
          </h4>
          {chats.map((item, index) => {
            let name;
            item.participants.map((item2, index2) => {
              if (item2.email != localStorage.getItem("email")) {
                name = item2.name;
              }
            });
            return (
              <div
                onClick={() => {
                  setIndividualChat(item);
                  console.log(individualChat);
                  /* socket = io(`http://localhost:3000/dashboard${individualChat._id}`)  */
                }}
              >
                <img
                  className="mx-auto d-block rounded-circle"
                  alt="Preview"
                  src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
                />
                <p className="mx-auto d-block text-center text-muted ">
                  {name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="col s4">
          {/*<h3 className="text-center">
            Hi! This is{" "}
            <img
              className="materialboxed ml-10 center-block hoverable"
              width="100"
              src={Logo}
            />
          </h3>
          <div class="input-field col s10">
            <input id="last_name" type="text" className="validate" />
            <label for="last_name">Write here</label>
            <button
              className="btn waves-effect waves-light mx-auto d-block deep-purple lighten-1 hoverable"
              type="button"
            >
              Go<i class="material-icons right">send</i>
            </button>
        </div>*/}
           <div id="container-messages">
              {individualChat.messages.map((item, index) => {
                let messagesDesign = "leftMessage";
                if (item.email == `${datos.email}`) {
                  messagesDesign = "rightMessage";
                }
                return (
                  <div className="contenedor">
                    <div className={messagesDesign}>
                      {item.message}<br />
                    </div>
                  </div>
                );
              })}
              {/*Chat Dashboard*/}
              <div className="input-messages-container">
              <Formik
                initialValues={{
                  message: "",
                }}
                onSubmit={(values) => {
                  newMessage(values);
                }}
              >
                {(formik) => (
                  <Form>
                    <div >
                      <label
                        htmlFor="message"

                      >Hi! Doctor</label>
                      <Field
                        type="text"
                        className="form-control input-messages"
                        id="message"
                        name="message"
                      />
                      <button  type="submit" className="btn btn-info">
                        Enviar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            </div>
        </div>
        <div className="col s4">
          <img
            alt="Your face here"
            src={datos.photo}
            width="135px"
            height="235px"
            className="m-3 mt-5 rounded mx-auto d-block rounded-circle w-75"
          />
          <a href="/MyProfile">
            <button
              type="button"
              className="btn waves-effect waves-light deep-purple lighten-1 hoverable mx-auto d-block"
            >
              Edit profile <i class="material-icons right">edit</i>
            </button>
          </a>
          <h5 className="text-center text-muted mb-0">
            {datos.usertype === 2 ? "Patient" : "Doctor"}
          </h5>
          <h4 className="text-center text-justify p-2">{datos.full_name}</h4>
          <a href={datos.usertype === 2 ? "/MyMedicine" : "/AssignMedicine"}>
            <button className="btn mb-3 waves-effect waves-light deep-purple lighten-1 hoverable mx-auto d-block">
              {datos.usertype === 2 ? "View medicaments" : "Assign Medicaments"}{" "}
              <i class="material-icons right">local_hospital</i>
            </button>
          </a>
          <a href={datos.usertype === 2 ? "/MyDiet" : "/assignDiet"}>
            <button className="btn mb-3 waves-effect waves-light deep-purple lighten-1 hoverable mt-2 mx-auto d-block">
              {datos.usertype === 2 ? "My diet" : "Assign a diet"}{" "}
              <i class="material-icons right">local_dining</i>
            </button>
          </a>
          <button
            className="btn waves-effect mb-3 waves-light deep-purple lighten-1 hoverable mt-2 mx-auto d-block"
            onClick={logout}
          >
            Logout<i class="material-icons right">exit_to_app</i>
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
