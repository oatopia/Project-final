import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Match from './component/Match';


function App() {
  return (
    <div className="appcontainer">
      <Navbar></Navbar>
      <div className="searchbar">
        <input className="searchinput"></input> 
        <button className="searchbutton">ค้นหา</button>
      </div>
      <Match/>
    </div>
  );
}

export default App;