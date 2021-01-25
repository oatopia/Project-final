import React from 'react';
import './operator.css';
import Navbar from './component/Navbar'
import Indorm from './component/Indorm'

function operator() {
  return (
    <div>
    <header className="con">
      <Navbar/>
      <Indorm/>
    </header>
    </div>
  );
}

export default operator;