// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZPI36XYbRpAB_qJoOOIgp9fHD1v5t9DI",
  authDomain: "semafchat-60cd1.firebaseapp.com",
  databaseURL: "https://semafchat-60cd1-default-rtdb.firebaseio.com",
  projectId: "semafchat-60cd1",
  storageBucket: "semafchat-60cd1.appspot.com",
  messagingSenderId: "214897507551",
  appId: "1:214897507551:web:80c04808f956e55f81bd6a",
  measurementId: "G-YDXN20NC3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);