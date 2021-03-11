import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Dashboard = () => {
  const [datos, setdatos] = useState([{}]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const { Logout } = useAuthContext();

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
  console.log(datos);
  function logout() {
    Logout();
  }
  return (
    <>
      <div class="container-fluid ">
        <div class="row margina-dash ">
          <div class="col-md-2 overflow-h">
            <h4 className="text-center bg-light border p-2 rounded">
              Your chat's
            </h4>
            <img
              className="mt-5 mr-4 mx-auto d-block rounded-circle"
              alt="Preview"
              src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
            />
            <p className="m-5 mx-auto d-block text-center text-muted ">
              Juan Alberto
            </p>
            <img
              className="m-5 mx-auto d-block rounded-circle"
              alt="Preview"
              src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
            />
            <p className="text-center text-muted mb-0">Juan Alberto</p>
            <img
              className="m-5 mx-auto d-block rounded-circle"
              alt="Preview"
              src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
            />
            <p className="text-center text-muted mb-0">Juan Alberto</p>
            <img
              className="m-5 mx-auto d-block rounded-circle"
              alt="Preview"
              src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
            />
            <p className="text-center text-muted mb-0">Juan Alberto</p>
          </div>
          <div class="col-md-8 bg-light p-4 rounded">
            <div class="row">
              <div class="col-md-12">
                <h3>h3. Lorem ipsum dolor sit amet.</h3>
              </div>
            </div>
            <div class="row">
              <div class="input-group">
                <input type="text" class="form-control" />
                <button class="btn btn-outline-secondary" type="button">
                  Go
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <span class="badge badge-default">Label</span>
              </div>
            </div>
          </div>
          <div class="col-md-2  border border-secondary ml-4 rounded">
            <div class="row">
              <div class="col-md-12">
                <img
                  alt="Preview"
                  src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"
                  class="m-3 mt-5 rounded mx-auto d-block rounded-circle w-75"
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-success mx-auto d-block"
            >
              Edit profile
            </button>
            <h5 className="text-center text-muted mb-0">
              {datos.userType === 2 ? "Doctor" : "Patient"}
            </h5>
            <h4 className="text-center text-justify p-2">{datos.full_name}</h4>
            <div className="d-flex align-content-end flex-wrap">
              <button className="btn  btn-outline-success d-block mt-4  mx-auto ">
                View medicaments
              </button>
              <button className="btn btn-outline-success d-block mt-4 mx-auto">
                View diets
              </button>
              <div className="m-5 p-5"></div>
              <div className="mt-5 pt-5"></div>
              <div class="row align-items-end">
                <div class="col-12 align-self-end">
                  <button
                    className="btn btn-secondary d-block align-self-end mt-5"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
