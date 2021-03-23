import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TimePicker from "react-time-picker";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import faker from "faker";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Logo from "../images/logo.ico";

const AssignMedicine = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState("");
  const [diagnostic, setDiagnostic] = useState({
    diagnostic: "",
  });
  const [patientMedicine, setPatientMedicine] = useState([{ medicines: [] }]);
  const [value, onChange] = useState("10:30");
  const [times, setTimes] = useState([]);
  const [enfermedades, setEnfermedades] = useState({});

  useEffect(() => {
    fetch(`/my_patientes?email=${localStorage.getItem("email")}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function AssignMedication(values) {
    const hours = [];
    times.map((item) => {
      hours.push(item.hour);
    });

    fetch("/assign_medicine", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient_email: "juanpaciente@gmail.com",
        diagnostic: diagnostic.diagnostic,
        medicineName: values.medicine_name,
        how_many: values.how_many,
        how_often: hours,
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Correctly assigned medicine");
        setPatient("");
        values.medicine_name = "";
        values.how_many = "";
        setTimes([]);
      }
    });
  }

  async function viewPatientesMedicine(patient) {
    let res = await fetch(
      "/my_information?" + new URLSearchParams({ email: patient })
    );
    let data = await res.json();
    setPatientMedicine(data);
  }

  //Remove medicine
  async function deleteMedicine(id, id_user) {
    await fetch("/deleteMedicine", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        id_medicine: id,
        id_user: id_user,
      }),
    });

    window.location.href = "/AssignMedicine";
  }

  window.onload = () => {
    setTimeout(() => {
      fetch("/enfermedades", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setEnfermedades(data));
    }, 1000);
  };

  function patientMedicineF(data) {
    console.log(data);
    return data[0].medicines.map((item, index) => {
      return (
        <div className="main-container">
          <div classNameName="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.nameMedicine}</h5>
              <b>Indicationes:</b>
              <p className="card-text">How many: {item.how_many}</p>
              <p className="card-text">How often: {item.how_often}</p>
              <a href="#" className="btn btn-primary">
                Edit
              </a>
            </div>
          </div>
          <div className="delete-Medicine">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteMedicine(item._id, data[0]._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  //Add hour
  function addTime(time) {
    const newhour = {
      hour: time,
      uid: faker.random.uuid(),
    };
    setTimes([...times, newhour]);
  }

  //Remove hour
  function deleteHour(uid) {
    setTimes(times.filter((item) => item.uid !== uid));
  }

  const validate = Yup.object({
    medicine_name: Yup.string().required("Name required"),
    how_many: Yup.number(),
    how_often: Yup.string(),
  });

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.info(item.description);
    setDiagnostic({
      diagnostic: item.description,
    });
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  console.log(diagnostic.diagnostic);

  return (
    <>
      <nav>
        <div class="nav-wrapper deep-purple lighten-1">
          <div className="row">
            <div className="col s1">
              <a href="/dashboard" class="brand-logo">
                <img
                  className="ml-5 hoverable"
                  width="65"
                  src={Logo}
                  alt="a imagen"
                />
              </a>
            </div>
            <div className="col s11">
              <label className="text-white">You're assign medicine!</label>
            </div>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col s6">
          <section className="section scrollspy">
            <p className="main-tittle mt-5 general-letter">
              Prescribe medications to your patients
            </p>
            <br />
            <label
              htmlFor="email"
              className="form-label letter general-letter mb-3"
            >
              Insert your diagnostic
            </label>
            <div className="pb-4">
              <ReactSearchAutocomplete
                items={enfermedades}
                fuseOptions={{ keys: ["code", "description"] }}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                maxResults={5}
                resultStringKeyName="description"
                autoFocus
              />
            </div>
            <Formik
              initialValues={{
                patient: "juanescifuentes75@gmail.com",
                medicine_name: "",
                how_many: "",
                how_often: "",
              }}
              onSubmit={(values) => {
                AssignMedication(values);
              }}
              validationSchema={validate}
            >
              {(formik) => (
                <Form>
                  <div className="">
                    <div class="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label letter general-letter"
                      >
                        Patient
                      </label>
                      <div className="input-field col s12">
                      <select
                        id="patient"
                        name="patient"
                        onChange={(e) => {
                          setPatient(e.target.value);
                        }}
                      >
                        <option value="">Choose a patient</option>
                        <option value={data.map((item, index) => {
                          console.log("Mail: ", item.email);
                          return (
                           item.email
                          );
                        })}>
                          {data.map((item, index) => {
                          console.log("Full name: ", item.full_name);
                          return (
                            item.full_name
                          );
                        })}
                        </option>
                      </select>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label letter general-letter"
                      >
                        Name of the medicine
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="medicine_name"
                        name="medicine_name"
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label letter general-letter"
                      >
                        how many?
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="how_many"
                        name="how_many"
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label letter general-letter"
                      >
                        how often (hours)
                      </label>
                      <div className="time">
                        <TimePicker
                          type="textbox"
                          format="HH:mm"
                          disableClock="true"
                          onChange={onChange}
                          value={value}
                        />
                        <input
                          type="button"
                          value="Add hour"
                          onClick={() => addTime(value)}
                        />
                      </div>
                      {times.map((item) => (
                        <div key={item.uid} className="show-time">
                          <h4>{item.hour}</h4>
                          <input
                            className="delete-hour"
                            type="button"
                            onClick={() => deleteHour(item.uid)}
                          />
                        </div>
                      ))}
                      <button
                        className="btn waves-effect waves-light mx-auto d-block mt-5 deep-purple lighten-1 hoverable"
                        type="submit"
                        name="signup"
                      >
                        Assign
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
        <div className="col s6">
          <button
            className="btn waves-effect waves-light mx-auto d-block mt-5 deep-purple lighten-1 hoverable"
            type="submit"
            name="signup"
            onClick={() => setOpenModal(true)}
          >
            Edit
            <i className="material-icons right">edit</i>
          </button>
          <Modal isOpen={openModal}>
            <label htmlFor="email" className="form-label letter general-letter">
              Patient
            </label>
            <select
              className="form-control"
              id="patient"
              name="patient"
              onChange={(e) => {
                console.log(e.target.value);
                viewPatientesMedicine(e.target.value);
              }}
            >
              <option value="">-</option>
              {data.map((item, index) => {
                return <option value={item.email}>{item.full_name}</option>;
              })}
            </select>
            {patientMedicineF(patientMedicine)}
            <br />
            <button
              type="button"
              className="btn btn-outline-success mx-auto d-block"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </Modal>
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

export default withRouter(AssignMedicine);
