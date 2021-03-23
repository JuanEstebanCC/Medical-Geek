import React from "react";

const ChangeButton = (props) => {
  return (
    <button onClick={props.onClick} className="btn waves-effect waves-light deep-purple lighten-1 hoverable" type="submit" name="signup">
    Accept
    <i className="material-icons right">check_circle</i>
  </button>
  );
};

export default ChangeButton;
