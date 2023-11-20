import GameBoardGeneration from "./classes/gameBoard.js";
import gameLogic from "./classes/gameLogic.js";

const GameLogic = new gameLogic();
function resetGameBoard() {
  document.querySelector("tbody").innerHTML = "";
  GameBoardGeneration.generateGameBoard();
}

async function createPlayerOptions() {
  const player1Select = document.getElementById("player1");
  const player2Select = document.getElementById("player2");
  const playerList = await GameLogic.getPlayerData();
  for (var i = 0; i < playerList.length; i++) {
    const newPlayer1 = document.createElement("option");
    newPlayer1.setAttribute("value", i + 1);
    newPlayer1.innerText = playerList[i].userName;
    player1Select.appendChild(newPlayer1);
  }
  for (var i = 0; i < playerList.length; i++) {
    const newPlayer2 = document.createElement("option");
    newPlayer2.setAttribute("value", i + 1);
    newPlayer2.innerText = playerList[i].userName;
    player2Select.appendChild(newPlayer2);
  }
}

function main() {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  GameBoardGeneration.generateGameBoard();
  GameLogic.gameLoad();
  createPlayerOptions();

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function (event) {
    resetGameBoard();
    GameLogic.reset();
    GameLogic.setPlayers(player1.value, player2.value)
    if (GameLogic.checkPlayers()) {
      GameLogic.gameStart();
    }
  });

  const gameBoard = document.getElementById("game");
  gameBoard.addEventListener("click", function (event) {
    if (GameLogic.isRunning()) {
      GameLogic.playerMove(event.target);
    }
  });

}
main();