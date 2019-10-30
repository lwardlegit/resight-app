import React, { Component } from 'react';
import './App.css';
import Navigation from './nav';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import playbutton from './assets/playbutton.png';
import SpeechSynthesis from '../node_modules/react-speech/src/speechSynthesis.js';
import Speech from 'react-speech';
import SpeechRecognition from './react-speech-recog';
import HighlightHelper from './components/highlighthelper.js';
import $ from 'jquery';
import {getPageText,geturl,makepdf,pdfjsLib} from './scripts/makepdf.js';




//const pdfjsLibworkerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var documentarray = []
var pdfUtil = require('pdf-to-text');
export class Body extends Component {

     recognize = async (inputimg) => {

         const { createWorker } = window.Tesseract;
         const worker = createWorker({
           logger: m => console.log(m),
         });
         const image = new Image();
         image.src = inputimg;
         await worker.load();
         await worker.loadLanguage('eng');
         await worker.initialize('eng');
         const { data: { text } } = await worker.recognize(image.src);
         console.log(text)
         console.log(this.props.documentText)
          this.props.getTextFromBody(this.splitdocintowords(document.getElementById("docbod"),text))
     };


     splitdocintowords=(div,arr)=> {
         arr=arr.split(" ")
      for (let i = 0; i < arr.length; i++) {
        let span = document.createElement("span")

        span.textContent = arr[i]
        span.id = "word" + i;
        span.addEventListener("mouseup", () => { if(this.props.highlightMode===true){ span.style.background = 'yellow'; this.props.highlightText(span)} } );
        span.classList.add("textBackground")
        div.append(span)
        div.append(" ");
      }
     }



    rundemo = () => {
      //function is designed to run all the essential functions in the app one after another

    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    var docvalue = document.getElementById("regex-example").value;
    var selection = this.range(0, 20, docvalue); //get selected chars in element
    var selectedText = selection.toString(); //sends the elements to a string

      wait(6000)
  .then(() => this.props.setHighlightMode())
  .then(() => wait(6000).then(() => this.props.toggleMenu()))
  .then(() => wait(6000).then(() => this.props.openNotes()))
  .then(() => wait(6000).then(() => this.props.close()))
  .then(() => wait(6000).then(() => this.props.setScholarMode()))
  .then(() => wait(6000).then(() => this.props.synonymsFunction("noun")));

    }

