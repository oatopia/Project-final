import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Router,Route,Link} from 'react-router-dom'
import App from './App';
import Register from './register';
import Login from './Login';
import Operator from './operator';

ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

