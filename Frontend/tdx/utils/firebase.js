import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
// import {initializeApp} from "firebase";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const config = {
  apiKey: "AIzaSyCcJCe1acm01EIceSP_xlZv5OUZd-BQfRw",
  authDomain: "stack-smashers.firebaseapp.com",
  databaseURL: "https://stack-smashers-default-rtdb.firebaseio.com",
  projectId: "stack-smashers",
  storageBucket: "stack-smashers.appspot.com",
  messagingSenderId: "740939279438",
  appId: "1:740939279438:web:abab3ad7c9b9da1efae71f",
  measurementId: "G-02JCX0S0ME"
};

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const firestore = firebase.firestore();


export {
  firebase,
  firestore
};
