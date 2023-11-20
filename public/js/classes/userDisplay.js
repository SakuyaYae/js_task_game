import { getAllUsers, addUser, getOneUser, updateUser } from "./../function/server-request.js"

export default class UserDisplay {
  static #tBody = document.querySelector("tbody");

  static createUserDisplay(userIndex, userArr) {
    const user = this.#getUser(userIndex, userArr);
    const newUserRow = document.createElement("tr");
    const newTdName = document.createElement("td");
    const newTdScore = document.createElement("td");
    const newTdMatch = document.createElement("td");

    newTdName.innerText = user.userName;
    newTdScore.innerText = user.score;
    for (var i = 0; i < user.matchHistory.length; i++) {
      newTdMatch.innerText += "Opponent: " + user.matchHistory[i].opponent + " |Result: " + user.matchHistory[i].result + " |Rounds played: " + user.matchHistory[i].turnCount + " \n";

    }

    newUserRow.appendChild(newTdName);
    newUserRow.appendChild(newTdScore);
    newUserRow.appendChild(newTdMatch);
    this.#tBody.appendChild(newUserRow);
  }

  static async createLederBoard() {
    const lederBoardArr = await this.getUserList();
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

  static async getUserList() {
    return getAllUsers();
  }

  static #getUser(userIndex, userArr) {
    return userArr[userIndex];
  }
}