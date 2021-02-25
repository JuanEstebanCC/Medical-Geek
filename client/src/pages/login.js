import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Login = () => {

  //función para realizar petición en donde se válide que el usuario existe
  function login(values) {
    fetch('/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
  }
  //Fin función

  return (
    <body>
      <div className="main-container">
        <div className="container-left">
          <div className="tittle-login">
            <p className="main-tittle general-letter">¡Wellcome!</p>
            <p className="letter general-letter">remember a daily contact <br /><br />with your doctor</p>
          </div>
          <div className="image-login">

          </div>
        </div>
        <div className="container-right">
          <div className="form-login">
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              onSubmit={(values) => {
                login(values);
              }}
            >
              {(formik) => (
                <Form>
                  <div className="login">

                    <div class="mb-3">
                      <label htmlFor="email" className="form-label letter general-letter">
                        email
                  </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div class="mb-3"><br /></div>
                    <div class="mb-3">
                      <label htmlFor="password" className="form-label letter general-letter">
                        password
                  </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                    </div>

                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <button type="submit" className="button-login letter">Login</button>
          <div className="text-invitation letter general-letter">
            Don´t have an account yet? <br /><br /><br />
            <a href="/register" >Register now</a>

          </div>
        </div>
      </div>
    </body>
  );
};

export default withRouter(Login);
