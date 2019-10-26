import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyDp2Ir6SjYNlTetjpTczf3fR-_mdlcAxCI",
    authDomain: "resightdatastore.firebaseapp.com",
    databaseURL: "https://resightdatastore.firebaseio.com",
    projectId: "resightdatastore",
    storageBucket: "resightdatastore.appspot.com",
    messagingSenderId: "1043926409268"
};

firebase.initializeApp(config);
const storage = firebase.storage();

export {
    storage,
    firebase as
    default
}

ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();