// firebase-config.js
// 1) Include your config from the console
const firebaseConfig = {
  apiKey: "AIzaSyBaL_3t1OcX08_WAe1pxvhcpUeTZ9ssZ2U",
  authDomain: "one-piece-pvp.firebaseapp.com",
  databaseURL: "https://one-piece-pvp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "one-piece-pvp",
  storageBucket: "one-piece-pvp.appspot.com",
  messagingSenderId: "859496504075",
  appId: "1:859496504075:web:34f6fa4bfd0d9a8a8ba00e"
};

// 2) Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 3) Export the database reference
const db = firebase.database();
