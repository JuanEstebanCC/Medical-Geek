import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import "../styles/styles.css";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const DietViewDoctor = () => {

  const [patient_name, setpatient_name] = useState('');
  const [dietType, setdietType] = useState('');

  function newDiet(values) {
    console.log(values)
    if (patient_name != "" && dietType != "") {

      fetch('/assign_diet' , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          patient_name: patient_name,
          dietType: dietType
        })
      }).then(res => {
        if (res.status === 200) {alert('Correctly assigned diet')}
      })
    }
  }

  return (
    <body>
        <div className="myDiet">
            <div className="header-myDiet">
                <span className="logo-diet"></span>
                <img src="https://st.depositphotos.com/1771835/1477/i/950/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg"/> 
            <button className="button-myDiet" >Close</button>
            </div>
            <div className="assign-diet">
              <h2>
                Assign a necessary<br/>
                diet to your patients
              </h2>
              <img src="https://img.freepik.com/vector-gratis/proceso-metabolico-mujer-dieta_74855-6569.jpg?size=626&ext=jpg&ga=GA1.2.509040202.1614980453"></img>
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
                    <div className="form-diet">
                        <div class="patient-diet">
                          <label
                            htmlFor="patient_name"
                            className="form-label letter general-letter"
                          >
                            Patient
                          </label>
                          <select
                                                
                            className="form-control"
                            id="patient_name"
                            name="patient_name"
                            required
                            onChange={(e) => {
                              setpatient_name(e.target.value);
                            }}
                          >
                            <option value="">----</option>
                            <option value="first patient">first patient</option>
                            <option value="second patient">second patient</option>
                            <option value="third patient">third patient</option>
                            <option value="Diego Buitrago">Diego Buitrago</option>
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
                                                
                            className="form-control"
                            id="dietType"
                            name="dietType"
                            required
                            onChange={(e) => {
                              setdietType(e.target.value);
                            }}
                          >
                            <option value="">----</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Carnivore">Carnivore</option>
                            <option value="Macrobiotic">Macrobiotic</option>
                            <option value="Fertility">Fertility</option>
                          </select>
                        </div>
                    </div>
                    <div className="">
                      <button type="submit" className="button-diet">
                        Assign
                      </button>
                    </div>
                  </Form>
                  )}
              </Formik>                  
            </div>
            <footer class="footer-diet">
              <h1>You are doctor, you are medical geek</h1>
            </footer>
        </div>
    </body>
  );
};

export default withRouter(DietViewDoctor);