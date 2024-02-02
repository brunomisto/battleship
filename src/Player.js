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
  }

  attack(player, row, column) {
    if (!this.turn) {
      throw new Error(`It is not ${player.name}'s turn`);
    }

    if (this.isComputer) {
      this.randomAttack(player);
      return;
    }

    player.gameBoard.receiveAttack(row, column);
  }
}

export default Player;
