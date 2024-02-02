// import Ship from "./Ship";
import Ship from "./Ship";
import Gameboard from "./Gameboard";
import Player from "./Player";
import Game from "./Game";

const log = (message) => {
  document.getElementById("log").innerText = message;
};

const setBlockElementShot = (player, boardElement, [row, column]) => {
  const block = player.gameBoard.at(row, column);
  const blockElementIndex = row * Gameboard.size + column;
  const blockElements = [
    ...boardElement.querySelector(".content").querySelectorAll(".block"),
  ];
  if (!block) {
    blockElements[blockElementIndex].classList.add("miss");
  } else {
    blockElements[blockElementIndex].classList.add("shot");
  }
};

const createBlockElement = (player, game, row, column) => {
  const blockElement = document.createElement("div");
  blockElement.className = "block";

  if (!player.isComputer && player.gameBoard.at(row, column) !== null) {
    blockElement.classList.add("ship");
  }

  blockElement.addEventListener("click", () => {
    try {
      if (game.isOver) {
        log(`${game.currentPlayer.name} already won`);
        return;
      }

      const attacker = game.currentPlayer;
      setBlockElementShot(
        player,
        player.boardElement,
        attacker.attack(player, row, column),
      );
      log(`${attacker.name} attacks ${player.name}`);

      if (game.isOver) {
        log(`${game.currentPlayer.name} won!`);
        return;
      }

      game.playRound();
      log(`${game.currentPlayer.name}'s turn`);

      if (game.currentPlayer.isComputer) {
        setBlockElementShot(
          attacker,
          attacker.boardElement,
          game.currentPlayer.attack(attacker),
        );

        log(`${game.currentPlayer.name} attacks ${attacker.name}`);
        if (game.isOver) {
          log(`${game.currentPlayer.name} won!`);
          return;
        }

        game.playRound();
        log(`${game.currentPlayer.name}'s turn`);
      }
    } catch (error) {
      log(error);
    }
  });

  return blockElement;
};

const createBoardElement = (player, game) => {
  if (player === game.currentPlayer) {
    log(`${game.currentPlayer.name}'s turn`);
  }

  const boardElement = document.createElement("div");
  boardElement.className = "board";

  const playerNameElement = document.createElement("h2");
  playerNameElement.textContent = `${player.name}'s board`;
  playerNameElement.className = "name";

  const boardContentElement = document.createElement("div");
  boardContentElement.className = "content";

  for (let i = 0; i < Gameboard.size; i += 1) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";
    for (let j = 0; j < Gameboard.size; j += 1) {
      rowElement.appendChild(createBlockElement(player, game, i, j));
    }
    boardContentElement.appendChild(rowElement);
  }

  boardElement.appendChild(playerNameElement);
  boardElement.appendChild(boardContentElement);
  return boardElement;
};

const initializeBoards = (boardsElement, game) => {
  game.player1.setBoardElement(createBoardElement(game.player1, game));
  game.player2.setBoardElement(createBoardElement(game.player2, game));

  boardsElement.appendChild(game.player1.boardElement);
  boardsElement.appendChild(game.player2.boardElement);
};

