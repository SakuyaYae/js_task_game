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

  static gameStart() {
    this.#playerTurnDisplay();
    this.#getPlayerData();
  }

  static playerMove(input) {
    if (this.#moveValidation(input)) {
      this.#playerUnitUpdate(input);
      this.#playerTurnUpdate();
      this.#playerTurnDisplay();
      if (this.#winCheck()) {
        this.#createMatchHistory();
      }
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
    return gameOver;
  }

  static #createMatchHistory() {
    if (this.#GameRoundCount % 2 === 1) {
      const matchWonP1 = {
        opponent: this.#player2.userName,
        result: "Win"
      }
      const matchLostP2 = {
        opponent: this.#player1.userName,
        result: "Lost"
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
  static #getPlayerData() {
    const userData = getJsonData();
  }
}

async function getJsonData() {
  const requestURL = "./json/users.json"
  const request = new Request(requestURL, {
    mode: "no-cors"
  });
  const response = await fetch(request);
  const userData = response;
  console.log(userData);
  return userData;
}

function resetGameBoard() {
  document.querySelector("tbody").innerHTML = "";
  GameBoardGeneration.generateGameBoard();
}

function main() {
  GameBoardGeneration.generateGameBoard();

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function (event) {
    resetGameBoard()
    GameLogic.gameStart();
  })

  const gameBoard = document.getElementById("game");
  gameBoard.addEventListener("click", function (event) {
    GameLogic.playerMove(event.target);
  })
}
main();