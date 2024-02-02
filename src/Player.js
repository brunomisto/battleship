import Gameboard from "./Gameboard";

class Player {
  constructor(name, gameBoard, isComputer = false) {
    this.name = name;
    this.gameBoard = gameBoard;
    this.isComputer = isComputer;
    this.turn = false;
    this.randomAttacks = [];
  }

  randomAttack(player) {
    let randomRow = Math.floor(Math.random() * Gameboard.size);
    let randomCol = Math.floor(Math.random() * Gameboard.size);
    while (this.randomAttacks.includes(`${randomRow}-${randomCol}`)) {
      randomRow = Math.floor(Math.random() * Gameboard.size);
      randomCol = Math.floor(Math.random() * Gameboard.size);
    }

    player.gameBoard.receiveAttack(randomRow, randomCol);
    this.randomAttacks.push(`${randomRow}-${randomCol}`);
    return [randomRow, randomCol];
  }

  attack(player, row, column) {
    if (player === this) {
      throw new Error("Players can't attack themselves");
    }

    if (!this.turn) {
      throw new Error(`It is not ${this.name}'s turn`);
    }

    if (this.isComputer) {
      return this.randomAttack(player);
    }

    player.gameBoard.receiveAttack(row, column);
    return [row, column];
  }

  setBoardElement(boardElement) {
    this.boardElement = boardElement;
  }
}

export default Player;