const createBoardCreation = () => {
  const boardCreationElement = document.createElement("div");
  boardCreationElement.className = "board-creation";

  const boardContentElement = document.createElement("div");
  boardContentElement.className = "content";

  const availableShips = [
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ];
  let selectedShip = null;
  let selectedDirection = "row";
  const gameBoard = new Gameboard();

  const shipsListElement = document.createElement("ul");
  shipsListElement.className = "ships-list";

  const changeDirectionButton = document.createElement("button");
  changeDirectionButton.innerText = "Change direction";
  changeDirectionButton.addEventListener("click", (event) => {
    event.preventDefault();
    switch (selectedDirection) {
      case "row":
        selectedDirection = "column";
        break;
      case "column":
        selectedDirection = "row";
        break;
      default:
        throw new Error("Invalid direction");
    }
  });

  const updateShipsListElement = () => {
    shipsListElement.innerHTML = "";

    availableShips.forEach((ship) => {
      const shipElement = document.createElement("li");
      shipElement.className = "ship-creation";
      if (ship === selectedShip) {
        shipElement.classList.add("selected");
      }
      shipElement.innerText = `${ship.length} blocks ship`;
      shipElement.addEventListener("click", () => {
        selectedShip = ship;
        updateShipsListElement();
      });
      shipsListElement.appendChild(shipElement);
    });
  };
  updateShipsListElement();

  const createCreationBlockElement = (row, column) => {
    const clearBlocks = (blockElements) => {
      blockElements.forEach((block) => {
        block.classList.remove("selected");
      });
    };

    const placeShip = () => {
      if (!selectedShip) return;
      const blocks = [...boardContentElement.querySelectorAll(".block")];
      try {
        // Place ship in gameboard object
        gameBoard.placeShip(selectedShip, row, column, selectedDirection);

        // Place ship in gameboard element
        const initialIndex = row * Gameboard.size + column;
        for (let i = 0; i < selectedShip.length; i += 1) {
          if (selectedDirection === "row") {
            blocks[initialIndex + i].classList.add("ship");
          }
          if (selectedDirection === "column") {
            blocks[initialIndex + Gameboard.size * i].classList.add("ship");
          }
        }

        // Remove from available ships array
        const removeIndex = availableShips.findIndex(
          (ship) => ship === selectedShip,
        );
        availableShips.splice(removeIndex, 1);

        // Update available ships list element and unselect ship
        updateShipsListElement();
        selectedShip = null;
      } catch {
        clearBlocks(blocks);
      }
    };

    const blockElement = document.createElement("div");
    blockElement.className = "block";

    blockElement.addEventListener("mouseover", () => {
      const blocks = [...boardContentElement.querySelectorAll(".block")];
      clearBlocks(blocks);

      if (!selectedShip) return;
      try {
        gameBoard.checkPlaceShipValidity(
          selectedShip,
          row,
          column,
          selectedDirection,
        );

        // Show ship in board
        const initialIndex = row * Gameboard.size + column;
        for (let i = 0; i < selectedShip.length; i += 1) {
          if (selectedDirection === "row") {
            blocks[initialIndex + i].classList.add("selected");
          }
          if (selectedDirection === "column") {
            blocks[initialIndex + Gameboard.size * i].classList.add("selected");
          }
        }
      } catch (error) {
        clearBlocks(blocks);
      }
    });

    blockElement.addEventListener("mouseout", () => {
      const blocks = [...boardContentElement.querySelectorAll(".block")];
      clearBlocks(blocks);
    });

    blockElement.addEventListener("click", placeShip);
    return blockElement;
  };

  for (let i = 0; i < Gameboard.size; i += 1) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";
    for (let j = 0; j < Gameboard.size; j += 1) {
      rowElement.appendChild(createCreationBlockElement(i, j));
    }
    boardContentElement.appendChild(rowElement);
  }
  boardCreationElement.appendChild(boardContentElement);
  boardCreationElement.appendChild(shipsListElement);
  boardCreationElement.appendChild(changeDirectionButton);

  return [gameBoard, boardCreationElement];
};

const showNewGameDialog = () => {
  const dialog = document.getElementById("dialog");
  dialog.innerHTML = "";

  const form = document.createElement("form");

  const playerNameLabel = document.createElement("label");
  playerNameLabel.innerText = "Player name";
  const playerNameInput = document.createElement("input");
  playerNameInput.required = true;
  playerNameLabel.appendChild(playerNameInput);
  const [playerGameBoard, playerGameBoardElement] = createBoardCreation();

  const computerNameLabel = document.createElement("label");
  computerNameLabel.innerText = "Computer name";
  const computerNameInput = document.createElement("input");
  computerNameInput.required = true;
  computerNameLabel.appendChild(computerNameInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "New game";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (playerGameBoard.ships.length !== 5) {
      log("you need to place all your ships first");
      return;
    }

    const player1 = new Player(playerNameInput.value, playerGameBoard);
    const player2 = new Player(computerNameInput.value, new Gameboard(), true);
    player2.gameBoard.placeRandomShips([
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ]);
    const game = new Game(player1, player2);

    // Clear boards
    document.getElementById("boards").innerHTML = "";

    initializeBoards(document.getElementById("boards"), game);

    dialog.close();
  });

  form.appendChild(playerNameLabel);
  form.appendChild(playerGameBoardElement);
  form.appendChild(computerNameLabel);
  form.appendChild(submitButton);

  dialog.appendChild(form);
  dialog.showModal();
};

const addListeners = () => {
  const newGameButton = document.getElementById("new-game");
  newGameButton.addEventListener("click", () => {
    showNewGameDialog();
  });
};

export { initializeBoards, showNewGameDialog, addListeners };
