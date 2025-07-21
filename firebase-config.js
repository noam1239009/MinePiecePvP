// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaL_3t1OcX08_WAe1pxvhcpUeTZ9ssZ2U",
  authDomain: "one-piece-pvp.firebaseapp.com",
  databaseURL: "https://one-piece-pvp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "one-piece-pvp",
  storageBucket: "one-piece-pvp.appspot.com",
  messagingSenderId: "859496504075",
  appId: "1:859496504075:web:34f6fa4bfd0d9a8a8ba00e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Export for use in other files
export { auth, db, storage, ref, set, get, child, sRef, uploadBytesResumable };
