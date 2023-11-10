class GameBoardGeneration {
  static #idIndex = 1;

  static generateGameBoard() {
    const tbody = document.querySelector("tbody");
    for (var i = 0; i < 3; i++) {
      tbody.appendChild(this.#createNewTR());
    }
  }

  static #createNewTR() {
    const td = [];
    for (var i = 0; i < 3; i++) {
      td.push(this.#createNewTd());
    }

    const newTr = document.createElement("tr");
    for (var i = 0; i < td.length; i++) {
      newTr.appendChild(td[i]);
    }
    return newTr;
  }

  static #createNewTd() {
    const newTd = document.createElement("td");
    newTd.innerText = "-";
    newTd.id = "box" + this.#idIndex;
    this.#idIndex++;
    return newTd;
  }
}

class GameLogic {
  static #playerTurnKeeper = 1;
  static #player1UnitCount = 0;
  static #player2UnitCount = 0;
  static #GameRoundCount = 0;

  static gameStart() {
    this.#playerTurnDisplay();
  }

  static playerMove(input) {
    if (this.#moveValidation(input)) {
      this.#playerUnitUpdate(input);
      this.#playerTurnUpdate();
      this.#playerTurnDisplay();
      this.#winCheck();
    }
    else {
      console.log("Invalid move")
    }
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

  }
}

function main() {
  GameBoardGeneration.generateGameBoard();
  GameLogic.gameStart();
  const gameBoard = document.getElementById("game");
  gameBoard.addEventListener("click", function (event) {
    GameLogic.playerMove(event.target);
  })
}
main();