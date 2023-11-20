import { getAllUsers, addUser, getOneUser, updateUser } from "./../function/server-request.js"


export default class GameLogic {
  #gameActive = false;
  #playerCheck = true;
  #playerTurnKeeper = 1;
  #player1UnitCount = 0;
  #player2UnitCount = 0;
  #GameRoundCount = 1;
  #winner = "";
  #player1 = {
    "UserId": 1,
    "userName": "Vayle",
    "score": 0,
    "matchHistory": [],
    "id": 1
  };
  #player2 = {
    "UserId": 2,
    "userName": "Sakuya",
    "score": 0,
    "matchHistory": [],
    "id": 2
  };

  #msgDisplay = document.getElementById("msgDisplay");

  async gameLoad() {
    this.playerList = await this.getPlayerData();
  }

  gameStart() {
    this.#playerTurnDisplay();
    this.#gameActive = true;
  }

  playerMove(input) {
    if (this.#moveValidation(input)) {
      if (this.#playerUnitCountCheck()) {
        console.log("limit reatched");
        this.#msgDisplay.innerText = "limit reatched";
      }
      else {
        this.#playerUnitUpdate(input);
        if (this.#winCheck()) {
          this.#gameActive = false;
          this.#createMatchHistory();
          this.#msgDisplay.innerText = "GameOver";
        }
        else {
          this.#playerTurnUpdate();
          this.#playerTurnDisplay();
          this.#msgDisplay.innerText = "";
        }
      }
    }
    else if (this.#playerUnitCountCheck()) {
      if (!this.#pickUpUnit(input)) {
        console.log("Invalid move");
        this.#msgDisplay.innerText = "Invalid move";
      }
      else {
        console.log("Unit picked up");
        this.#msgDisplay.innerText = "Unit pickedup";
      }
    }
    else {
      console.log("Invalid move");
      this.#msgDisplay.innerText = "Invalid move";
    }
  }

  #pickUpUnit(input) {
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

  #playerTurnUpdate() {
    if (this.#playerTurnKeeper === 1) {
      this.#playerTurnKeeper++;
    }
    else if (this.#playerTurnKeeper === 2) {
      this.#playerTurnKeeper--;
      this.#GameRoundCount++;
    }
    else {
      this.#playerTurnKeeper = 1;
    }
  }
  #moveValidation(input) {
    var valid = true;
    if (input.innerText == "X" || input.innerText == "O") {
      valid = false;
    }
    return valid;
  }

  #playerTurnDisplay() {
    const playerTurnElem = document.getElementById("playerTurnDisplay");
    playerTurnElem.innerText = "Player: " + this.#playerTurnKeeper;

  }

  #playerUnitCountCheck() {
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

  #playerUnitUpdate(input) {
    if (this.#playerUnitCountCheck()) {
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

  #winCheck() {
    var gameOver = false;
    const gameBoardSpaces = ["Unused index 0"];
    var indexStr;
    for (var i = 1; i < 10; i++) {
      indexStr = "#box" + i;
      const gameBoardSpace = document.querySelector(indexStr)
      gameBoardSpaces.push(gameBoardSpace.innerHTML + "");
    }
    if (this.#playerTurnKeeper === 1) {
      const O = "O";
      if (gameBoardSpaces[1] === O && gameBoardSpaces[4] === O && gameBoardSpaces[7] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[2] === O && gameBoardSpaces[5] === O && gameBoardSpaces[8] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[3] === O && gameBoardSpaces[6] === O && gameBoardSpaces[9] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[1] === O && gameBoardSpaces[5] === O && gameBoardSpaces[9] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[3] === O && gameBoardSpaces[5] === O && gameBoardSpaces[7] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[1] === O && gameBoardSpaces[2] === O && gameBoardSpaces[3] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[4] === O && gameBoardSpaces[5] === O && gameBoardSpaces[6] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
      else if (gameBoardSpaces[7] === O && gameBoardSpaces[8] === O && gameBoardSpaces[9] === O) {
        gameOver = true;
        this.#winner = "P1";
      }
    }
    else {
      const X = "X";
      if (gameBoardSpaces[1] === X && gameBoardSpaces[4] === X && gameBoardSpaces[7] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[2] === X && gameBoardSpaces[5] === X && gameBoardSpaces[8] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[3] === X && gameBoardSpaces[6] === X && gameBoardSpaces[9] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[1] === X && gameBoardSpaces[5] === X && gameBoardSpaces[9] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[3] === X && gameBoardSpaces[5] === X && gameBoardSpaces[7] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[1] === X && gameBoardSpaces[2] === X && gameBoardSpaces[3] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[4] === X && gameBoardSpaces[5] === X && gameBoardSpaces[6] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
      else if (gameBoardSpaces[7] === X && gameBoardSpaces[8] === X && gameBoardSpaces[9] === X) {
        gameOver = true;
        this.#winner = "P2";
      }
    }
    return gameOver;
  }

  #createMatchHistory() {
    console.log("gameOver");
    if (this.#winner === "P1") {
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
        result: "Win",
        turnCount: this.#GameRoundCount
      }
      const matchLostP1 = {
        opponent: this.#player2.userName,
        result: "Lost",
        turnCount: this.#GameRoundCount
      }
      this.#player1.matchHistory.push(matchLostP1);
      this.#player1.score += 1;
      this.#player2.matchHistory.push(matchWonP2);
      this.#player2.score += 3;
    }
    this.#updatePlayer(this.#player1);
    this.#updatePlayer(this.#player2);
  }

  isRunning() {
    return this.#gameActive;
  }

  reset() {
    this.#player1UnitCount = 0;
    this.#player2UnitCount = 0;
    this.#playerTurnKeeper = 1;
    this.#GameRoundCount = 1;
    this.#winner = "";
  }

  async setPlayers(setPlayer1, setPlayer2) {
    const playerList = await this.getPlayerData();
    for (var i = 0; i < playerList.length; i++) {
      if (setPlayer1 === setPlayer2) {
        this.#playerCheck = false;
        continue;
      }
      else if (setPlayer1 == playerList[i].UserId) {
        this.#player1 = playerList[i];
      }
      else if (setPlayer2 == playerList[i].UserId) {
        this.#player2 = playerList[i];
      }
    }
  }

  checkPlayers() {
    console.log(this.#playerCheck);
    if (!this.#playerCheck) {
      this.#msgDisplay.innerText = "Same player: chose two diffrent players"
    }
    return this.#playerCheck;
  }
  async #updatePlayer(player) {
    updateUser(player);
  }

  async getPlayerData() {
    return getAllUsers();
  }
}
