import { React, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import './member.css';
import NavbarMember from '../component/Navbar/NavbarMember.js';
import Match_member from '../component/Match/Match-member';
import Axios from 'axios'
import Auth from '../service/authService.js'
import authHeader from '../service/auth-header.js';

function Member() {
  const history = useHistory()
  const url = "https://matching-dorm-tu-server.herokuapp.com/"
  const [search, setSearch] = useState("");
  const currentUser = Auth.getCurrentUser();

  const searchFac = (e) => {
    // e.preventDefault();
    console.log(search)
    Axios.post('api/match/searchDorm', {
      Search: search
    }, { headers: authHeader() })
      .then(Response => {
        console.log("Respone serach: ", Response.data);
        let data = Response.data
        history.push({
          pathname: "/dormdetail",
          state: data,
        })
      }).catch(error => {
        console.log(error);
      })
  }

  if (!currentUser) {
    return <Redirect to="/login" />
  }
  return (
    <div className="appcontainer-member">
      <div className='background-member'>
        <div className='navbar-member-container'>
          <NavbarMember></NavbarMember>
        </div>
        <h1 className='head-member-page'>ยินดีต้อนรับคุณ {currentUser.username}</h1>
      </div>
      <div className="searchbar-member">
        <input className="searchinput-member" placeholder='ชื่อหอพัก...' onChange={(e) => {
          setSearch(e.target.value);
        }}></input>
        <button className="searchbutton-member" onClick={searchFac}>ค้นหา</button>
      </div>
      <Match_member />
    </div>
  );
}

export default Member;