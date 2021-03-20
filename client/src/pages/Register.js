import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import useAuthContext from "../hooks/useAuthContext";
import * as Yup from "yup";

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
    cell_phone: Yup.number().required("Cell required"),
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
        cell_phone: values.cell_phone,
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
    <div className="main-container">
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
      {/* <div className="gray-div" /> */}

      <div className="container-right">
        <div className="form-login">
          <Formik
            initialValues={{
              full_name: "",
              email: "",
              cell_phone: "",
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
              <Form>
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
                      htmlFor="cell_phone"
                      className="form-label letter general-letter"
                    >
                      Cell phone
                    </label>
                    <Field
                      type="number"
                      className="form-control-register"
                      id="cell_phone"
                      name="cell_phone"
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
                  </div>
                  <div class="mb-3">
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
                      className="form-control"
                      required
                      onChange={(e) => {
                        setUserType(e.target.value);
                      }}
                    >
                      <option value="2">Patient</option>
                      <option value="3">Doctor</option>
                    </select>
                  </div>
                  {specializationS()}
                {errorMessage && (
                  <div className="error text-danger">
                    Error: {errorMessage}{" "}
                  </div>
                )}
                <button type="submit" className="button-register letter">
                  Register
                </button>
                </div>

                
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
    </div>
  );
};

export default withRouter(Register);