    render(props) {

        const {transcript, resetTranscript, browserSupportsSpeechRecognition} = this.props
        var documentView;
        if (!this.props.fileviewableState) {

            documentView = < div>
                <
                Navigation intent = { this.props.intent }
            setHighlightMode = { this.props.setHighlightMode }
            setScholarMode = { this.props.setScholarMode }
            toggleMenu = { this.props.toggleMenu }
            closeToggleMenu = { this.props.closeToggleMenu }
            readAlongHighlight = { this.props.readAlongHighlight }
            lookupWords = { this.props.lookupWords }
            addBreakPointMode = { this.props.addBreakPointMode }
            listOfBreakPoints = { this.props.listOfBreakPoints }
            createBreakPoint = { this.props.createBreakPoint}
            openNotes = { this.props.openNotes }
            showNotes = { this.props.showNotes }
            close = { this.props.close }
            downloadNotes = { this.props.downloadNotes }
            highlight = { this.props.highlight }
            downloadAudio = { this.props.downloadAudio}
            />

            <div className = "documentContainer">
            <div id="docbod"className="documentText" value={this.props.documentText} rows="5" cols="50"> </div>
            </div>

            <div className = "documentUpload" >
                <input className = "uploadImage"
            type = "file"
            onChange = {
                (e, props, state) => {

                    let img = new Image()
                    var objectURL = URL.createObjectURL(e.target.files[0]);
                    img.src = objectURL
                    this.recognize(img.src)
                            //this.props.getTextFromBody(result.text.split(","))
                          //  console.log(this.props.documentText)
                    this.props.changeViewStatetoTrue()

                }
            }
            />
            <input id="fileinput" type="file"onChange={
              (e, props)=>{
                this.props.changeViewStatetoTrue()

                let p = new Promise ((resolve,reject,finaltext)=>{
                  resolve(geturl(e))
                })
                .then((url)=>{
                  pdfjsLib.getDocument(url).then(function (pdf) {
                    var pdfDocument = pdf;
                    var pagesPromises = [];

                    for (var i = 0; i < pdf.numPages; i++) {

              (function (pageNumber) {
                    pagesPromises.push(getPageText(pageNumber, pdfDocument));
                    })(i + 1);
                  }

                  Promise.all(pagesPromises).then(function (pagesText) {

                    let finaltext=[]
                for(var i = 0;i < pagesText.length;i++){
                  finaltext.push( (i + 1) +pagesText[i])
                  console.log("adding i")
                  }

          return finaltext
})
.then((finaltext)=>{
  console.log(document.getElementById("docbod").value)
    $("#docbod").append(finaltext)
    console.log(finaltext)
})

}, function (reason) {
// PDF loading error
console.error(reason);
      })
    })
  }
}/>


<div className="bottombtns">
  <Button variant="outline-dark" onClick = {
  (e, props, state, location) => {
    var demoUrl="https://tesseract.projectnaptha.com/img/eng_bw.png";
    this.recognize(demoUrl)
    this.props.changeViewStatetoTrue()
    this.props.showAudio()
  }}>Demo</Button>

    <Button id="feedbackButton" variant="outline-dark"><a href = "https://docs.google.com/forms/d/1y8f-h9GE6aD_Map3hDMXYWFNs3xvMeCm3FRieGbmj-A/prefill">Feedback </a></Button>

</div>

  </div>
</div>

        } else {
            documentView = <div >
                <
                Navigation intent = { this.props.intent }
            setHighlightMode = { this.props.setHighlightMode }
            setScholarMode = { this.props.setScholarMode }
            toggleMenu = { this.props.toggleMenu }
            closeToggleMenu = { this.props.closeToggleMenu }
            readAlongHighlight = { this.props.readAlongHighlight }
            lookupWords = { this.props.lookupWords }
            addBreakPointMode = { this.props.addBreakPointMode }
            listOfBreakPoints = { this.props.listOfBreakPoints }
            createBreakPoint = { this.props.createBreakPoint}
            openNotes = { this.props.openNotes }
            showNotes = { this.props.showNotes }
            close = { this.props.close }
            downloadNotes = { this.props.downloadNotes }
            highlight = { this.props.highlight }
            downloadAudio = { this.props.downloadAudio}
            />

            < div className = "documentContainer">
            <div id="docbod"className="documentText"
              onMouseUp={(e, props, state)=>{
                 if(this.props.addBreakPoint===true){
                   this.props.createBreakPoint(window.getSelection(), e.clientX, e.clientY)
                }
                if(this.props.readAlongHighlightState===true){
                  this.props.updatecursor(window.getSelection())
                }
            }}
                 value={this.props.documentText}
                 rows="5"
                cols="50">
            </div>

                    <div className="bottombtns">
                      <SpeechRecognition cursor={this.props.cursor} updatecursor={this.props.updatecursor} readAlongHighlightState={this.props.readAlongHighlightState} grabIntent={this.props.grabIntent} id="speakAloud" className="audioBtns"  />
                      <Button variant="outline-dark" onClick = {
                      (e, props, state, location) => {
                        var demoUrl="https://tesseract.projectnaptha.com/img/eng_bw.png";
                        this.recognize(demoUrl)
                        this.props.changeViewStatetoTrue()
                        this.props.showAudio()
                      }}>Demo</Button>

                        <Button id="feedbackButton" variant="outline-dark"><a href = "https://docs.google.com/forms/d/1y8f-h9GE6aD_Map3hDMXYWFNs3xvMeCm3FRieGbmj-A/prefill">Feedback </a></Button>

                    </div>
            </div>

             </div>
        }
        return ( < div >

            { documentView }

            </div>
        );
    }
}
