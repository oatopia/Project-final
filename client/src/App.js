import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Match from './component/Match';
import { BrowserRouter, Route, Link, Router, Redirect } from 'react-router-dom';
import visitor from './Visitor.js'
import register from './register.js'
import login from './Login'
import member from './member'
import owner from './operator'

function App() {
  return (
   <>
   <Route exact path ='/' component={visitor}/>
   <Route path ='/register' component={register}/>
   <Route path ='/login' component={login}/>
   <Route path ='/member' component={member}/>
   <Route path ='/owner' component={owner}/>
   </>
  );
}

export default App;