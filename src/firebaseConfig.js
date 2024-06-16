import firebase from 'firebase/app';
import 'firebase/auth';
import'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyA_X0N7F1j_K7hjiptbiThFiZe6JeC0gsE",

  authDomain: "typingtest-df372.firebaseapp.com",

  projectId: "typingtest-df372",

  storageBucket: "typingtest-df372.appspot.com",

  messagingSenderId: "524880497481",

  appId: "1:524880497481:web:35b69b0224854e2b016898",

  measurementId: "G-DSKDYXNS0C"

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}