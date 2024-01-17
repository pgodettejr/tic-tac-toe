// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern)
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ]; 

  // Checks to see if a player has won the game
  const checkWin = () => {
    const board = Gameboard.board;
    const markers = ["X", "O"];
    for (let marker of markers) {
      switch (true) {
        case // Check the rows
        (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
        (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
        (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker):
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableBoard();
          return true;

        case // Check the columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableBoard();
          return true;

        case // Check the diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableBoard();
          return true;

        case // Check for draws
        (board[0][0] !== null && board[0][1] !== null && board[0][2] !== null) &&
        (board[1][0] !== null && board[1][1] !== null && board[1][2] !== null) &&
        (board[2][0] !== null && board[2][1] !== null && board[2][2] !== null):
          displayController.info.replaceChildren();
          displayController.info.textContent = `Tie game :/`;
          displayController.disableBoard();
          return true;
      }
    }
  }

  // Update the board with the player's move
  const makeMove = (row, col, marker) => {
    if (board[row][col] === null) {
      board[row][col] = marker;
      checkWin();
    }
  }

  // TODO: Test the deletion of "board" in this return statement. Does the game still work without it?
  return { board, checkWin, makeMove }; 
})();

// Function that controls game flow, state of the game's turns & player info
function gameController () {
  // DOM for names that players entered into the "form" before game start
  let player1 = document.getElementById("player-1");
  let player2 = document.getElementById("player-2");

  // List of players
  const players = [
    {
      name() {
        return player1.value;
      },
      marker: "X"
    },
    {
      name() {
        return player2.value;
      },
      marker: "O"
    }
  ];

  let currentPlayer = players[0];

  // Restarts the game
  const restartGame = () => {
    location.reload();
  };

  // Switches player turns
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  // Gets the current player (for use in other functions outside of gameController)
  const getCurrentPlayer = () => currentPlayer;

  return { restartGame, switchTurn, getCurrentPlayer }; 
};

// Object that controls game flow on the display. Factory function wrapped inside an IIFE (module pattern)
const displayController = (function () {
  // DOM for display elements
  const cells = document.querySelectorAll('.cell');
  const startBtn = document.querySelector('.start');
  const restartBtn = document.querySelector('.restart');
  const info = document.getElementById('info');

  // UI access to gameController above
  const gameFlow = gameController();

  // 'Start' button functionality
  startBtn.addEventListener('click', (e) => {
    // Checks to see if Player name input boxes are filled out
    let names = document.getElementById('player-names').checkValidity();
    if (names) {
      e.preventDefault();
      startBtn.setAttribute("disabled", "");
      restartBtn.removeAttribute("disabled");
      cells.forEach(cell => cell.removeAttribute("disabled"));
      info.textContent = `${gameFlow.getCurrentPlayer().name()}'s turn`;
    }
  });

  // 'Restart' button functionality
  restartBtn.addEventListener('click', gameFlow.restartGame);

  // Places player marker in a given cell once clicked, then switches player turn
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      Gameboard.makeMove(row, col, gameFlow.getCurrentPlayer().marker);
      cell.textContent = gameFlow.getCurrentPlayer().marker; 
      cell.setAttribute("disabled", "");

      // Switches the player's turn on the condition that there is no game winner yet, then displays the current turn on the UI
      if (!Gameboard.checkWin()) {
        gameFlow.switchTurn();
        console.log(`${gameFlow.getCurrentPlayer().name()}'s turn.`); 
        info.replaceChildren();
        info.textContent = `${gameFlow.getCurrentPlayer().name()}'s turn`;
      } 
    });
  });
  
  // Disables all cells on the board UI (for use when the game ends)
  const disableBoard = () => {
    cells.forEach(cell => cell.setAttribute("disabled", ""));
  };

  // Disables the restart button & the board itself (for use before the game starts) 
  const disableAll = () => {
    startBtn.removeAttribute("disabled");
    restartBtn.setAttribute("disabled", "");
    disableBoard();
  };

  // Prevents interactivity with Restart and board cells until the game starts (when the Start button is pressed)
  disableAll();

  // TODO: Test the deletion of "gameFlow"  in this return statement. Does the game still work without it?
  return { info, gameFlow, disableBoard } 
})();