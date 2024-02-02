/* eslint-disable no-undef */
import Game from "../Game";
import Ship from "../Ship";
import Player from "../Player";
import Gameboard from "../Gameboard";

let game;
beforeEach(() => {
  const player1 = new Player("foo", new Gameboard());
  player1.gameBoard.placeShip(new Ship(1), 0, 0, "row");

  const player2 = new Player("bar", new Gameboard());
  player2.gameBoard.placeShip(new Ship(5), 0, 0, "row");
  player2.gameBoard.placeShip(new Ship(4), 0, 7, "column");
  player2.gameBoard.placeShip(new Ship(3), 8, 0, "row");
  player2.gameBoard.placeShip(new Ship(3), 6, 0, "row");
  player2.gameBoard.placeShip(new Ship(2), 5, 9, "column");

  game = new Game(player1, player2);
});

test("games initialize correctly", () => {
  expect(game.player1.turn).toBe(true);
  expect(game.player2.turn).toBe(false);
});

test("rounds switch turns", () => {
  game.playRound();
  expect(game.player1.turn).toBe(false);
  expect(game.player2.turn).toBe(true);
});

test("current player is correct", () => {
  game.playRound();
  expect(game.currentPlayer).toBe(game.player2);
});

test("output correctly when is over", () => {
  game.playRound();
  game.currentPlayer.attack(game.player1, 0, 0);
  expect(game.isOver).toBe(true);
});
