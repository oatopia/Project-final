import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Match from './component/Match';
import { BrowserRouter, Route, Link, Router, Redirect, Switch } from 'react-router-dom';
import visitor from './Visitor.js'
import register from './register.js'
import login from './Login.js'
import member from './member.js'
import owner from './owner.js'
import resultmatch from './resultmatch.js'
import visitorResult from './visitorResult.js'
import admin from './Admin.js'
import adminfactor from './Adminfactor.js'

function App() {
  return (

    <BrowserRouter>
      <Switch>
      <Route exact path ='/' component={visitor}/>
      <Route exact path ='/register' component={register}/>
      <Route exact path ='/login' component={login}/>
      <Route path ='/member' component={member}/>
      <Route path ='/owner' component={owner}/>
      <Route path ='/resultmatch' component={resultmatch}/>
      <Route path ='/visitorResult' component={visitorResult}/>
      <Route path ='/Admin' component={admin}/>
      <Route path ='/Adminfactor' component={adminfactor}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;