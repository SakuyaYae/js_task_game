class regUser {
  static #saveUser(user) {
    console.log("user saved");
    console.log(user);
  }

  static createUser(userName) {
    const user = {
      userName: userName.value,
      score: "0",
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
