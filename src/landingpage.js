import React from 'react';
import './App.css';
import {NavLink} from 'react-router-dom';
export const LandingPage = props =>{

  var divStyle = {
  color: 'black',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'

};

  return <div style={divStyle}>
  <h2>Resight/ ResaNote</h2>
  <NavLink style={{padding:10}} strict to="/app"><button onClick={props.login} >Continue As Guest</button></NavLink>
  <NavLink to="/Signup">Sign-up</NavLink>
  </div>

};
