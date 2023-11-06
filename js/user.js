function createUser() {
  const user = getUser();
  const newUserRow = document.createElement("tr");
  const newTdName = document.createElement("td");
  const newTdScore = document.createElement("td");

  newTdName.innerText = user.userName;
  newTdScore.innerText = user.score;
  newUserRow.appendChild(newTdName);
  newUserRow.appendChild(newTdScore);

  const tBody = document.querySelector("tbody");
  tBody[0].appendChild(newUserRow);
}

function getUser() {
  const user = {
    userName: Sakuya,
    score: "0"
  }
  return user;
}

function main() {

}