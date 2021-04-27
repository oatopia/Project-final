import React, { useEffect } from 'react';
import './owner.css';
import Navbar from './component/NavbarOwner'
import Indorm from './component/Indorm'
import Axios from 'axios'
import backgroundimg from './img/operatorbackground.jpg'
import Auth from './service/authService.js'
import {Redirect } from 'react-router-dom'


function owner() {
  // useEffect(()=>{
  //   Axios.get('/api/owner/getdorm').then(res=>{
  //   })
  // })
  const currentUser = Auth.getCurrentUser();
  if(!currentUser){
    return <Redirect to="/login"/>
  }else{
    if(!currentUser=='ผู้ประกอบการ'){
      return <Redirect to="/login"/>
    }
  }
  return (
    <div className="owner-container">
      <Navbar/>
      <Indorm/>
    </div>
  );
}

export default owner;