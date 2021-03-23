import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
//Import private rout
import PrivateRoute from "./components/privateRout";
//Import public rout
import PublicRoute from "./components/publicRout";
//Import auth contenxt provider
import AuthProvider from "./contexts/authContext";
import "materialize-css/dist/css/materialize.min.css";

//Import path
import {
  _Home,
  _SignIn,
  _ChatPatient,
  _ChatDoctor,
  _SignUp,
  _Dashboard,
  _AssignMedicine,
  _MyDiet,
  _AssignDiet,
  _MyMedicine,
  _GrupalChats,
  _MyProfile,
} from "./config/path";

//Import pages
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard";
import ChatPatient from "./pages/chatPatient";
import ChatDoctor from "./pages/chatDoctor";
import MyDiet from "./pages/myDiet";
import AssignDiet from "./pages/assignDiet";
import AssignMedicine from "./pages/AssignMedicine";
import MyMedicine from "./pages/MyMedicine";
import GrupalChats from "./pages/grupalChat";
import MyProfile from "./pages/MyProfile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={_Home} component={Home} />
          <PublicRoute path={_SignIn} component={SignIn} />
          <PrivateRoute path={_ChatPatient} component={ChatPatient} />
          <PrivateRoute path={_ChatDoctor} component={ChatDoctor} />
          <PrivateRoute path={_Dashboard} component={Dashboard} />
          <PrivateRoute path={_MyDiet} component={MyDiet} />
          <PrivateRoute path={_AssignDiet} component={AssignDiet} />
          <PublicRoute path={_SignUp} component={SignUp} />
          <PrivateRoute path={_AssignMedicine} component={AssignMedicine} />
          <PrivateRoute path={_MyMedicine} component={MyMedicine} />
          <PublicRoute path={_GrupalChats} component={GrupalChats} />
          <PrivateRoute path={_MyProfile} component={MyProfile} />
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
