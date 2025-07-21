// leaderboard.js

// Reference to the “leaderboard” node
const leaderboardRef = db.ref('leaderboard');

/** * Write or update a player’s ELO score. * @param {string} username  – Unique ID for the player (e.g. their Minecraft name) * @param {number} elo       – Their Elo score*/function writeUserScore(username, elo) {
  leaderboardRef.child(username).set({
    elo: elo,
    updated: firebase.database.ServerValue.TIMESTAMP
  }).catch(error => {
    console.error("Error writing user score:", error);  });}const leaderboardBody = document.getElementById("leaderboard-body");

// Listen for changes in the users node
firebase.database().ref("users").on("value", snapshot => {
  leaderboardBody.innerHTML = "";  const users = Object.values(snapshot.val() || []);  // Sort users by elo, ensuring we handle cases where elo might not exist
  users.sort((a, b) => (b.elo || 0) - (a.elo || 0));  users.forEach((user, index) => {
    const row = document.createElement("tr");    
    // Check if user has an elo property before adding to the row
    const eloScore = user.elo!== undefined? user.elo : 0;

    row.innerHTML =` <td>${index + 1}</td>
      <td>${user.email? user.email.split("@")[0] :"Unknown"}</td>
      <td>${user.mcname ||"Unknown"}</td>
      <td>${eloScore}</td>`; leaderboardBody.appendChild(row);  });});```### Key Changes:
1. **Error Handling**: Added `.catch` to handle possible errors when writing the user score.2. **Default Values**: Added checks to provide default values (like`0` for`elo` and"Unknown" for missing properties) to avoid`undefined` values in the leaderboard.3. **Safety Checks**: Ensured that if a user's email or Minecraft name is not available, the code will handle it gracefully.Make sure the Firebase is correctly initialized and the database rules allow reading and writing as per your requirements.
