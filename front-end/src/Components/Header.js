import React from 'react';
import img3 from './logo.png';

function Header() {
  return (
    <div>
        <br/><br/>
     <center> <img src={img3} style={{width:"90px"}}/></center><br/>
      <center><h1>ICAF</h1></center>
      <center><h2>International Conference on Application Framework</h2></center>
      <br/><br/>
      <nav className="nav nav-pills nav-fill" style={{backgroundColor:"#0001"}}>
          <a className="nav-link" href="#"> Workshops </a>
          <a className="nav-link" href="#"> Reasearch Papers</a>
          <a className="nav-link" href="#"> Learn More things </a>
          <a className="nav-link" href="#"> Other </a>
      </nav>
      <br/><br/>
    </div>
  );
}

export default Header;

