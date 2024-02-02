import Game from "./Game";
import Player from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";
import initializeBoards from "./dom";

const populatePlayerBoard = (player) => {
  player.gameBoard.placeShip(new Ship(5), 0, 0, "row");
  player.gameBoard.placeShip(new Ship(4), 0, 7, "column");
  player.gameBoard.placeShip(new Ship(3), 8, 0, "row");
  player.gameBoard.placeShip(new Ship(3), 6, 0, "row");
  player.gameBoard.placeShip(new Ship(2), 5, 9, "column");
};

const player1 = new Player("bruno", new Gameboard());
const player2 = new Player("computer", new Gameboard(), true);

populatePlayerBoard(player1);
player2.gameBoard.placeShip(new Ship(1), 0, 0, "row");

const game = new Game(player1, player2);
initializeBoards(document.getElementById("boards"), game);
