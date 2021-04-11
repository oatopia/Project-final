import {React,useEffect,useState} from 'react';
import './Match.css';
import NavbarMember from './component/NavbarMember.js';
import Axios from 'axios' 


function Match() {
    
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
    </div>
    );
}

export default Match;