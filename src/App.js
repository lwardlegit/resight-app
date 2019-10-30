
import React, { Component } from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import {Body} from './Body.js';
import {LandingPage} from './landingpage';
//import SpeechRecognition from './react-speech-recog';
import Dictionary from "oxford-dictionary";



// Require Editor CSS files.
import Speech from 'react-speech'; //this converts your text into speech
import {About} from './About';
import {Signup} from './signup';
import {BrowserRouter,Router,Route,Switch} from 'react-router-dom';
import Play from './assets/play.jpg';
import Pause from './assets/pause.png';
import Navigation from './nav';

// Require Font Awesome.
import ReactHtmlParser from 'react-html-parser';
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery'; window.$ = $;


class App extends Component {

constructor(props){
  super(props);


this.state={
  isLoggedIn:false,
  intent: "mild",
  showBtn: false,
  show: " ",
  saveNotice:false,
  settings:" ",
  cards: " ",
  showNotes: false,
  NoteContent: '',
  listening: false,
  readAlongHighlightState: false,
  cursor:'',
  autostartStatus: true,
  highlightedText: " ",

  //we should be able to take any text we highlight and pass it to this state so we can read it aloud
  textToReadAloud: 'some standard read aloud text',
  documentContent: "",
  wordDefinition: "",
  highlightMode:false,
  scholarMode:false,
  scholarWordSelection: "",
  addBreakPoint:false,
  Breakpoints:"",


//body's state
  FileViewable: false,
  image: '',
  url: '',

  };
}


  logIn = () =>{
    this.setState({isLoggedIn: true})
    console.log("login State changed",!this.state.isLoggedIn)
  }
  showAudio = () =>{
    this.setState({showBtn: true})
    console.log("show buttons")
  }
  toggleMenu = () =>{
    console.log("open the menu")
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.animation = "reveal 1s forwards";
  }
  closeToggleMenu = () =>{
    console.log("closing menu")
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.animation = "";

  }
  openNotes = () =>{
      console.log("opening notes")
      this.setState({showNotes:true})
      console.log(this.state.showNotes)
  }
  closeModal = () =>{
    console.log("closing notes")
    this.setState({showNotes:false})
  }
  downloadNotes = () =>{
      console.log("Downloading notes")
      var data ="here is some sample text to later be replaced with the value of the notes"
      var fileDownload = require('js-file-download');
      fileDownload(data, 'notes.txt');
  }
  downloadAudio = () =>{ //currently a work in progress
    //first we build the audio
    let p = new Promise(()=>{
    var result = "//convertToMp3(this.documentText)"
  })
    p.then((result)=>{
        //then we download the audio
        var fileDownload = require('js-file-download');
        fileDownload(this.props.documentAudio, 'myAudio.mp3');
      })
}


 readTextAloud = (Speech) =>{
   let textInProgress = true;
    var selectedText = window.getSelection();

   if(this.state.intent==="read document"){
    // while(textInProgress!==false){
     this.setState({textToReadAloud: this.state.documentContent.toString()})
       for(var i=0; i<this.state.documentContent.length; i++){

         if(this.state.intent==="pause"){

           console.log("we've paused the reading")
           this.setState({textToReadAloud:" "})
         }

         if(this.state.intent==="resume"){
           for( var j=this.state.documentContent[i]; j<this.state.documentContent.length; j++){
              var textRemainingString;
              textRemainingString += this.state.documentContent[j]
            }
            let finalTextRemaining = textRemainingString.split(" ");
            this.setState({textToReadAloud: finalTextRemaining})
         }

         if(selectedText!==null){
           this.setState({textToReadAloud:selectedText})
         }
      }
    }
      textInProgress=false;
 }

 play = ()=>{
   console.log("reading text aloud");
   this.setState({textToReadAloud:this.state.documentContent.toString() })
   console.log(this.state.textToReadAloud);
   if(this.state.autostartStatus===false){
     this.setState({autostartStatus:!this.state.autostartStatus})
   }
 }


popupByVoice = () => {
   if(this.state.intent==="notes"){
     this.handleShowNotes();
     console.log("voice popup active")
   }
   if(this.state.intent==="cards"){
     this.handlecards();
   }
   if(this.state.intent==="settings"){
     this.handlesettings();
   }
   if(this.state.intent ==="home"){
     this.goHome();
   }
   if(this.state.intent === "read document"){
     this.readTextAloud();
   }

 }
 componentDidMount = () => {
            this.interval = setInterval(() => this.popupByVoice(), 1000);
          }

