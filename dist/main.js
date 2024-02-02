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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Gameboard {\n  static size = 10;\n\n  static getEmptyBlocks() {\n    const blocks = [];\n    for (let i = 0; i < Gameboard.size; i += 1) {\n      const row = [];\n      for (let j = 0; j < Gameboard.size; j += 1) {\n        row.push(null);\n      }\n      blocks.push(row);\n    }\n    return blocks;\n  }\n\n  static getRandomDirection() {\n    return Math.floor(Math.random() * 2) === 0 ? \"row\" : \"column\";\n  }\n\n  constructor() {\n    this.blocks = Gameboard.getEmptyBlocks();\n    this.ships = [];\n    this.shots = [];\n  }\n\n  at(row, column) {\n    return this.blocks[row][column];\n  }\n\n  checkPlaceShipValidity(ship, row, column, direction) {\n    if (![\"row\", \"column\"].includes(direction)) {\n      throw new Error(\"Invalid direction\");\n    }\n\n    if (\n      (direction === \"row\" && column + ship.length > Gameboard.size) ||\n      (direction === \"column\" && row + ship.length > Gameboard.size)\n    ) {\n      throw new Error(\"Ship surpasses board\");\n    }\n\n    for (let i = 0; i < ship.length; i += 1) {\n      if (direction === \"row\") {\n        if (this.blocks[row][column + i]) {\n          throw new Error(\"Ship overlapping\");\n        }\n      }\n      if (direction === \"column\") {\n        if (this.blocks[row + i][column]) {\n          throw new Error(\"Ship overlapping\");\n        }\n      }\n    }\n  }\n\n  placeShip(ship, row, column, direction) {\n    this.checkPlaceShipValidity(ship, row, column, direction);\n    for (let i = 0; i < ship.length; i += 1) {\n      if (direction === \"row\") {\n        this.blocks[row][column + i] = ship;\n      }\n      if (direction === \"column\") {\n        this.blocks[row + i][column] = ship;\n      }\n    }\n    this.ships.push(ship);\n  }\n\n  receiveAttack(row, column) {\n    if (this.shots.includes(`${row}-${column}`)) {\n      throw new Error(\"Can't shot the same place twice\");\n    }\n\n    const ship = this.at(row, column);\n    if (ship !== null) {\n      ship.hit();\n    }\n\n    this.shots.push(`${row}-${column}`);\n  }\n\n  placeRandomShips(ships) {\n    const placeRandomShip = (ship) => {\n      const randomRow = Math.floor(Math.random() * Gameboard.size);\n      const randomColumn = Math.floor(Math.random() * Gameboard.size);\n      const randomDirection = Gameboard.getRandomDirection();\n      try {\n        this.placeShip(ship, randomRow, randomColumn, randomDirection);\n      } catch {\n        placeRandomShip(ship);\n      }\n    };\n\n    ships.forEach((ship) => {\n      placeRandomShip(ship);\n    });\n  }\n\n  get isAllSunk() {\n    if (this.ships.length === 0) {\n      return true;\n    }\n\n    for (let i = 0; i < this.ships.length; i += 1) {\n      if (!this.ships[i].isSunk) {\n        return false;\n      }\n    }\n    return true;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/Gameboard.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addListeners: () => (/* binding */ addListeners),\n/* harmony export */   initializeBoards: () => (/* binding */ initializeBoards),\n/* harmony export */   showNewGameDialog: () => (/* binding */ showNewGameDialog)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n// import Ship from \"./Ship\";\n\n\n\n\n\nconst log = (message) => {\n  document.getElementById(\"log\").innerText = message;\n};\n\nconst setBlockElementShot = (player, boardElement, [row, column]) => {\n  const block = player.gameBoard.at(row, column);\n  const blockElementIndex = row * _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size + column;\n  const blockElements = [\n    ...boardElement.querySelector(\".content\").querySelectorAll(\".block\"),\n  ];\n  if (!block) {\n    blockElements[blockElementIndex].classList.add(\"miss\");\n  } else {\n    blockElements[blockElementIndex].classList.add(\"shot\");\n  }\n};\n\nconst createBlockElement = (player, game, row, column) => {\n  const blockElement = document.createElement(\"div\");\n  blockElement.className = \"block\";\n\n  if (!player.isComputer && player.gameBoard.at(row, column) !== null) {\n    blockElement.classList.add(\"ship\");\n  }\n\n  blockElement.addEventListener(\"click\", () => {\n    try {\n      if (game.isOver) {\n        log(`${game.currentPlayer.name} already won`);\n        return;\n      }\n\n      const attacker = game.currentPlayer;\n      setBlockElementShot(\n        player,\n        player.boardElement,\n        attacker.attack(player, row, column),\n      );\n      log(`${attacker.name} attacks ${player.name}`);\n\n      if (game.isOver) {\n        log(`${game.currentPlayer.name} won!`);\n        return;\n      }\n\n      game.playRound();\n      log(`${game.currentPlayer.name}'s turn`);\n\n      if (game.currentPlayer.isComputer) {\n        setBlockElementShot(\n          attacker,\n          attacker.boardElement,\n          game.currentPlayer.attack(attacker),\n        );\n\n        log(`${game.currentPlayer.name} attacks ${attacker.name}`);\n        if (game.isOver) {\n          log(`${game.currentPlayer.name} won!`);\n          return;\n        }\n\n        game.playRound();\n        log(`${game.currentPlayer.name}'s turn`);\n      }\n    } catch (error) {\n      log(error);\n    }\n  });\n\n  return blockElement;\n};\n\nconst createBoardElement = (player, game) => {\n  if (player === game.currentPlayer) {\n    log(`${game.currentPlayer.name}'s turn`);\n  }\n\n  const boardElement = document.createElement(\"div\");\n  boardElement.className = \"board\";\n\n  const playerNameElement = document.createElement(\"h2\");\n  playerNameElement.textContent = `${player.name}'s board`;\n  playerNameElement.className = \"name\";\n\n  const boardContentElement = document.createElement(\"div\");\n  boardContentElement.className = \"content\";\n\n  for (let i = 0; i < _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size; i += 1) {\n    const rowElement = document.createElement(\"div\");\n    rowElement.className = \"row\";\n    for (let j = 0; j < _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size; j += 1) {\n      rowElement.appendChild(createBlockElement(player, game, i, j));\n    }\n    boardContentElement.appendChild(rowElement);\n  }\n\n  boardElement.appendChild(playerNameElement);\n  boardElement.appendChild(boardContentElement);\n  return boardElement;\n};\n\nconst initializeBoards = (boardsElement, game) => {\n  game.player1.setBoardElement(createBoardElement(game.player1, game));\n  game.player2.setBoardElement(createBoardElement(game.player2, game));\n\n  boardsElement.appendChild(game.player1.boardElement);\n  boardsElement.appendChild(game.player2.boardElement);\n};\n\nconst createBoardCreation = () => {\n  const boardCreationElement = document.createElement(\"div\");\n  boardCreationElement.className = \"board-creation\";\n\n  const boardContentElement = document.createElement(\"div\");\n  boardContentElement.className = \"content\";\n\n  const availableShips = [\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2),\n  ];\n  let selectedShip = null;\n  let selectedDirection = \"row\";\n  const gameBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n  const shipsListElement = document.createElement(\"ul\");\n  shipsListElement.className = \"ships-list\";\n\n  const changeDirectionButton = document.createElement(\"button\");\n  changeDirectionButton.innerText = \"Change direction\";\n  changeDirectionButton.addEventListener(\"click\", (event) => {\n    event.preventDefault();\n    switch (selectedDirection) {\n      case \"row\":\n        selectedDirection = \"column\";\n        break;\n      case \"column\":\n        selectedDirection = \"row\";\n        break;\n      default:\n        throw new Error(\"Invalid direction\");\n    }\n  });\n\n  const updateShipsListElement = () => {\n    shipsListElement.innerHTML = \"\";\n\n    availableShips.forEach((ship) => {\n      const shipElement = document.createElement(\"li\");\n      shipElement.className = \"ship-creation\";\n      if (ship === selectedShip) {\n        shipElement.classList.add(\"selected\");\n      }\n      shipElement.innerText = `${ship.length} blocks ship`;\n      shipElement.addEventListener(\"click\", () => {\n        selectedShip = ship;\n        updateShipsListElement();\n      });\n      shipsListElement.appendChild(shipElement);\n    });\n  };\n  updateShipsListElement();\n\n  const createCreationBlockElement = (row, column) => {\n    const clearBlocks = (blockElements) => {\n      blockElements.forEach((block) => {\n        block.classList.remove(\"selected\");\n      });\n    };\n\n    const placeShip = () => {\n      if (!selectedShip) return;\n      const blocks = [...boardContentElement.querySelectorAll(\".block\")];\n      try {\n        // Place ship in gameboard object\n        gameBoard.placeShip(selectedShip, row, column, selectedDirection);\n\n        // Place ship in gameboard element\n        const initialIndex = row * _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size + column;\n        for (let i = 0; i < selectedShip.length; i += 1) {\n          if (selectedDirection === \"row\") {\n            blocks[initialIndex + i].classList.add(\"ship\");\n          }\n          if (selectedDirection === \"column\") {\n            blocks[initialIndex + _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size * i].classList.add(\"ship\");\n          }\n        }\n\n        // Remove from available ships array\n        const removeIndex = availableShips.findIndex(\n          (ship) => ship === selectedShip,\n        );\n        availableShips.splice(removeIndex, 1);\n\n        // Update available ships list element and unselect ship\n        updateShipsListElement();\n        selectedShip = null;\n      } catch {\n        clearBlocks(blocks);\n      }\n    };\n\n    const blockElement = document.createElement(\"div\");\n    blockElement.className = \"block\";\n\n    blockElement.addEventListener(\"mouseover\", () => {\n      const blocks = [...boardContentElement.querySelectorAll(\".block\")];\n      clearBlocks(blocks);\n\n      if (!selectedShip) return;\n      try {\n        gameBoard.checkPlaceShipValidity(\n          selectedShip,\n          row,\n          column,\n          selectedDirection,\n        );\n\n        // Show ship in board\n        const initialIndex = row * _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size + column;\n        for (let i = 0; i < selectedShip.length; i += 1) {\n          if (selectedDirection === \"row\") {\n            blocks[initialIndex + i].classList.add(\"selected\");\n          }\n          if (selectedDirection === \"column\") {\n            blocks[initialIndex + _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size * i].classList.add(\"selected\");\n          }\n        }\n      } catch (error) {\n        clearBlocks(blocks);\n      }\n    });\n\n    blockElement.addEventListener(\"mouseout\", () => {\n      const blocks = [...boardContentElement.querySelectorAll(\".block\")];\n      clearBlocks(blocks);\n    });\n\n    blockElement.addEventListener(\"click\", placeShip);\n    return blockElement;\n  };\n\n  for (let i = 0; i < _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size; i += 1) {\n    const rowElement = document.createElement(\"div\");\n    rowElement.className = \"row\";\n    for (let j = 0; j < _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"].size; j += 1) {\n      rowElement.appendChild(createCreationBlockElement(i, j));\n    }\n    boardContentElement.appendChild(rowElement);\n  }\n  boardCreationElement.appendChild(boardContentElement);\n  boardCreationElement.appendChild(shipsListElement);\n  boardCreationElement.appendChild(changeDirectionButton);\n\n  return [gameBoard, boardCreationElement];\n};\n\nconst showNewGameDialog = () => {\n  const dialog = document.getElementById(\"dialog\");\n  dialog.innerHTML = \"\";\n\n  const form = document.createElement(\"form\");\n\n  const playerNameLabel = document.createElement(\"label\");\n  playerNameLabel.innerText = \"Player name\";\n  const playerNameInput = document.createElement(\"input\");\n  playerNameInput.required = true;\n  playerNameLabel.appendChild(playerNameInput);\n  const [playerGameBoard, playerGameBoardElement] = createBoardCreation();\n\n  const computerNameLabel = document.createElement(\"label\");\n  computerNameLabel.innerText = \"Computer name\";\n  const computerNameInput = document.createElement(\"input\");\n  computerNameInput.required = true;\n  computerNameLabel.appendChild(computerNameInput);\n\n  const submitButton = document.createElement(\"button\");\n  submitButton.type = \"submit\";\n  submitButton.innerText = \"New game\";\n\n  form.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n\n    if (playerGameBoard.ships.length !== 5) {\n      log(\"you need to place all your ships first\");\n      return;\n    }\n\n    const player1 = new _Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](playerNameInput.value, playerGameBoard);\n    const player2 = new _Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](computerNameInput.value, new _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), true);\n    player2.gameBoard.placeRandomShips([\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3),\n      new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2),\n    ]);\n    const game = new _Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"](player1, player2);\n\n    // Clear boards\n    document.getElementById(\"boards\").innerHTML = \"\";\n\n    initializeBoards(document.getElementById(\"boards\"), game);\n\n    dialog.close();\n  });\n\n  form.appendChild(playerNameLabel);\n  form.appendChild(playerGameBoardElement);\n  form.appendChild(computerNameLabel);\n  form.appendChild(submitButton);\n\n  dialog.appendChild(form);\n  dialog.showModal();\n};\n\nconst addListeners = () => {\n  const newGameButton = document.getElementById(\"new-game\");\n  newGameButton.addEventListener(\"click\", () => {\n    showNewGameDialog();\n  });\n};\n\n\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\n\n(0,_dom__WEBPACK_IMPORTED_MODULE_4__.addListeners)();\n\nconst randomizePlayerBoard = (player) => {\n  player.gameBoard.placeRandomShips([\n    new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](5),\n    new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](4),\n    new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\n    new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2),\n  ]);\n};\n\nconst player1 = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"foo\", new _Gameboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"]());\nconst player2 = new _Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"computer\", new _Gameboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"](), true);\n\nrandomizePlayerBoard(player1);\nrandomizePlayerBoard(player2);\n\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player1, player2);\n(0,_dom__WEBPACK_IMPORTED_MODULE_4__.initializeBoards)(document.getElementById(\"boards\"), game);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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