const auth = firebase.auth();
const db = firebase.database();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mcname = document.getElementById("mcname").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      db.ref("users/" + uid).set({
        email: email,
        mcname: mcname,
        elo: 1000
      });
      alert("Registered!");
    })
    .catch(error => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Logged in!");
    })
    .catch(error => {
      alert(error.message);
    });
}
