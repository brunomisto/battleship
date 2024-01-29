/* eslint-disable no-undef */
import Ship from "../Ship";

let ship;
beforeEach(() => {
  ship = new Ship(3);
});

test("hits are being counted", () => {
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("ships are sinking", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBe(true);
});
