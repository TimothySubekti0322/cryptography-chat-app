// Import the functions you need from the SDKs you need
// const firebase = require("firebase");

// const firebaseConfig = {
//   apiKey: "AIzaSyDJUVlg8TaPJbPVrMRSnCakFmR774IWOWI",
//   authDomain: "cryptography-instant-messaging.firebaseapp.com",
//   projectId: "cryptography-instant-messaging",
//   storageBucket: "cryptography-instant-messaging.appspot.com",
//   messagingSenderId: "1637388299",
//   appId: "1:1637388299:web:70ff14a7a6289b1325b70e",
//   measurementId: "G-G8JJZR1R45",
// };

// const fire = firebase.initializeApp(firebaseConfig);
// module.exports = fire;

const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = firebaseAdmin;
