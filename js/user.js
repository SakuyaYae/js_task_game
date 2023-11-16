class UserDisplay {
  static #userList = [
    {
      userName: "Sakuya",
      score: "3",
      matchHistory: [{
        opponent: "Sakura",
        result: "Win"
      }]
    },
    {
      userName: "Sakura",
      score: "1",
      matchHistory: [{
        opponent: "Sakuya",
        result: "Loss"
      }]
    },
    {
      userName: "Yui",
      score: "2",
      matchHistory: [
        {
          opponent: "Vayle",
          result: "Loss"
        },
        {
          opponent: "Vayle",
          result: "Loss"
        }
      ]
    },
    {
      userName: "Vayle",
      score: "6",
      matchHistory: [
        {
          opponent: "Yui",
          result: "Win"
        },
        {
          opponent: "Yui",
          result: "Win"
        }
      ]
    }
  ];

  static createUserDisplay(userIndex) {
    const user = this.#getUser(userIndex);
    const newUserRow = document.createElement("tr");
    const newTdName = document.createElement("td");
    const newTdScore = document.createElement("td");
    const newTdMatch = document.createElement("td");

    newTdName.innerText = user.userName;
    newTdScore.innerText = user.score;
    for (var i = 0; i < user.matchHistory.length; i++) {
      newTdMatch.innerText += user.matchHistory[i].opponent + " " + user.matchHistory[i].result + " \n";

    }

    newUserRow.appendChild(newTdName);
    newUserRow.appendChild(newTdScore);
    newUserRow.appendChild(newTdMatch);

    const tBody = document.querySelector("tbody");
    tBody.appendChild(newUserRow);
  }

  static getUserListLength() {
    return this.#userList.length;
  }

  static #getUser(userIndex) {
    return this.#userList[userIndex];;
  }
}

function main() {
  for (var i = 0; i < UserDisplay.getUserListLength(); i++) {
    UserDisplay.createUserDisplay(i);
  }
}
main()