import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCRfQhVGUaBaEUkJEtEFR3BfgurkG2s5js",
  authDomain: "turkey-bd954.firebaseapp.com",
  databaseURL: "https://turkey-bd954.firebaseio.com",
  projectId: "turkey-bd954",
  storageBucket: "turkey-bd954.appspot.com",
  messagingSenderId: "1028275882684",
  appId: "1:1028275882684:web:8108633a7f3b2ee2f55eb9"
};

app.initializeApp(firebaseConfig);

let base = app.database();

export default base;

export { app }