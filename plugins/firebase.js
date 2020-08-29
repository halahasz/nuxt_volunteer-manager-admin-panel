import * as firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQkN9ckqMBR-Gh0vXe85lrMOKdRyquAcU",
  authDomain: "volunteers-manager.firebaseapp.com",
  databaseURL: "https://volunteers-manager.firebaseio.com",
  projectId: "volunteers-manager",
  storageBucket: "volunteers-manager.appspot.com",
  messagingSenderId: "491423776017",
  appId: "1:491423776017:web:58df7ad027bf8819da60b0"
};
// Initialize Firebase
let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
