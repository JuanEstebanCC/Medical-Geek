import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (
    <body>
      <div class="div-home">
        <h1 class="home-title">Chat with a doctor</h1>
        <span className="img-home"></span>
        <p class="p-home">
          Worry no more about diet, medicine, or medical appointment All in one
          place.
        </p>
        <a class="button-home" href="/login">
          <span class="text-button-home">Register</span>
        </a>
      </div>
      <footer class="footer-home"></footer>
    </body>
  );
};

export default withRouter(Home);
