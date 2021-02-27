import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Register = () => {
  return (
    <>
      <div className="container-left">
        <div className="tittle-login">
          <p className="main-tittle general-letter">Help or help you!</p>
          <p className="letter general-letter">
            Find someone to help or
            <br />
            <br />
            help yourself
          </p>
        </div>
        <div className="image-register"></div>
      </div>
      <div className="gray-div" />

      <div className="container-right">
        <div className="form-login">
          <Formik
            initialValues={{
              full_name: "",
              email: "",
              password: "",
              userType: "",
              assignedDoctor: "",
              specialization: "",
            }}
            onSubmit={(values) => {
              // login(values);
            }}
          >
            {(formik) => (
              <Form className="register-form">
                <div className="register-form">
                  <div class="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label letter general-letter"
                    >
                      Full name
                    </label>
                    <Field
                      type="text"
                      className="form-control-register form-group"
                      id="full_name"
                      name="full_name"
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label letter general-letter"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      className="form-control-register"
                      id="email"
                      name="email"
                    />
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
                      className="form-control-register"
                      id="password"
                      name="password"
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label letter  general-letter"
                    >
                      User Type
                    </label>
                    <Field
                      as="select"
                      name="userType"
                      className="p-2 form-select  form-control-register"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </Field>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <br />
      <button type="submit" className="button-register letter">
        Register
      </button>
      <div className="text-invitation-register letter general-letter">
        Do you have an account? <br />
        <br />
        <br />
        <a href="/login">Login now</a>
      </div>
    </>
  );
};

export default withRouter(Register);
