import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { io } from "socket.io-client"
<<<<<<< HEAD
let socket;
=======
import useAuthContext from '../hooks/useAuthContext';

let socket;

>>>>>>> 0a3cdd89307037cc88a57bf87829d7841d892067
const Login = () => {
  const {Login} = useAuthContext();
  //función para realizar petición en donde se válide que el usuario existe
  function login(values) {

    console.log(values.email)
    fetch('/login?'  + new URLSearchParams({
   
      email: values.email,
      password: values.password
  
<<<<<<< HEAD
  }))
      .then(res => res.json())
      .then(data => console.log(data))
=======
    }))
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data) {
        window.localStorage.setItem('id_user', data.id)
        Login(); 
      } else {
        alert('INVALID username or password')
      }
    })
>>>>>>> 0a3cdd89307037cc88a57bf87829d7841d892067
      /* .then(
        socket = io('/login', {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          })
        })
      ) */
  }
  //Fin función

  return (
    <body>
      <div className="main-container">
        <div className="container-left">
          <div className="tittle-login">
            <p className="main-tittle general-letter">¡Wellcome!</p>
            <p className="letter general-letter">
              Remember a daily contact <br />
              <br />
              with your doctor
            </p>
          </div>
          <div className="image-login"></div>
        </div>
        {/*  <div className="gray-div"/> */}

        <div className="container-right">
          <div className="form-login">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                login(values);
              }}
            >
              {(formik) => (
                <Form>
                  <div className="login">
                    <div class="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label letter general-letter"
                      >
                        Email
                        </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div class="mb-3">
                      <br />
                    </div>
                    <div class="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label letter general-letter"
                      >
                        Password
                        </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="button">
                    <button type="submit" className="button-login letter">
                      Login
                    </button>
                  </div>
<<<<<<< HEAD

=======
>>>>>>> 0a3cdd89307037cc88a57bf87829d7841d892067
                </Form>
              )}
            </Formik>
          </div>

          <div className="text-invitation letter general-letter">
            Don´t have an account yet? <br />
            <br />
            <br />
            <a href="/register">Register now</a>
          </div>

        </div>


      </div>
    </body>
  );
};

export default withRouter(Login);
