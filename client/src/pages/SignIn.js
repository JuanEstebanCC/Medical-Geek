import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { io } from "socket.io-client";
import useAuthContext from "../hooks/useAuthContext";
import SignInImage from "../images/signin.jpg";

const Login = () => {
  const { Login } = useAuthContext();
  //función para realizar petición en donde se válide que el usuario existe
  function login(values) {
    console.log(values.email);
    fetch(
      "/login?" +
      new URLSearchParams({
        email: values.email,
        password: values.password,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          localStorage.setItem("email", values.email);
          window.location.href = "/dashboard";
          Login();
        } else {
          alert("INVALID username or password");
        }
      });
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
    <>
      <div className="container">
        <div className="row">
          <div className="col s12 mt-2">
            <h3> <b> Welcome!</b></h3>
            <h5 className="flow text">
              Remember a daily contact<br></br> with your doctor
          </h5>
            <img className="materialboxed ml-5" width="550" src={SignInImage} />
          </div>
          <div className="col s12">
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
                      <div className="mt-5 mb-3">
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
                      <div className="mb-3">
                        <br />
                      </div>
                      <div className="mb-3">
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
                    <div className="btn-signin">
                      <button className="btn waves-effect waves-light deep-purple lighten-1" type="submit" name="signup">
                        Sign in
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="p-signin">
              <p className="flow-text">
                Don't have an account yet? <br />
                <a href="/signup">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 Medical Geek, All rights reserved.
            <a className="grey-text text-darken-4 right" href="https://github.com/JuanEstebanCC/Medical-Geek">GitHub Code</a>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
