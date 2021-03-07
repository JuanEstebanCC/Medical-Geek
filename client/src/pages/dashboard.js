import React from "react";
import { withRouter } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div class="row">
        <div class="col-8">col-8</div>
        <div class="col-4">col-4</div>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
