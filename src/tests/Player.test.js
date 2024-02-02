/* eslint-disable no-undef */
import Ship from "../Ship";
import Player from "../Player";
import Gameboard from "../Gameboard";

let player;
let enemy;
beforeEach(() => {
  player = new Player("foo", new Gameboard());
  enemy = new Player("enemy", new Gameboard());
});

test("players are being created", () => {
  expect(player.name).toEqual("foo");
});

test("player can attack enemy", () => {
  enemy.gameBoard.placeShip(new Ship(1), 0, 0, "row");
  player.turn = true;
  player.attack(enemy, 0, 0);
  expect(enemy.gameBoard.isAllSunk).toBe(true);
});

test("computers can randomly attack", () => {
  enemy = new Player("computer", new Gameboard(), true);
  enemy.turn = true;
  enemy.attack(player);
  expect(player.gameBoard.shots.length).toBe(1);
});
