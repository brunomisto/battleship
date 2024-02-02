/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Game {\n  constructor(player1, player2) {\n    this.player1 = player1;\n    this.player1.turn = true;\n    this.currentPlayer = player1;\n\n    this.player2 = player2;\n    this.player2.turn = false;\n  }\n\n  playRound() {\n    this.player1.turn = !this.player1.turn;\n    this.player2.turn = !this.player2.turn;\n    if (this.currentPlayer === this.player1) {\n      this.currentPlayer = this.player2;\n    } else {\n      this.currentPlayer = this.player1;\n    }\n  }\n\n  get isOver() {\n    return this.player1.gameBoard.isAllSunk || this.player2.gameBoard.isAllSunk;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://battleship/./src/Game.js?");

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Gameboard {\n  static size = 10;\n\n  static getEmptyBlocks() {\n    const blocks = [];\n    for (let i = 0; i < Gameboard.size; i += 1) {\n      const row = [];\n      for (let j = 0; j < Gameboard.size; j += 1) {\n        row.push(null);\n      }\n      blocks.push(row);\n    }\n    return blocks;\n  }\n\n  constructor() {\n    this.blocks = Gameboard.getEmptyBlocks();\n    this.ships = [];\n    this.shots = [];\n  }\n\n  at(row, column) {\n    return this.blocks[row][column];\n  }\n\n  checkPlaceShipValidity(ship, row, column, direction) {\n    if (![\"row\", \"column\"].includes(direction)) {\n      throw new Error(\"Invalid direction\");\n    }\n\n    if (\n      (direction === \"row\" && column + ship.length > Gameboard.size) ||\n      (direction === \"column\" && row + ship.length > Gameboard.size)\n    ) {\n      throw new Error(\"Ship surpasses board\");\n    }\n\n    for (let i = 0; i < ship.length; i += 1) {\n      if (direction === \"row\") {\n        if (this.blocks[row][column + i]) {\n          throw new Error(\"Ship overlapping\");\n        }\n      }\n      if (direction === \"column\") {\n        if (this.blocks[row + i][column]) {\n          throw new Error(\"Ship overlapping\");\n        }\n      }\n    }\n  }\n\n  placeShip(ship, row, column, direction) {\n    this.checkPlaceShipValidity(ship, row, column, direction);\n    for (let i = 0; i < ship.length; i += 1) {\n      if (direction === \"row\") {\n        this.blocks[row][column + i] = ship;\n      }\n      if (direction === \"column\") {\n        this.blocks[row + i][column] = ship;\n      }\n    }\n    this.ships.push(ship);\n  }\n\n  receiveAttack(row, column) {\n    if (this.shots.includes(`${row}-${column}`)) {\n      throw new Error(\"Can't shot the same place twice\");\n    }\n\n    const ship = this.at(row, column);\n    if (ship !== null) {\n      ship.hit();\n    }\n\n    this.shots.push(`${row}-${column}`);\n  }\n\n  get isAllSunk() {\n    if (this.ships.length === 0) {\n      throw new Error(\"No ships in the board\");\n    }\n\n    for (let i = 0; i < this.ships.length; i += 1) {\n      if (!this.ships[i].isSunk) {\n        return false;\n      }\n    }\n    return true;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/Gameboard.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n\n\nclass Player {\n  constructor(name, gameBoard, isComputer = false) {\n    this.name = name;\n    this.gameBoard = gameBoard;\n    this.isComputer = isComputer;\n    this.turn = false;\n    this.randomAttacks = [];\n  }\n\n  randomAttack(player) {\n    let randomRow = Math.floor(Math.random() * _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size);\n    let randomCol = Math.floor(Math.random() * _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size);\n    while (this.randomAttacks.includes(`${randomRow}-${randomCol}`)) {\n      randomRow = Math.floor(Math.random() * _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size);\n      randomCol = Math.floor(Math.random() * _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size);\n    }\n\n    player.gameBoard.receiveAttack(randomRow, randomCol);\n    this.randomAttacks.push(`${randomRow}-${randomCol}`);\n    return [randomRow, randomCol];\n  }\n\n  attack(player, row, column) {\n    if (player === this) {\n      throw new Error(\"Players can't attack themselves\");\n    }\n\n    if (!this.turn) {\n      throw new Error(`It is not ${this.name}'s turn`);\n    }\n\n    if (this.isComputer) {\n      return this.randomAttack(player);\n    }\n\n    player.gameBoard.receiveAttack(row, column);\n    return [row, column];\n  }\n\n  setBoardElement(boardElement) {\n    this.boardElement = boardElement;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/Player.js?");

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n  }\n\n  hit() {\n    if (this.isSunk) return;\n    this.hits += 1;\n  }\n\n  get isSunk() {\n    return this.length === this.hits;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/Ship.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n// import Ship from \"./Ship\";\n\n\nconst log = (message) => {\n  document.getElementById(\"log\").innerText = message;\n};\n\nconst setBlockElementShot = (player, boardElement, [row, column]) => {\n  const block = player.gameBoard.at(row, column);\n  const blockElementIndex = row * _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size + column;\n  const blockElements = [\n    ...boardElement.querySelector(\".content\").querySelectorAll(\".block\"),\n  ];\n  if (!block) {\n    blockElements[blockElementIndex].classList.add(\"miss\");\n  } else {\n    blockElements[blockElementIndex].classList.add(\"shot\");\n  }\n};\n\nconst createBlockElement = (player, game, row, column) => {\n  const blockElement = document.createElement(\"div\");\n  blockElement.className = \"block\";\n\n  if (!player.isComputer && player.gameBoard.at(row, column) !== null) {\n    blockElement.classList.add(\"ship\");\n  }\n\n  blockElement.addEventListener(\"click\", () => {\n    try {\n      if (game.isOver) {\n        log(`${game.currentPlayer.name} already won`);\n        return;\n      }\n\n      const attacker = game.currentPlayer;\n      setBlockElementShot(\n        player,\n        player.boardElement,\n        attacker.attack(player, row, column),\n      );\n      log(`${attacker.name} attacks ${player.name}`);\n\n      if (game.isOver) {\n        log(`${game.currentPlayer.name} won!`);\n        return;\n      }\n\n      game.playRound();\n      log(`${game.currentPlayer.name}'s turn`);\n\n      if (game.currentPlayer.isComputer) {\n        setBlockElementShot(\n          attacker,\n          attacker.boardElement,\n          game.currentPlayer.attack(attacker),\n        );\n\n        log(`${game.currentPlayer.name} attacks ${attacker.name}`);\n        if (game.isOver) {\n          log(`${game.currentPlayer.name} won!`);\n          return;\n        }\n\n        game.playRound();\n        log(`${game.currentPlayer.name}'s turn`);\n      }\n    } catch (error) {\n      log(error);\n    }\n  });\n\n  return blockElement;\n};\n\nconst createBoardElement = (player, game) => {\n  if (player === game.currentPlayer) {\n    log(`${game.currentPlayer.name}'s turn`);\n  }\n\n  const boardElement = document.createElement(\"div\");\n  boardElement.className = \"board\";\n\n  const playerNameElement = document.createElement(\"h2\");\n  playerNameElement.className = \"name\";\n\n  const boardContentElement = document.createElement(\"div\");\n  boardContentElement.className = \"content\";\n\n  for (let i = 0; i < _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size; i += 1) {\n    const rowElement = document.createElement(\"div\");\n    rowElement.className = \"row\";\n    for (let j = 0; j < _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size; j += 1) {\n      rowElement.appendChild(createBlockElement(player, game, i, j));\n    }\n    boardContentElement.appendChild(rowElement);\n  }\n\n  boardElement.appendChild(playerNameElement);\n  boardElement.appendChild(boardContentElement);\n  return boardElement;\n};\n\nconst initializeBoards = (boardsElement, game) => {\n  game.player1.setBoardElement(createBoardElement(game.player1, game));\n  game.player2.setBoardElement(createBoardElement(game.player2, game));\n\n  boardsElement.appendChild(game.player1.boardElement);\n  boardsElement.appendChild(game.player2.boardElement);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeBoards);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\n\nconst populatePlayerBoard = (player) => {\n  player.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](5), 0, 0, \"row\");\n  player.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4), 0, 7, \"column\");\n  player.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3), 8, 0, \"row\");\n  player.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3), 6, 0, \"row\");\n  player.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2), 5, 9, \"column\");\n};\n\nconst player1 = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"bruno\", new _Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]());\nconst player2 = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"computer\", new _Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](), true);\n\npopulatePlayerBoard(player1);\nplayer2.gameBoard.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1), 0, 0, \"row\");\n\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player1, player2);\n(0,_dom__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(document.getElementById(\"boards\"), game);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;