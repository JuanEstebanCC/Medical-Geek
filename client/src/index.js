import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
//Import private rout
import PrivateRoute from "./components/privateRout";
//Import public rout
import PublicRoute from "./components/publicRout";
//Import auth contenxt provider
import AuthProvider from "./contexts/authContext";

//Import path
import {
  _home,
  _login,
  _ChatPatient,
  _ChatDoctor,
  _Register,
  _Dashboard,
  _AssignMedicine,
  _MyDiet,
  _DietDoctor,
  _MyMedicine
} from "./config/path";

//Import pages
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import ChatPatient from "./pages/chatPatient";
import ChatDoctor from "./pages/chatDoctor";
import MyDiet from "./pages/myDiet";
import DietDoctor from "./pages/dietDoctor";
import AssignMedicine from './pages/AssignMedicine'
import MyMedicine from './pages/MyMedicine'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={_home} component={Home} />
          <PublicRoute path={_login} component={Login} />
          <PrivateRoute path={_ChatPatient} component={ChatPatient} />
          <PrivateRoute path={_ChatDoctor} component={ChatDoctor} />
          <PublicRoute path={_Dashboard} component={Dashboard} />
          <PrivateRoute path={_MyDiet} component={MyDiet} />
          <PrivateRoute path={_DietDoctor} component={DietDoctor} />
          <PublicRoute path={_Register} component={Register} />
          <PublicRoute path={_AssignMedicine} component={AssignMedicine} />
          <PublicRoute path={_MyMedicine} component={MyMedicine} />
          <PublicRoute component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
