import {
  auth,
  db,
  storage,
  ref,
  set,
  get,
  child,
  sRef,
  uploadBytesResumable
} from './firebase-config.js';

const homeDiv = document.getElementById("home");
const submitVideoDiv = document.getElementById("submit-video");

document.getElementById("homeButton").addEventListener("click", () => {
  homeDiv.style.display = "block";
  submitVideoDiv.style.display = "none";
});

document.getElementById("leaderboardButton").addEventListener("click", () => {
  homeDiv.style.display = "none";
  submitVideoDiv.style.display = "block";
});

document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("uploadVideoButton").addEventListener("click", uploadVideo);

function register() {
  const mcname = document.getElementById("mcname").value;
  const password = document.getElementById("password").value;
  const email = `${mcname}@minepiece.fake`; // Fake email for MC users

  auth.createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      set(ref(db, 'users/' + uid), {
        mcname: mcname,
        elo: 1000
      });
      alert("Registered successfully!");
      renderLeaderboard();
    })
    .catch(error => alert(error.message));
}

function login() {
  const mcname = document.getElementById("mcname").value;
  const password = document.getElementById("password").value;
  const email = `${mcname}@minepiece.fake`;

  auth.signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Logged in!");
    })
    .catch(error => alert(error.message));
}

function renderLeaderboard() {
  const leaderboardRef = ref(db, 'users/');
  get(leaderboardRef)
    .then(snapshot => {
      const tbody = document.getElementById("leaderboard-body");
      tbody.innerHTML = "";
      if (snapshot.exists()) {
        const users = Object.values(snapshot.val());
        users.sort((a, b) => b.elo - a.elo);
        users.forEach(user => {
          const row = `<tr><td>${user.mcname}</td><td>${user.elo}</td></tr>`;
          tbody.innerHTML += row;
        });
      }
    })
    .catch(error => console.error("Error loading leaderboard:", error));
}

function uploadVideo() {
  const file = document.getElementById("videoInput").files[0];
  if (!file) return alert("Select a video first.");

  const videoRef = sRef(storage, `videos/${file.name}`);
  const uploadTask = uploadBytesResumable(videoRef, file);

  uploadTask.on('state_changed',
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    error => alert("Upload failed: " + error.message),
    () => alert("Video uploaded!")
  );
}

// Load leaderboard on start
window.addEventListener("load", () => {
  renderLeaderboard();
});
