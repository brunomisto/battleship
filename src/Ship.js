class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.isSunk) return;
    this.hits += 1;
  }

  get isSunk() {
    return this.length === this.hits;
  }
}

export default Ship;
