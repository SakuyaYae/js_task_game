class User {
  #userList = [
    {
      userName: "Sakuya",
      score: "0",
      matchHistory: []
    },
    {
      userName: "Sakura",
      score: "0",
      matchHistory: []
    },
    {
      userName: "Yui",
      score: "0",
      matchHistory: []
    },
    {
      userName: "Vayle",
      score: "0",
      matchHistory: []
    }
  ];
  constructor() { }

  createUser(userIndex) {
    const user = this.#getUser(userIndex);
    const newUserRow = document.createElement("tr");
    const newTdName = document.createElement("td");
    const newTdScore = document.createElement("td");

    newTdName.innerText = user.userName;
    newTdScore.innerText = user.score;
    newUserRow.appendChild(newTdName);
    newUserRow.appendChild(newTdScore);

    const tBody = document.querySelector("tbody");
    tBody.appendChild(newUserRow);
  }

  getUserListLength() {
    return this.#userList.length;
  }

  #getUser(userIndex) {
    return this.#userList[userIndex];;
  }
}

function main() {
  const user = new User();
  for (var i = 0; i < user.getUserListLength(); i++) {
    user.createUser(i);
  }
}
main()