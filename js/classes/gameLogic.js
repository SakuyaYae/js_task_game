export default class GameLogic {
  static #playerTurnKeeper = 1;
  static #player1UnitCount = 0;
  static #player2UnitCount = 0;
  static #GameRoundCount = 1;
  static #player1 = {
    userName: "Vayle",
    score: "0",
    matchHistory: []
  };
  static #player2 = {
    userName: "Saya",
    score: "0",
    matchHistory: []
  };
  static playerList = [
    {
      userName: "Vayle",
      score: "0",
      matchHistory: []
    },
    {
      userName: "Saya",
      score: "0",
      matchHistory: []
    }
  ]
  static #msgDisplay = document.getElementById("msgDisplay");
  static gameLoad() {
    this.#getPlayerData();
  }

  static gameStart() {
    this.#playerTurnDisplay();
  }

  static playerMove(input) {
    if (this.#moveValidation(input)) {
      this.#playerUnitUpdate(input);
      if (this.#winCheck()) {
        this.#createMatchHistory();
      }
      this.#playerTurnUpdate();
      this.#playerTurnDisplay();
      this.#msgDisplay.innerText = "";
    }
    else if (this.#playerUnitCountCheck()) {
      if (!this.#pickUpUnit(input)) {
        console.log("Invalid move");
        this.#msgDisplay.innerText = "Invalid move";
      }
      else {
        console.log("Unit pickedup");
        this.#msgDisplay.innerText = "Unit pickedup";
      }
    }
    else {
      console.log("Invalid move");
      this.#msgDisplay.innerText = "Invalid move";
    }
  }

  static #pickUpUnit(input) {
    var validUnit = true;
    if (input.innerText == "O" && this.#playerTurnKeeper === 1) {
      input.innerText = "-";
      this.#player1UnitCount--;
    }
    else if (input.innerText == "X" && this.#playerTurnKeeper === 2) {
      input.innerText = "-";
      this.#player2UnitCount--;
    }
    else {
      validUnit = false;
    }
    return validUnit;
  }

  static #playerTurnUpdate() {
    if (this.#playerTurnKeeper === 1) {
      this.#playerTurnKeeper++;
    }
    else if (this.#playerTurnKeeper === 2) {
      this.#playerTurnKeeper--;
    }
    else {
      this.#playerTurnKeeper = 1;
    }
    this.#GameRoundCount++;
  }
  static #moveValidation(input) {
    var valid = true;
    if (input.innerText == "X" || input.innerText == "O") {
      valid = false;
    }
    return valid;
  }

  static #playerTurnDisplay() {
    const playerTurnElem = document.getElementById("playerTurnDisplay");
    playerTurnElem.innerText = "Player " + this.#playerTurnKeeper;
  }

  static #playerUnitCountCheck() {
    var unitLimit = false;
    if (this.#playerTurnKeeper === 1) {
      if (this.#player1UnitCount === 3) {
        unitLimit = true;
      }
    }
    else {
      if (this.#player2UnitCount === 3) {
        unitLimit = true;
      }
    }
    return unitLimit;
  }

  static #playerUnitUpdate(input) {
    if (this.#playerUnitCountCheck()) {
      console.log("limit reatched");
      this.#msgDisplay.innerText = "limit reatched";
    }
    else {
      if (this.#playerTurnKeeper === 1) {
        this.#player1UnitCount++;
        input.innerText = "O";
      }
      else {
        this.#player2UnitCount++;
        input.innerText = "X"
      }
    }
  }

  static #winCheck() {
    var gameOver = false;
    const gameBoardSpaces = ["Unused index0"];
    var indexStr
    for (var i = 1; i < 10; i++) {
      indexStr = "#box" + i;
      const gameBoardSpace = document.querySelector(indexStr)//document.getElementById(indexStr);
      gameBoardSpaces.push(gameBoardSpace.innerHTML + "");
    }
    if (this.#playerTurnKeeper === 1) {
      const O = "O";
      if (gameBoardSpaces[1] === O && gameBoardSpaces[4] === O && gameBoardSpaces[7] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[2] === O && gameBoardSpaces[5] === O && gameBoardSpaces[8] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[3] === O && gameBoardSpaces[6] === O && gameBoardSpaces[9] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[1] === O && gameBoardSpaces[5] === O && gameBoardSpaces[9] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[3] === O && gameBoardSpaces[5] === O && gameBoardSpaces[7] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[1] === O && gameBoardSpaces[2] === O && gameBoardSpaces[3] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[4] === O && gameBoardSpaces[5] === O && gameBoardSpaces[6] === O) {
        gameOver = true
      }
      else if (gameBoardSpaces[7] === O && gameBoardSpaces[8] === O && gameBoardSpaces[9] === O) {
        gameOver = true
      }
    }
    else {
      const X = "X";
      if (gameBoardSpaces[1] === X && gameBoardSpaces[4] === X && gameBoardSpaces[7] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[2] === X && gameBoardSpaces[5] === X && gameBoardSpaces[8] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[3] === X && gameBoardSpaces[6] === X && gameBoardSpaces[9] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[1] === X && gameBoardSpaces[5] === X && gameBoardSpaces[9] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[3] === X && gameBoardSpaces[5] === X && gameBoardSpaces[7] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[1] === X && gameBoardSpaces[2] === X && gameBoardSpaces[3] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[4] === X && gameBoardSpaces[5] === X && gameBoardSpaces[6] === X) {
        gameOver = true
      }
      else if (gameBoardSpaces[7] === X && gameBoardSpaces[8] === X && gameBoardSpaces[9] === X) {
        gameOver = true
      }
    }
    return gameOver;
  }

  static #createMatchHistory() {
    this.#msgDisplay.innerText = "Game Over";
    console.log("gameOver");
    if (this.#GameRoundCount % 2 === 1) {
      const matchWonP1 = {
        opponent: this.#player2.userName,
        result: "Win",
        turnCount: this.#GameRoundCount
      }
      const matchLostP2 = {
        opponent: this.#player1.userName,
        result: "Lost",
        turnCount: this.#GameRoundCount
      }
      this.#player1.matchHistory.push(matchWonP1);
      this.#player1.score += 3;
      this.#player2.matchHistory.push(matchLostP2);
      this.#player2.score += 1;
    }
    else {
      const matchWonP2 = {
        opponent: this.#player1.userName,
        result: "Win"
      }
      const matchLostP1 = {
        opponent: this.#player2.userName,
        result: "Lost"
      }
      this.#player1.matchHistory.push(matchWonP2);
      this.#player1.score += 1;
      this.#player2.matchHistory.push(matchLostP1);
      this.#player2.score += 3;
    }
  }
  static reset() {
    this.#player1UnitCount = 0;
    this.#player2UnitCount = 0;
    this.#playerTurnKeeper = 1;
    this.#GameRoundCount = 1;
  }

  static #getPlayerData() {
    //const userData = getJsonData();
  }
}
