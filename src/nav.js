import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Button,InputGroup,DropdownButton,FormControl,MenuItem} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {changeIntent} from './App'
import {Nav} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Dictaphone from "react-speech-recognition";
import PropTypes from "prop-types";
import highlightToggle from './assets/highlight_toggle.png';
import ToggleMenu from './components/toggleableMenu.js';
import BreakPointsDropdown from './components/breakpointslist';
import scholarToggle from './assets/audiodocToggle.png';
import menu from './assets/menu.png';
import readAlongHighlight from './assets/read_along_highlight.png'


// Require Font Awesome.
import ReactHtmlParser from 'react-html-parser';
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery'; window.$ = $;

class Navigation extends Component{

render(){

  return(

<div id="Nav">
<div className="optionsIcon">
  <Nav.Item className = "menuItems">
    <button onClick={this.props.toggleMenu}> <img src={menu} style={{width: '2em', height: '2em', hover: 'shadow'}} /></button>
  </Nav.Item>
</div>

<div>

<Nav  activeKey="/home" className="centerButtons" onSelect={selectedKey => alert(`selected ${selectedKey}`)}>

<Nav.Item className = "paddingIcons">
  <BreakPointsDropdown style={{ padding: 10 }} listOfBreakPoints = {this.props.listOfBreakPoints} createBreakPoint = {this.props.createBreakPoint} addBreakPointMode = {this.props.addBreakPointMode}/>
</Nav.Item>

<Nav.Item className = "paddingIcons">
    <button onClick={this.props.setHighlightMode} ><img className="navImageBtns" src={highlightToggle} /></button>
</Nav.Item>

<Nav.Item className = "paddingIcons">
  <button  onClick={this.props.setScholarMode} styles={{width:'2em',height:'2em'}}> <img className="navImageBtns" src={scholarToggle} /></button>
</Nav.Item>

<Nav.Item className = "paddingIcons">
  <button onClick={this.props.readAlongHighlight}> <img className="navImageBtns" src={readAlongHighlight} /></button>
</Nav.Item>


</Nav>

<ToggleMenu closeToggleMenu={this.props.closeToggleMenu} openNotes={this.props.openNotes} highlight={this.props.highlight} showNotes={this.props.showNotes} close={this.props.close}
downloadNotes={this.props.downloadNotes} downloadAudio = {this.props.downloadAudio}/>

</div>
</div>

    );
  }
}



export default Navigation;
