import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { object } from "yup/lib/locale";
import Logo from "../images/logo.ico";

const DietViewDoctor = () => {
  const [data, setdata] = useState([{}]);
  const [patient_name, setpatient_name] = useState("");
  const [dietType, setdietType] = useState("");

  useEffect(async () => {
    const response = await fetch(
      "my_patients?" +
      new URLSearchParams({ email: localStorage.getItem("email") })
    );

    const user = await response.json();

    setdata(user);
  }, []);

  function newDiet(values) {
    console.log(values);
    if (patient_name != "" && dietType != "") {
      fetch("/assign_diet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_name: patient_name,
          dietType: dietType,
        }),
      }).then((res) => {
        if (res.status === 200) {
          alert("Correctly assigned diet");
        }
      });
    }
  }

  return (
    <>
      <nav>
        <div class="nav-wrapper deep-purple lighten-1">
          <div className="row">
            <div className="col s1">
              <a href="/dashboard" class="brand-logo">
                {" "}
                <img className="ml-5 hoverable" width="65" src={Logo} />
              </a>
            </div>
            <div className="col s11">
              <label className="text-white">You're assign diet!</label>
            </div>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col s6">
          <h2>
            Assign a necessary
            <br />
            diet to your patients
          </h2>
          <Formik
            initialValues={{
              patient_name: "",
              dietType: "",
            }}
            onSubmit={(values) => {
              newDiet(values);
            }}
          >
            {(formik) => (
              <Form>
                <div>
                  <div>
                    <label
                      className="form-label letter general-letter"
                    >Patient</label>
                    <select
                      id="patient_name"
                      name="patient_name"
                      required
                      onChange={(e) => {
                        setpatient_name(e.target.value);
                      }}
                    >
                      <option value={data.map((patient) => (
                        <option value={patient.email}>
                          {patient.email}
                        </option>
                      ))}>Choose a patient</option>
                      {data.map((patient) => (
                        <option value={patient.full_name}>
                          {patient.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="patient-diet">
                    <label
                      htmlFor="dietType"
                      className="form-label letter general-letter"
                    >
                      Name of the diet
                    </label>
                    <select
                      id="dietType"
                      name="dietType"
                      required
                      onChange={(e) => {
                        setdietType(e.target.value);
                      }}
                    >
                      <option value="">Choose a diet</option>
                      <option value="null">Without diet</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Carnivore">Carnivore</option>
                      <option value="Macrobiotic">Macrobiotic</option>
                      <option value="Fertility">Fertility</option>
                    </select>
                  </div>
                  <button
                    className="btn waves-effect waves-light mx-auto d-block mt-5 deep-purple lighten-1 hoverable"
                    type="submit"
                    name="signup"
                  >
                    Assign
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col s6">
          <img src="https://img.freepik.com/vector-gratis/proceso-metabolico-mujer-dieta_74855-6569.jpg?size=626&ext=jpg&ga=GA1.2.509040202.1614980453"></img>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 Medical Geek, All rights reserved.
          <a
            className="grey-text text-darken-4 right"
            href="https://github.com/JuanEstebanCC/Medical-Geek"
          >
            GitHub Code
          </a>
        </div>
      </div>
    </>
  );
};

export default withRouter(DietViewDoctor);
