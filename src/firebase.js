import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXPAby_8V_5MbFCjRdFOsWOld2nGzbY84",
  authDomain: "netflix-clone-build-d3f96.firebaseapp.com",
  projectId: "netflix-clone-build-d3f96",
  storageBucket: "netflix-clone-build-d3f96.appspot.com",
  messagingSenderId: "425915833910",
  appId: "1:425915833910:web:5f69603d1255226fad0297",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };