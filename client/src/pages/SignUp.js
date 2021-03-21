import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import useAuthContext from "../hooks/useAuthContext";
import * as Yup from "yup";
import SignUpImage from "../images/signup.jpg";
import "../styles/styles.css";

const Register = () => {
  const [userType, setUserType] = useState(2);
  const [specialization, setspecialization] = useState("general");
  const [errorMessage, setErrorMessage] = useState("");
  const userTypeState = parseInt(userType);
  const { Login } = useAuthContext();
  function specializationS() {
    if (userTypeState === 3) {
      return (
        <div class="specialization">
          <label
            htmlFor="specialization"
            className="form-label letter  general-letter"
          >
            Specialization
          </label>
          <select
            as="select"
            id="specialization"
            name="specialization"
            className="p-2 form-select  form-control-register"
            required
            onChange={(e) => {
              setspecialization(e.target.value);
            }}
          >
            <option value="General">General</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Optometrist">Optometrist</option>
          </select>
        </div>
      );
    }
    if (userTypeState === 2) {
      return (
        <div class="specialization">
          <label
            htmlFor="specialization"
            className="form-label letter  general-letter"
          >
            I want to contact with a
          </label>
          <select
            as="select"
            id="specialization"
            name="specialization"
            className="p-2 form-select  form-control-register"
            required
            onChange={(e) => {
              setspecialization(e.target.value);
            }}
          >
            <option value="General">General</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Optometrist">Optometrist</option>
          </select>
        </div>
      );
    }
  }
  const validate = Yup.object({
    email: Yup.string().required("Email required"),
    full_name: Yup.string().required("Name required"),
    password: Yup.string().min(5, "Password must have at least 5 characters"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(userTypeState);
    console.log(specialization);
    const rawResponse = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        full_name: values.full_name,
        password: values.password,
        usertype: userTypeState,
        specialization: specialization,
      }),
    });
    const content = await rawResponse.json();
    localStorage.setItem("token", content.token);
    localStorage.setItem("id", content.id);
    window.location.href = "/dashboard";
    Login();
    if (content.auth === true) {
      console.log(content);
      localStorage.setItem("token", content.token, { path: "/" });
      localStorage.setItem("id", content.id, { path: "/" });
      /* fetch("/send_mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.email,
          subject: "Wellcome to Medical Geek, " + values.full_name,
          username: values.email,
          password: values.password,
        }),
      }); */
      console.log("Mail send");
      fetch("/new_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email_participant1": values.email,
          "name_participant1": values.full_name,
          "name_participant2": 'Lorena',
          "email_participant2": 'lorena0118a@gmail.com',
        }),
      });
    } else {
      if (content.error) {
        setErrorMessage(content.error);
      }
      console.log(content.error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s12 mt-2">
            <h3> <b> Help or help you!</b></h3>
            <h5 className="flow text">
              Find someone to help or <br></br> help yourself
          </h5>
            <img className="materialboxed ml-5" width="550" src={SignUpImage} />
          </div>
          <div className="col s12">
            <div className="form-login">
              <Formik
                initialValues={{
                  full_name: "",
                  email: "",
                  password: "",
                  userType: "",
                  specialization: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {(formik) => (
                  <Form className="register-form">
                    <div className="register-form">
                      <div className="mb-3">
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
                      <div className="mb-3">
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

                      <div className="mb-3">
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
                      </div>
                      <div className="mb-3">
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
                          onChange={(e) => {
                            setUserType(e.target.value);
                          }}
                        >
                          <option value="2">Patient</option>
                          <option value="3">Doctor</option>
                        </select>
                      </div>
                    </div>

                    {specializationS()}
                    {errorMessage && (
                      <div className="error text-danger">
                        Error: {errorMessage}{" "}
                      </div>
                    )}
                    <div className="btn-signup">
                      <button className="btn waves-effect waves-light deep-purple lighten-1" type="submit" name="signup">
                        Sign up
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="p-signup">
              <p className="flow-text">
                Do you have an account? <br />
                <a href="/signin">Sign In</a>
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

export default withRouter(Register);
