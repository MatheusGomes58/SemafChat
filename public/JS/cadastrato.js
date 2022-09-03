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
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();


async function Ryan(){
  var numero = document.getElementById("lbl_number").value
  var id;
  var number;
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.number}`);
    });
  });
  db.collection("users").add({
    number: numero
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}