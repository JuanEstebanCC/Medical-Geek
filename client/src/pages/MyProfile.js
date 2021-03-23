import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ConfirmationB from "../components/confirmationButton";
import ChangeButton from "../components/changeButton";
import Logo from "../images/logo.ico";

const MyProfile = () => {
  const [datos, setdatos] = useState([{}]);
  const [newDatos, setNewDatos] = useState({
    full_name: "",
    photo: "",
  });

  const handleInputChange = (event) => {
    setNewDatos({
      ...newDatos,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoto = (e) => {
    setNewDatos({ ...newDatos, photo: e.target.files[0] });
  };

  const [confirmation, setConfirmation] = useState({
    confirmationButton: "",
  });

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  useEffect(() => {
    (async () => {
      await fetch("/user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => setdatos(data));
    })();
  }, [token]);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("img", newDatos.photo);
    formData.append("full_name", newDatos.full_name);
    formData.append("email", email);

    console.log(email, formData);
    axios
      .put(`/profile`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleConfirmation = (e) => {
    e.preventDefault();
    setConfirmation({
      confirmationButton: true,
    });
  };

  const toggleConfirmationFalse = (e) => {
    e.preventDefault();
    setConfirmation({
      confirmationButton: false,
    });
  };

  return (
    <>
      <nav>
        <div class="nav-wrapper deep-purple lighten-1">
          <div className="row">
            <div className="col s1">
              <a href="/dashboard" class="brand-logo"> <img className="ml-5 hoverable" width="65" src={Logo} />
              </a>
            </div>
            <div className="col s11">
              <label className="text-white">You're in your profile!</label>
            </div>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col s4">
          {/* Grid spacing */}
        </div>
        <div className="col s4">
          <img
            src={datos.photo}
            class="m-3 mt-5 rounded img-profile-max mx-auto d-block rounded-circle w-75"
            width="180px"
            height="195px"
            alt="This is you"
          />
        </div>
        <div className="col s4">
          {/* Grid spacing */}
        </div>
      </div>
      <form className="container" /*onSubmit={handleSubmitEdit}*/ encType="multipart/form-data">
        <div class="row">
          <div class="input-field col s6">
            <input
              type="text"
              class="h3 form-control"
              value={newDatos.full_name}
              id="new_name"
              onChange={handleInputChange}
              name="full_name"
              required
            />
            <label for="new_name">write your new name here</label>
          </div>
          <div className="col s6">
            <label class="h5 form-label" for="photo">
              Choose your new profile picture!
                  </label>
            <input
              type="file"
              class="form-control-file d-block ml-2"
              id="photo"
              accept=".png, .jpg, .jpeg"
              onChange={handlePhoto}
              name="photo"
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center m-2">
          {confirmation.confirmationButton ? (
            <ConfirmationB
              onClick={handleSubmitEdit}
              onClick2={toggleConfirmationFalse}
            />
          ) : (
            <ChangeButton onClick={toggleConfirmation} />
          )}
        </div>
      </form>
    </>
  );
};

export default withRouter(MyProfile);
