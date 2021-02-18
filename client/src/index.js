import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'

//Import pages 
import Home from './pages/home'


const App = ()=>{
  return(
    <BrowserRouter>
      <Route exact path="/" component={Home}/>
    </BrowserRouter>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


