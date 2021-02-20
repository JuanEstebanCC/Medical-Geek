import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'

//Import pages 
import Home from './pages/home'
import Login from './pages/login'

const App = ()=>{
  return(
    <BrowserRouter>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


