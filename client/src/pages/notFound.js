import React from "react";
import "../styles/notFound.css";
const NotFound = () => {
  return (
    <>
      <body className="body-notFound">
        <h1 className="h1-notFound">Client - Page not found</h1>
        <p class="zoom-area">
          <b>Try</b> acceding to other page{" "}
        </p>
        <section class="error-container">
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
          <span class="zero">
            <span class="screen-reader-text">0</span>
          </span>
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
        </section>
        <div class="link-container">
          <a href="/" class="more-link">
            Visit the home page
          </a>
        </div>
      </body>
    </>
  );
};

export default NotFound;
