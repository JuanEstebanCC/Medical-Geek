import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (

    <div className="div-home">
      <div className="container-left-home">
        <div className="home-title">
        Chat with a doctor
        </div>
        <div className="p-home">
        Worry no more about diet, medicine, or medical appointment All in one
          place.          
        </div>
        {/* <h1 className="home-title">Chat with a doctor</h1>
        <div class="p-home">
          Worry no more about diet, medicine, or medical appointment All in one
          place.
        </div>
        <a class="button-home" href="/login">
          <span className="text-button-home">Register</span>
        </a> */}
      </div>
      <div className="container-rigth-home">
        <div className="img-home"></div>
      </div>


      
    </div>


  );
};

export default withRouter(Home);
