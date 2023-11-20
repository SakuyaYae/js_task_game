import GenerateUserId from "./classes/generateUserId.js";
import { getAllUsers, addUser, getOneUser, updateUser } from "./function/server-request.js"

class regUser {
  static #saveUser(user) {
    addUser(user);
    console.log("user saved");
  }

  static async createUser(userName) {
    const user = {
      UserId: await GenerateUserId.getNewUserId(),
      userName: userName.value,
      score: 0,
      matchHistory: []
    }
    this.#saveUser(user);
  }
}

function main() {
  const regUserFrom = document.getElementById("form");
  const userName = document.getElementById("userName");
  const messageDisplay = document.createElement("p");
  const main = document.querySelector("main");
  main.appendChild(messageDisplay);

  regUserFrom.addEventListener("submit", function (event) {
    event.preventDefault();
    regUser.createUser(userName);
    messageDisplay.innerText = "User Saved"
  })
}
main();
