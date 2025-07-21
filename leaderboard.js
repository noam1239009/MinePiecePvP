// Reference to the “leaderboard” node
const leaderboardRef = db.ref('leaderboard');

/** * Write or update a player’s ELO score. * @param {string} username - Unique ID for the player (e.g. their Minecraft name) * @param {number} elo - Their Elo score*/function writeUserScore(username, elo) {
  leaderboardRef.child(username).set({
    elo: elo,
    updated: firebase.database.ServerValue.TIMESTAMP
  }).catch(error => {
    console.error("Error writing user score:", error);  });}function renderLeaderboard() {
  leaderboardRef.once('value').then(snapshot => {
    const data = snapshot.val() || {};    // Convert object to array of { username, elo, updated} const players = Object.entries(data).map(([username, info]) => ({
      username,
      elo: info.elo,
      updated: info.updated
    }));    // Sort descending
    players.sort((a, b) => b.elo - a.elo);    // Populate the table
    const tbody = document.getElementById('leaderboard-body');    tbody.innerHTML = '';  // clear
    players.forEach((p, idx) => {
      const row = document.createElement('tr');      row.innerHTML =` <td>${idx + 1}</td>
        <td>${p.username}</td>
        <td>${p.elo || 0}</td>`; tbody.appendChild(row);    });  });}

// Listen for changes in the users node
firebase.database().ref("users").on("value", snapshot => {
  const leaderboardBody = document.getElementById("leaderboard-body");  leaderboardBody.innerHTML = "";  
  const users = Object.values(snapshot.val() || []);  

  // Sort users by elo, ensuring we handle cases where elo might not exist
  users.sort((a, b) => (b.elo || 0) - (a.elo || 0));  

  users.forEach((user, index) => {
    const row = document.createElement("tr");    
    // Check if user has an elo property before adding to the row
    const eloScore = user.elo!== undefined? user.elo : 0;

    row.innerHTML =` <td>${index + 1}</td>
      <td>${user.email? user.email.split("@")[0] :"Unknown"}</td>
      <td>${user.mcname ||"Unknown"}</td>
      <td>${eloScore}</td>`; 
    leaderboardBody.appendChild(row);  
  });});

// Call on page load
window.addEventListener('load', () => {
  renderLeaderboard();});```### Key Features:
1. **Error Handling**: The`writeUserScore` function includes error handling to catch and log errors when writing to the database.2. **Default Values**: The code checks for`elo` and other properties to avoid`undefined` values in the leaderboard.3. **Dynamic Updates**: The leaderboard listens for changes in the user data and updates the table accordingly.### Note:
Make sure that your Firebase instance is correctly initialized, and the security rules allow reading and writing to the`leaderboard` and`users` nodes as needed. If you have any further questions or need additional features, feel free to ask!
