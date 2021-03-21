import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";

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
    }, 200);
  };

  return (
    <body>
      <div className="myDiet">
        <div className="header-myDiet">
          <span className="logo-diet"></span>
          <h1>Profile - {datos.full_name}</h1>
          <a href="/Dashboard">
            <button className="button-myDiet">Back</button>
          </a>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5">
          <div>
            <img
              src={datos.photo}
              class="m-3 mt-5 rounded img-profile-max mx-auto d-block rounded-circle w-75"
              width="235px"
              height="255px"
              alt="There is you"
            />
            <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
              <div class="form-row">
                <div class="col pb-3">
                  <input
                    type="text"
                    class="h3 form-control"
                    value={newDatos.full_name}
                    placeholder="Your New Name"
                    onChange={handleInputChange}
                    name="full_name"
                    required
                  />
                </div>
                <div class="col pb-3">
                  <label class="h5 form-label" for="photo">
                    Your Profile Image:
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
                <button
                  onClick={handleSubmitEdit}
                  className="btn btn-danger m-3"
                >
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default withRouter(MyProfile);
