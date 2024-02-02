// import Ship from "./Ship";
import Gameboard from "./Gameboard";

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

export default initializeBoards;
