import GameBoardGeneration from "./classes/gameBoard.js";
import GameLogic from "./classes/gameLogic.js";

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
  createPlayerOptions();

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function (event) {
    resetGameBoard();
    GameLogic.reset();
    GameLogic.gameStart();
  });

  const gameBoard = document.getElementById("game");
  gameBoard.addEventListener("click", function (event) {
    if (GameLogic.isRunning()) {
      GameLogic.playerMove(event.target);
    }
  });

}
main();