export default class UserDisplay {
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

  static #tBody = document.querySelector("tbody");

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
    this.#tBody.appendChild(newUserRow);
  }

  static createLederBoard() {
    const lederBoardArr = this.#userList;
    lederBoardArr.sort((user1, user2) => user1.score - user2.score);
    lederBoardArr.reverse();
    for (var i = 0; i < lederBoardArr.length; i++) {
      const newUserRow = document.createElement("tr");
      const newTdName = document.createElement("td");
      const newTdScore = document.createElement("td");
      newTdName.innerText = lederBoardArr[i].userName;
      newTdScore.innerText = lederBoardArr[i].score;
      newUserRow.appendChild(newTdName);
      newUserRow.appendChild(newTdScore);
      this.#tBody.appendChild(newUserRow);
    }
  }

  static getUserListLength() {
    return this.#userList.length;
  }

  static #getUser(userIndex) {
    return this.#userList[userIndex];;
  }
}