import firebase from 'firebase/app'
import 'firebase/firestore'

 

var firebaseConfig = {
    apiKey: "apikey",
    authDomain: "evernote-tuto.firebaseapp.com",
    databaseURL: "https://evernote-tuto.firebaseio.com",
    projectId: "evernote-tuto",
    storageBucket: "evernote-tuto.appspot.com",
    messagingSenderId: "1033424797512",
    appId: "1:1033424797512:web:e2748e553649b1a3543d7d"
  };
   firebase.initializeApp(firebaseConfig); 



export { firebaseConfig as firebase }
