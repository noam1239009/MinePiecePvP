const leaderboardBody = document.getElementById("leaderboard-body");

firebase.database().ref("users").on("value", snapshot => {
  leaderboardBody.innerHTML = "";
  const users = Object.values(snapshot.val() || {});
  users.sort((a, b) => b.elo - a.elo);

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.email.split("@")[0]}</td>
      <td>${user.mcname}</td>
      <td>${user.elo}</td>
    `;
    leaderboardBody.appendChild(row);
  });
});
