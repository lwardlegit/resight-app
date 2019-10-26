import React, { Component } from 'react';
import '../App.css';
import {Button,InputGroup,Dropdown,DropdownButton,ButtonGroup} from 'react-bootstrap';
import $ from 'jquery';
export default class BreakPointsDropdown extends Component{

  constructor(props){
    super(props);

  }

  render(props){
    return (
    <Dropdown as={ButtonGroup}>
    <Button variant="outline-dark"onClick={this.props.addBreakPointMode}>Add Breakpoint</Button>

    <Dropdown.Toggle split variant="outline-dark" id="dropdown-split-basic" className="dropdown-submenu pull-left" />

    <Dropdown.Menu id="menulist">
      {this.props.listOfBreakPoints.split(" ").map(eachBreakpoint => {
           return (

             <Dropdown.Item
               key={eachBreakpoint}
               onClick={(window) => {
                   var coords= eachBreakpoint.split(",")
                   console.log("y",coords[1])
                   document.getElementById(coords[1]).scrollIntoView();
                   document.getElementById(coords[1]).style.background = 'yellow';
               }
            }
             >
               {eachBreakpoint.split(",")[0]}
             </Dropdown.Item>
           );
       })}
    </Dropdown.Menu>
  </Dropdown>

    );
  }

};
