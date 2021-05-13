import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Link,
  Router,
  Redirect,
  Switch,
} from "react-router-dom";
import visitor from "./Visitor_page/Visitor.js";
import register from "./register.js";
import login from "./Login.js";
import member from "./User_page/member.js";
import owner from "./Dorm_page/owner.js";
import resultmatch from "./User_page/resultmatch.js";
import searchvisitor from "./Visitor_page/visitorResult.js";
import matchvisitor from "./Visitor_page/matchVisitor.js";
import dormvisitor from "./Visitor_page/dormVisitor.js";
import admin from "./Admin_page/Admin.js";
import adminfactor from "./Admin_page/Adminfactor.js";
import addDorm from "./Dorm_page/addDorm.js";
import dormdata from "./Dorm_page/Dorm_data.js";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={visitor} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
        <Route path="/member" component={member} />
        <Route path="/owner" component={owner} />
        <Route path="/resultmatch" component={resultmatch} />
        <Route path="/searchvisitor" component={searchvisitor} />
        <Route path="/matchvisitor" component={matchvisitor} />
        <Route path="/dormvisitor" component={dormvisitor} />
        <Route path="/Admin" component={admin} />
        <Route path="/Adminfactor" component={adminfactor} />
        <Route path="/addDorm" component={addDorm} />
        <Route path="/dormdata" component={dormdata} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
