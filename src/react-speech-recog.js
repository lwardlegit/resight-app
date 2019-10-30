import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from 'react-bootstrap';
class Dictaphone extends Component {


libraryOfIntents=(transcript,resetTranscript)=>{
  console.log("inside library function ")
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


componentDidUpdate=(prevProps)=>{
  console.log(prevProps,this.props.cursor)

  if (this.props.readAlongHighlightState===true){
      let {transcript} = prevProps

              if(this.props.cursor !== '' && this.props.cursor !== undefined){
                var cursor = this.props.cursor

                  //console.log("cursor parentNode ",cursor.anchorNode.parentNode)
                  //console.log("just cursor",cursor)
                  //console.log("just inner html",cursor.anchorNode.parentNode.textContent)
                  //console.log("cursor innerhtml",cursor.anchorNode.innerhtml)

                    if(transcript.includes(" ")){
                        transcript = transcript.split(" ").pop()
                        console.log(transcript)
                      }

                        console.log("cursor anchor node textcontent:",cursor.anchorNode.textContent)
                        if(transcript === cursor.anchorNode.textContent.toString().toLowerCase()){ //AFTER UPDATING BREAKS HERE ?? why cant this just be cursor.innerhtml?
                          cursor.anchorNode.parentNode.style.backgroundColor = 'yellow';
                          cursor = cursor.anchorNode.parentNode.nextElementSibling
                            this.props.updatecursor (cursor); //highlight the span matching the intent

                        }else{
                              console.log("no cursor")



                              }
                          }
                        }
                      }


  render() {
   const {transcript, resetTranscript, browserSupportsSpeechRecognition} = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    if(transcript==="notes"||transcript==="cards"||transcript==="home"|| transcript==="settings" || transcript==="read document"){
      this.libraryOfIntents(transcript,resetTranscript);
    }
//<span id="transcriptSpan"className="transcriptspan"> {transcript}  </span>
    return (
      <div>
        <Button variant="outline-dark" onClick={resetTranscript}>Reset</Button>
      </div>
    )
  }
}

export default SpeechRecognition(Dictaphone)
