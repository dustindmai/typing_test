import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import'firebase/compat/firestore';
const firebaseConfig = {

  apiKey: process.env.REACT_APP_KEY,

  authDomain: process.env.REACT_APP_DOMAIN,

  projectId: process.env.REACT_APP_PROJECTID,

  storageBucket: process.env.REACT_APP_BUCKET,

  messagingSenderId: process.env.REACT_APP_SENDERID,

  appId: process.env.REACT_APP_APPID,

  measurementId: process.env.REACT_APP_MEASUREMENTID

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}