import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TimePicker from "react-time-picker";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import faker from "faker";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const AssignMedicine = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState("");
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
        patient_email: patient,
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
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  return (
    <body>
      <div className="nav-medicine">
        <div className="logo-medicine"></div>
      </div>
      <div className="main-container">
        <div className="container-left overflow-medicine">
          <div className="tittle-login">
            <p className="main-tittle general-letter">
              Prescribe medications to your patientes
            </p>
            <br />
          </div>
          <div className="medicine-form">
            <div className="mt-5 mb-5 p-4">
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
                      <select
                        className="form-control"
                        id="patient"
                        name="patient"
                        onChange={(e) => {
                          setPatient(e.target.value);
                        }}
                      >
                        <option value="">-</option>
                        {data.map((item, index) => {
                          return (
                            <option value={item.email}>{item.full_name}</option>
                          );
                        })}
                      </select>
                    </div>
                    {/* <div class="mb-3">
                                            <br />
                                        </div> */}
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
                    </div>
                  </div>
                  <div className="button">
                    <button type="submit" className="button-login letter">
                      assign
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="container-left">
          <div className="edit-medicine">
            <button
              type="button"
              className="btn btn-outline-success mx-auto d-block button-dashboard"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </button>
            <Modal isOpen={openModal}>
              <label
                htmlFor="email"
                className="form-label letter general-letter"
              >
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

          <div className="assigMedicine_image"></div>
        </div>
      </div>
    </body>
  );
};

export default withRouter(AssignMedicine);
