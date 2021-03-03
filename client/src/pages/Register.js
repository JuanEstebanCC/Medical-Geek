import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Register = () => {
  const handleSubmit = async (values) => {
    console.log(values)
   const rawResponse = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        full_name: values.full_name,
        password: values.password,
        usertype: values.userType,
        specialization: values.specialization
      }),
    })
    const content = await rawResponse.json();
    console.log(content);
    localStorage.setItem("token", content.token, { path: "/" });
    localStorage.setItem("id", content.id, { path: "/" });

    fetch("/send_mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: values.email,
        subject: "Wellcome to Medical Geek, "+ values.full_name,
        username: values.email,
        password: values.password,
      }),
	});
    console.log("Mail send");
  };
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
              userType: 2,
              specialization: "Optometría",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
 
            }}
          >
            {(formik) => (
              <Form className="register-form">
                <div className="register-form">
                  <div class="mb-3">
                    <label
                      htmlFor="full_name"
                      className="form-label letter general-letter"
                    >
                      Full name
                    </label>
                    <Field
                      type="text"
                      className="form-control-register form-group"
                      id="full_name"
                      name="full_name"
                      required
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
                      required
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
                      required
                    />
                  </div>{
              /*    <div class="mb-3">
                    <label
                      htmlFor="userType"
                      className="form-label letter  general-letter"
                    >
                      User Type
                    </label>
                    <select
                      as="select"
                      id="userType"
                      name="userType"
                      className="p-2 form-select  form-control-register"
                      required
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </div>*/}
                </div>
                <button
                  type="submit"
                  className="button-register letter"
                  // onClick={Petitions}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <br />

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
