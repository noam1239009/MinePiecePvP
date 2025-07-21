const auth = firebase.auth();const db = firebase.database();function register() {
  const password = document.getElementById("password").value;
  const mcname = document.getElementById("mcname").value;

  // Register a user with an anonymous account or handle authentication in a different way
  auth.signInAnonymously()    .then(userCredential => {
      const uid = userCredential.user.uid;

      // Save user info to the database
      db.ref("users/" + uid).set({
        mcname: mcname,
        elo: 1000
      });      // Write initial Elo score
      writeUserScore(mcname, 1000); // new user starts at 1000

      alert("Registered!");    })    .catch(error => {
      alert(error.message);    });}function login() {
  const password = document.getElementById("password").value;
  // Note: The login function is still using email for authentication.  // If you want to completely remove email from login as well, please specify.  const email = document.getElementById("email").value;

  auth.signInWithEmailAndPassword(email, password)    .then(userCredential => {
      alert("Logged in!");    })    .catch(error => {
      alert(error.message);    });}```### Key Changes:
1. **Email Parameter Removed**: The email input has been removed from the registration process. Users can now be registered anonymously.2. **Using Anonymous Authentication**: The code now uses`auth.signInAnonymously()` to create a user without an email. Ensure this fits your use case.3. **User Data Storage**: The Firebase database still stores the`mcname` and initializes the`elo` score.### Notes:
- If you want to remove email from the login function as well, please let me know how you would like to handle user authentication in that case.- Ensure your Firebase rules allow for anonymous authentication if you go this route.If you have any other modifications or questions, feel free to ask!
