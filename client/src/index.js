import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

//Import pages
import Home from "./pages/home";
import Login from "./pages/login";
import ChatPatient from "./pages/chatPatient";
import ChatDoctor from "./pages/chatDoctor";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/chatPatient" component={ChatPatient} />
      <Route path="/chatDoctor" component={ChatDoctor} />
      <Route path="/Register" component={Register} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
