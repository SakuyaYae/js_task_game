class GameBoardGeneration {
  static #idIndex = 0;

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
    newTd.innerText = "====";
    newTd.id = this.#idIndex;
    this.#idIndex++;
    return newTd;
  }
}

class GameLogic {
  static #playerTurnKeeper = 1;
  static gameStart() {
    this.#playerTurn();
  }
  static playerMove(input) {
    this.#playerTurnUpdate();
    this.#playerTurn();
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
  }

  static #playerTurn() {
    const playerTurnElem = document.getElementById("playerTurnDisplay");
    playerTurnElem.innerText = "Player " + this.#playerTurnKeeper;
  }
}

function main() {
  GameBoardGeneration.generateGameBoard();
  GameLogic.gameStart();
}
main();