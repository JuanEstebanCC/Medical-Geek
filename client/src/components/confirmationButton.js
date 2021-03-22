import React, { useState } from "react";

const ConfirmationButton = (props) => {
  return (
    <>
      <div className="d-box">
        <h4 className="text-darken-2">Are you sure?</h4>

        <button onClick={props.onClick} className="btn btn-danger m-3">
          Yes
        </button>
        <button onClick={props.onClick2} className="btn btn-danger m-3">
          No
        </button>
      </div>
    </>
  );
};

export default ConfirmationButton;
