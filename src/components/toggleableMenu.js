import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HighlightHelper from './highlighthelper.js';
import '../App.css';
export default class ToggleMenu extends Component{

  render(props){
    return(
      <div>
      { this.props.showNotes ? <div onClick={this.props.closeModalHandler} className="back-drop"></div> : null }
      <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onClick={this.props.closeToggleMenu}>&times;</a>
      <a href="#">Forum</a>
      <a href="#" onClick={this.props.openNotes}>Notes</a>
      <a id = "audioDownload"href="#" onClick={this.props.downloadAudio}>download audio</a>
      <a href="#">About</a>
      </div>
      <Modal
          className="modal"
          show={this.props.showNotes}>
          <div>

              <div class="notetxtcontainer">{this.props.highlight}</div>

              </div>
               <Button className="notesButton" variant="outline-dark" onClick={this.props.close}>close Notes</Button>
                 <Button className="notesButton" variant="outline-dark" onClick={this.props.close, this.props.downloadNotes}>Download Notes</Button>
      </Modal>

      </div>
      );
  }
};