 grabIntentFromSpeech = (intent) => {

   this.setState({intent:intent})
   console.log("altering intent")
 }
 updatecursor = (selection) =>{
   this.setState({cursor:selection})
   console.log("UPDATING CURSOR", selection)
 }


 grabBodyText = (bodyText) =>{
   this.setState({documentContent:bodyText}, function (){
     console.log("logging the document content", bodyText)

   })
 }

 changeViewStatetoTrue = () =>{
   this.setState({FileViewable:!this.state.FileViewable}, function (){
     console.log(this.state.FileViewable)
   });
 }
 highlight = (param) =>{
   //if the highlight mode is changed highlighting will be allowed
   if(this.state.highlightMode===true){
      this.setState({highlightedText: this.state.highlightedText +" "+param.textContent  })
      console.log("added highlighted text",param, this.state.highlightedText)
    }
 }

 Demohighlight = (param) =>{
   //if the highlight mode is changed highlighting will be allowed
   if(this.state.highlightMode===true){
    var selection =  param
    console.log("selection", selection)
    //we need to actually change the background color of highlightString
    var highlightString = selection.toString();
      console.log(highlightString)
      this.setState({highlightedText: this.state.highlightedText + highlightString +"," })

      console.log("updated state",this.state.highlightedText);
    }
 }

 setHighlightMode = () =>{
   this.setState({highlightMode:!this.state.highlightMode})
   if(this.state.highlightMode===true){
      console.log("highlightMode mode deactivated")
   }else{
     console.log("highlightMode mode activated")
   }
 }
 readAlongHighlight = () =>{
   if(this.state.readAlongHighlightState===false){
     alert("click a word to start highlighting from, every word you speak after the selection will be highlighted")
   }
  this.setState({readAlongHighlightState:!this.state.readAlongHighlightState})
   console.log("highlighting what is read aloud", this.state.readAlongHighlightState)
 }

 setScholarMode = () =>{
   this.setState({scholarMode:!this.state.scholarMode})
   console.log("scholar mode active")
}

//this function is triggered from an onClick inside my body component
searchForSynonymsAndDef = (param) =>{
if(this.state.scholarMode==true){
console.log("INSIDE SYNONYMS here is the param",param) //we dp have the param here

  var p = new Promise((resolve,reject)=>{
    var synonyms = require("synonyms");
    var result=synonyms(param)

    if (result != undefined){
    resolve(result)
  }else{
    reject("error: the result is undefined")
  }

  }).then((result)=>{
    console.log("result is:",result)
  })
  .then((result)=>{
    this.setState({textToReadAloud: "here are some synonyms for "
    +param +"...firstly.....nouns...."+result})

  })

  }else{
    console.log("sorry scholar mode is off")
  }
}


addBreakPointMode = () =>{
      this.setState({addBreakPoint:true})
}

createBreakPoint = (param, x, y) =>{
  console.log("inside createBreakPoint")
   var windowSelection = param.anchorNode.parentNode.innerHTML;
   var location = param.anchorNode.parentNode.id
   this.setState({Breakpoints:this.state.Breakpoints+" "+windowSelection+","+location})
   console.log("windowSelection",windowSelection.id,windowSelection.innerHTML)
   console.log(this.state.Breakpoints)
}


