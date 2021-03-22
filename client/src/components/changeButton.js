import React from "react";

const ChangeButton = (props) => {
  return (
    <button onClick={props.onClick} className="btn btn-danger m-3">
      Change
    </button>
  );
};

export default ChangeButton;
