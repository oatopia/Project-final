import {React,useEffect,useState} from 'react';
import './resultmatch.css';
import NavbarMember from './component/NavbarMember.js';
import Axios from 'axios' 
import { useLocation } from 'react-router';


function Match() {
  var location = useLocation();
  const state = location.state;
  console.log("hi",state);
//   const [search,setSearch] = useState("");

//   const searchFac = (e) => {
//     e.preventDefault();
//     console.log(search)
//     Axios.post('/api/match/searchDorm',{
//       Search:search
//     })
//     .then(Response => {
//         console.log(Response);
//     }).catch(error=>{
//         console.log(error);
//     })
//   }

return (
    <div className="contain-match">
      <NavbarMember></NavbarMember>
      <div className="content-resultmatchpage">
        {state.map((data)=>{
          return(
            <div className="Dorm-block">
              <label>{data.Dorm_Name}</label>
            </div>
          )}
        )}
      </div>
    </div>
    );
}

export default Match;