import React from 'react';
import './App.css';
import Navbar from './component/Navbar';


function App() {
  return (
    <div className="appcontainer">
      <Navbar></Navbar>
      <div className="searchbar">
        <input className="searchinput"></input> 
        <button className="searchbutton">ค้นหา</button>
        </div>
    </div>
  );
}

export default App;