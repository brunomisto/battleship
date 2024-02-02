class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player1.turn = true;
    this.currentPlayer = player1;

    this.player2 = player2;
    this.player2.turn = false;
  }

  playRound() {
    this.player1.turn = !this.player1.turn;
    this.player2.turn = !this.player2.turn;
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  get isOver() {
    return this.player1.gameBoard.isAllSunk || this.player2.gameBoard.isAllSunk;
  }
}

export default Game;
