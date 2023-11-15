class GameBoardGeneration {
  static #idIndex;

  static generateGameBoard() {
    this.#idIndex = 1;
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
  static gameLoad() {
    this.#getPlayerData();
  }

  static gameStart() {
    this.#playerTurnDisplay();
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
    console.log("Game Over")
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

function createPlayerOptions() {
  const player1Select = document.getElementById("player1");
  const player2Select = document.getElementById("player2");
  for (var i = 0; i < GameLogic.playerList.length; i++) {
    const newPlayer1 = document.createElement("option");
    newPlayer1.setAttribute("value", i + 1);
    newPlayer1.innerText = GameLogic.playerList[i].userName;
    player1Select.appendChild(newPlayer1);
  }
  for (var i = 0; i < GameLogic.playerList.length; i++) {
    const newPlayer2 = document.createElement("option");
    newPlayer2.setAttribute("value", i + 1);
    newPlayer2.innerText = GameLogic.playerList[i].userName;
    player2Select.appendChild(newPlayer2);
  }
}

function main() {
  GameBoardGeneration.generateGameBoard();
  GameLogic.gameLoad();
  createPlayerOptions()

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function (event) {
    resetGameBoard();
    GameLogic.reset();
    GameLogic.gameStart();
  })

  const gameBoard = document.getElementById("game");
  gameBoard.addEventListener("click", function (event) {
    GameLogic.playerMove(event.target);
  })
}
main();