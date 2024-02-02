import Game from "./Game";
import Player from "./Player";
import Ship from "./Ship";
import Gameboard from "./Gameboard";
import { initializeBoards, addListeners } from "./dom";

addListeners();

const randomizePlayerBoard = (player) => {
  player.gameBoard.placeRandomShips([
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ]);
};

const player1 = new Player("foo", new Gameboard());
const player2 = new Player("computer", new Gameboard(), true);

randomizePlayerBoard(player1);
randomizePlayerBoard(player2);

const game = new Game(player1, player2);
initializeBoards(document.getElementById("boards"), game);
