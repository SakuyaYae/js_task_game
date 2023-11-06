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

function main() {
  GameBoardGeneration.generateGameBoard();
}
main();