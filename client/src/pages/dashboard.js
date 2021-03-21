import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { Formik, Form, Field } from "formik";
import io from "socket.io-client";

let socket;

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

      socket = io("http://localhost:3000");

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
    if (values.message != "") {
      await socket.emit("chat:message", {
        message: values.message,
      });

      socket.on("new:message", function (data) {
        console.log(data);
        let container = document.getElementById("container-messages");
        console.log(container);
        container.innerHTML += `<div className="rightMessage">
        ${data.message} <br />

        </div>`;
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
    }
  }

  return (
    <>
      <div class="container-fluid ">
        <div class="row margina-dash ">
          <div class="col-md-2 overflow-h">
            <h4 className="text-center">
              {datos.usertype === 2 ? "Your doctor" : "Your patientes"}
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
                    className="mt-5 mr-4 mx-auto d-block rounded-circle"
                    alt="Preview"
                    src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
                  />
                  <p className="m-5 mx-auto d-block text-center text-muted ">
                    {name}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            id="container-messages"
            className="col-md-8 bg-light p-4 rounded container-center-dashboard"
          >
            {individualChat.messages.map((item, index) => {
              let messagesDesign = "leftMessage";

              if (item.email == `${datos.email}`) {
                messagesDesign = "rightMessage";
              }
              return (
                <div className={messagesDesign}>
                  {item.message} <br />
                </div>
              );
            })}
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
                    <div className="mb-3 input-messages-container">
                      <label
                        htmlFor="message"
                        className="form-label letter general-letter"
                      ></label>
                      <Field
                        type="text"
                        className="input-messages"
                        id="message"
                        name="message"
                      />
                      -
                      <button type="submit" className="btn btn-info">
                        Enviar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div class="col-md-2  border border-secondary ml-4 rounded container-overflow-dashboard">
            <div class="row">
              <div class="col-md-12">
                <img
                  alt="Preview"
                  src={datos.photo}
                  class="m-3 mt-5 rounded mx-auto d-block rounded-circle w-75"
                />
              </div>
            </div>
            <a href="/MyProfile">
              <button
                type="button"
                class="btn btn-outline-success mx-auto d-block button-dashboard"
              >
                Edit profile
              </button>
            </a>
            <h5 className="text-center text-muted mb-0">
              {datos.usertype === 2 ? "Patient" : "Doctor"}
            </h5>

            <h4 className="text-center text-justify p-2">{datos.full_name}</h4>

            <a href={datos.usertype === 2 ? "/MyMedicine" : "/AssignMedicine"}>
              <button className="btn  btn-outline-success d-block mt-4  mx-auto button-dashboard ">
                {datos.usertype === 2
                  ? "View medicaments"
                  : "Assign Medicaments"}
              </button>
            </a>
            <a href={datos.usertype === 2 ? "/MyDiet" : "/assignDiet"}>
              <button className="btn btn-outline-success d-block mt-4 mx-auto button-dashboard ">
                {datos.usertype === 2 ? "My diet" : "Assign a diet"}
              </button>
            </a>
            <a href="/grupalChats">
              <button className="btn btn-outline-success d-block mt-4 mx-auto button-dashboard">
                Interesting chats
              </button>
            </a>

            <div className="d-flex align-content-end flex-wrap">
              <div className="mt-5 pt-5"></div>

              <button
                className="btn btn-secondary d-block align-self-end mt-5 button-dashboard"
                onClick={logout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
