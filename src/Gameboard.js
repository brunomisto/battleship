class Gameboard {
  static size = 10;

  static getEmptyBlocks() {
    const blocks = [];
    for (let i = 0; i < Gameboard.size; i += 1) {
      const row = [];
      for (let j = 0; j < Gameboard.size; j += 1) {
        row.push(null);
      }
      blocks.push(row);
    }
    return blocks;
  }

  constructor() {
    this.blocks = Gameboard.getEmptyBlocks();
    this.ships = [];
    this.shots = [];
  }

  at(row, column) {
    return this.blocks[row][column];
  }

  checkPlaceShipValidity(ship, row, column, direction) {
    if (!["row", "column"].includes(direction)) {
      throw new Error("Invalid direction");
    }

    if (
      (direction === "row" && column + ship.length > Gameboard.size) ||
      (direction === "column" && row + ship.length > Gameboard.size)
    ) {
      throw new Error("Ship surpasses board");
    }

    for (let i = 0; i < ship.length; i += 1) {
      if (direction === "row") {
        if (this.blocks[row][column + i]) {
          throw new Error("Ship overlapping");
        }
      }
      if (direction === "column") {
        if (this.blocks[row + i][column]) {
          throw new Error("Ship overlapping");
        }
      }
    }
  }

  placeShip(ship, row, column, direction) {
    this.checkPlaceShipValidity(ship, row, column, direction);
    for (let i = 0; i < ship.length; i += 1) {
      if (direction === "row") {
        this.blocks[row][column + i] = ship;
      }
      if (direction === "column") {
        this.blocks[row + i][column] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(row, column) {
    if (this.shots.includes(`${row}-${column}`)) {
      throw new Error("Can't shot the same place twice");
    }

    const ship = this.at(row, column);
    if (ship !== null) {
      ship.hit();
    }

    this.shots.push(`${row}-${column}`);
  }

  get isAllSunk() {
    if (this.ships.length === 0) {
      throw new Error("No ships in the board");
    }

    if (this.ships.length === 1) {
      return this.ships[0].isSunk;
    }

    return this.ships.reduce(
      (previous, current) => previous.isSunk && current.isSunk,
    );
  }
}

export default Gameboard;
