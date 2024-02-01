/* eslint-disable no-undef */
import Gameboard from "../Gameboard";
import Ship from "../Ship";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("ships are being placed", () => {
  gameboard.placeShip(new Ship(3), 0, 0, "column");
  expect(gameboard.at(2, 0)).toBeInstanceOf(Ship);
});

describe("invalid ships position throw error", () => {
  test("ship surpass board", () => {
    expect(() => {
      gameboard.placeShip(new Ship(4), 9, 0, "column");
    }).toThrow("Ship surpasses board");
  });

  test("invalid direction name", () => {
    expect(() => {
      gameboard.placeShip(new Ship(4), 9, 0, "doritos");
    }).toThrow("Invalid direction");
  });

  test("ship overlapping", () => {
    gameboard.placeShip(new Ship(4), 9, 0, "row");
    expect(() => {
      gameboard.placeShip(new Ship(4), 9, 0, "row");
    }).toThrow("Ship overlapping");
  });
});

test("ships receive attacks", () => {
  const ship = new Ship(3);
  gameboard.placeShip(ship, 0, 0, "row");
  gameboard.receiveAttack(0, 1);
  expect(ship.hits).toBe(1);
});

test("can't shot the same place twice", () => {
  const ship = new Ship(3);
  gameboard.placeShip(ship, 0, 0, "row");
  gameboard.receiveAttack(0, 1);
  expect(() => {
    gameboard.receiveAttack(0, 1);
  }).toThrow("Can't shot the same place twice");
});

test("reporting all ships sunk", () => {
  gameboard.placeShip(new Ship(1), 0, 0, "row");
  gameboard.placeShip(new Ship(2), 1, 0, "row");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.isAllSunk).toBe(true);
});
