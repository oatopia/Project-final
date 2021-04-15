import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Match from './component/Match';
import { BrowserRouter, Route, Link, Router, Redirect, Switch } from 'react-router-dom';
import visitor from './Visitor.js'
import register from './register.js'
import login from './Login'
import member from './member'
import owner from './operator'
import resultmatch from './resultmatch.js'
import visitorResult from './visitorResult.js'

function App() {
  return (

    <BrowserRouter>
      <Switch>
      <Route exact path ='/' component={visitor}/>
      <Route path ='/register' component={register}/>
      <Route path ='/login' component={login}/>
      <Route path ='/member' component={member}/>
      <Route path ='/owner' component={owner}/>
      <Route path ='/resultmatch' component={resultmatch}/>
      <Route path ='/visitorResult' component={visitorResult}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;