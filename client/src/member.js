import {React,useEffect,useState} from 'react';
import './member.css';
import NavbarMember from './component/NavbarMember.js';
import Match_member from './component/Match-member';
import Axios from 'axios' 


function Member() {
  const [search,setSearch] = useState("");

  const searchFac = (e) => {
    e.preventDefault();
    console.log(search)
    Axios.post('/api/match/searchDorm',{
      Search:search
    })
    .then(Response => {
        console.log(Response);
    }).catch(error=>{
        console.log(error);
    })
  }

    return (
    <div className="appcontainer-member">
      <NavbarMember></NavbarMember>
      <div className="searchbar-member">
        <input className="searchinput-member" onChange={(e)=>{
          setSearch(e.target.value);
        }}></input> 
        <button className="searchbutton-member" onClick={searchFac}>ค้นหา</button>
      </div>
      <Match_member/>
    </div>
    );
}

export default Member;