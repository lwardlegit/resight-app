import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from 'react-bootstrap';
class Dictaphone extends Component {


libraryOfIntents=(transcript,resetTranscript)=>{
  console.log("inside library function now ")
  var intentToPass;
  if(transcript.includes("notes")){
           intentToPass = "notes"
          resetTranscript()

  }if(transcript.includes("cards")){
          intentToPass = "cards"
            resetTranscript()

  }if(transcript.includes("home")){
          intentToPass = "home"
            resetTranscript()

  }
  if(transcript.includes("settings") ){
           intentToPass = "settings"
           this.props.grabIntent(transcript);
  }
  if(transcript.includes("read document") ){
           intentToPass = "read document"
            resetTranscript()
  }

    console.log("intent to pass is: ", intentToPass)
}


highlightOnRead=(transcript, cursor)=>{

         console.log("transcript",transcript)
         console.log("cursor",cursor.anchorNode.parentNode.id) //we only need the word

         if(transcript.includes(" ")){
           transcript = transcript.split(" ").pop()
         }
         if(transcript = cursor.textContent.toLowerCase()){
             cursor.style.backgroundColor = 'yellow'; //highlight the span matching the intent
         }
         cursor = document.getElementById(cursor.anchorNode.parentNode.id).nextSibling.nextElementSibling;
               return cursor
     };




  render() {
   const {transcript, resetTranscript, browserSupportsSpeechRecognition} = this.props
    var cursor=''

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    if(transcript==="notes"||transcript==="cards"||transcript==="home"|| transcript==="settings" || transcript==="read document"){
      this.libraryOfIntents(transcript,resetTranscript);
    }

    return (
      <div>
        <span id="transcriptSpan"className="transcriptspan" onChange={()=>{

          if(this.props.readAlongHighlightState===true){
            if(cursor===''){
              this.highlightOnRead(transcript,window.getSelection())
            }else{
                this.highlightOnRead(transcript,cursor)
            }
          }
        }}> {transcript}  </span>
        <Button variant="outline-dark" onClick={resetTranscript}>Reset</Button>
      </div>
    )
  }
}

export default SpeechRecognition(Dictaphone)
