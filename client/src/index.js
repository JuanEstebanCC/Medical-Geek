import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch} from "react-router-dom";
//Import private rout
import PrivateRoute from './components/privateRout';
//Import public rout
import PublicRoute from './components/publicRout';
//Import auth contenxt provider
import AuthProvider from './contexts/authContext';

//Import path
import {_home, _login, _ChatPatient, _ChatDoctor, _Register, _MyDiet} from './config/path';

//Import pages
import Home from "./pages/home";
import Login from "./pages/login";
import ChatPatient from "./pages/chatPatient";
import ChatDoctor from "./pages/chatDoctor";
import Register from "./pages/Register";
import MyDiet from "./pages/myDiet";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Switch>
        <PublicRoute exact path={_home} component={Home} />
        <PublicRoute path={_login} component={Login} />
        <PrivateRoute path={_ChatPatient} component={ChatPatient} />
        <PrivateRoute path={_ChatDoctor} component={ChatDoctor} />
        <PrivateRoute path={_MyDiet} component={MyDiet} />
        <PublicRoute path={_Register} component={Register} />
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
