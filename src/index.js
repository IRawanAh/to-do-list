import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAVdf_spGfYyzhSVluQCany15bjERpjL88",
    authDomain: "todolist-692de.firebaseapp.com",
    databaseURL: "https://todolist-692de.firebaseio.com",
    projectId: "todolist-692de",
    storageBucket: "todolist-692de.appspot.com",
    messagingSenderId: "209933416382"
};
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