  render() {
    const style = {
      container: {

        transform: 'translate(0%, 0%)',
      zIndex: '4',
      width: '10%',
      display: 'flex',
      margin: 'auto',
      justifyContent:'center'

        },
        play: {
          button: {
            width: '2em',
             height: '2em',
             cursor: 'pointer',
             pointerEvents: 'none',
             outline: 'none',
             backgroundColor: 'white',
             border: 'none',
             borderRadius: 6
          },
        },
        pause: {
          button: {
            width: '2em',
          height: '2em',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'white',
          border: 'none',
          borderRadius: 6
          },
        },

        resume: {
          button: {
            width: '2em',
        height: '2em',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: 6
          },
        }
      };

    if(this.state.showBtn){
      return (
        <div id="mainContent" onLoad={this.popupByVoice,this.displayNav}>


        <BrowserRouter>

        <div>

        <Switch>
        <Route exact path="/" render={props=><LandingPage {...props} login = {this.logIn}/>}/>
        <Route exact path="/signup" component= {Signup}/>

          <Route path="/app" render ={props=><Body {...props}
           getTextFromBody={this.grabBodyText}
           changeViewStatetoTrue={this.changeViewStatetoTrue}
           fileviewableState={this.state.FileViewable}
            documentText={this.state.documentContent}
            highlight={this.state.highlightedText}
            DemoHighlight={this.Demohighlight}
             setHighlightMode={this.setHighlightMode}
             highlightText = {this.highlight}
              highlightMode = {this.state.highlightMode}
              setScholarMode ={this.setScholarMode}
              synonymsFunction = {this.searchForSynonymsAndDef}
               logOut = {this.logIn}
               play ={this.play}
            intent={this.state.intent}
            setScholarMode ={this.setScholarMode}
             toggleMenu = {this.toggleMenu}
              closeToggleMenu = {this.closeToggleMenu}
              readAlongHighlight = {this.readAlongHighlight}
              cursor={this.state.cursorlocation}
               readAlongHighlightState = {this.state.readAlongHighlightState}
            lookupWords = {this.lookupWords}
            addBreakPointMode = {this.addBreakPointMode}
            addBreakPoint = {this.state.addBreakPoint}
             listOfBreakPoints = {this.state.Breakpoints}
              createBreakPoint = {this.createBreakPoint}
              openNotes= {this.openNotes}
              showNotes= {this.state.showNotes}
                close={this.closeModal}
            downloadNotes={this.downloadNotes}
            downloadAudio = {this.downloadAudio}
            updatecursor = {this.updatecursor}
            cursor = {this.state.cursor}
            showAudio = {this.showAudio} />}/>

          <Route exact path="/about" component= {About}/>
        </Switch>

        </div>
        </BrowserRouter>

        <Speech id = "speechModule" text= {this.state.textToReadAloud} resume={true} pause={true} styles={style} rate={0.8} voice="Google UK English Female"/>

        </div>
      );
    }else{
      return(
        <div id="mainContent" onLoad={this.popupByVoice,this.displayNav}>

        <BrowserRouter>

        <div>

        <Switch>
        <Route exact path="/" render={props=><LandingPage {...props} login = {this.logIn}/>}/>
        <Route exact path="/signup" component= {Signup}/>

          <Route path="/app" render ={props=><Body {...props}
               transcript = {this.props.transcript}
               resetTranscript = {this.props.resetTranscript}
               getTextFromBody={this.grabBodyText}
               changeViewStatetoTrue={this.changeViewStatetoTrue}
               fileviewableState={this.state.FileViewable}
               documentText={this.state.documentContent}
               highlight={this.state.highlightedText}
               DemoHighlight={this.Demohighlight}
               setHighlightMode={this.setHighlightMode}
               highlightText = {this.highlight}
               highlightMode = {this.state.highlightMode}
               setScholarMode ={this.setScholarMode}
               synonymsFunction = {this.searchForSynonymsAndDef}
               logOut = {this.logIn}
               play ={this.play}
               intent={this.state.intent}
               setScholarMode ={this.setScholarMode}
               toggleMenu = {this.toggleMenu}
               closeToggleMenu = {this.closeToggleMenu}
               readAlongHighlight = {this.readAlongHighlight}
               readAlongHighlightState = {this.state.readAlongHighlightState}
               lookupWords = {this.lookupWords}
               addBreakPointMode = {this.addBreakPointMode}
               addBreakPoint = {this.state.addBreakPoint}
               createBreakPoint = {this.createBreakPoint}
               listOfBreakPoints = {this.state.Breakpoints}
               openNotes= {this.openNotes}
               showNotes= {this.state.showNotes}
               close={this.closeModal}
               downloadNotes={this.downloadNotes}
               downloadAudio = {this.downloadAudio}
               showAudio = {this.showAudio}
               grabIntent= {this.grabIntentFromSpeech}
               updatecursor = {this.updatecursor}
               cursor = {this.state.cursor}
                />}/>
          <Route exact path="/about" component= {About}/>
        </Switch>


        </div>
        </BrowserRouter>
        </div>

      );
    }


      }
    }

export default App;
