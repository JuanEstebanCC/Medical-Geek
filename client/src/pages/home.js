import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";
import Logo from "../images/logo.ico";
import HomeImage from "../images/home.jpg";

const Home = () => {
  return (
    <body>
      <div className="row">
        <div className="col s12">
          <div className="items-home">
            <img className="materialboxed center-block" width="275" src={Logo} />
            <h1 className="h1 text-center">Chat with <br></br> a doctor!</h1>
            <p className="flow-text text-center">
              Worry no more about <br></br> diet, medicine, or <br></br> medical appointment
        </p>
            <h3 className="text-center"> <b>All in one place</b></h3>
          </div>
        </div>
        <div className="col s12">
          <img className="materialboxed mt-5 " width="800" src={HomeImage} />
          <div className="buttons">
            <button className="btn waves-effect waves-light m-5 deep-purple lighten-1 hoverable" type="submit" name="signin">
              <a href="/signin"> Sign in
        <i className="material-icons right">send</i> </a>
            </button>
            <button className="btn waves-effect waves-light m-5 deep-purple lighten-1 hoverable" type="submit" name="signup">
              <a href="/signup"> Sign up
        <i className="material-icons right">send</i></a>
            </button>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 Medical Geek, All rights reserved.
            <a className="grey-text text-darken-4 right" href="https://github.com/JuanEstebanCC/Medical-Geek">GitHub Code</a>
        </div>
      </div>
    </body>
  )
};

export default withRouter(Home);
