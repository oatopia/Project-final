import React, { useEffect } from 'react';
import './operator.css';
import Navbar from './component/NavbarOwner'
import Indorm from './component/Indorm'
import Axios from 'axios'
import backgroundimg from './img/operatorbackground.jpg'

function owner() {
  // useEffect(()=>{
  //   Axios.get('/api/owner/getdorm').then(res=>{
  //   })
  // })
  return (
    <div className="owner-container">
      <Navbar/>
      <Indorm/>
    </div>
  );
}

export default owner;