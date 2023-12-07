// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

  // Logic that represents whether the game is active or not. Pulled from gameController
  let status = gameController.gameActive;

  // Displays the current state of the game board (in the console)
  const displayBoard = () => {
    for (let row of board) {
      console.log(row);
    }
  };  

  // Checks to see if a player has won the game
  const checkWin = () => {
    const board = Gameboard.board;
    const markers = ["X", "O"];
    const gameState = Gameboard.status;
    for (let marker of markers) {
      switch (true) {
        case // Check the rows
        (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
        (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
        (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;

        case // Check the columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;

        case // Check the diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;

        // Add logic to display "You Lose!" to the other player
        // Disable further interactions
      }

      gameState = false;
    }

    // Check for draws
    console.log(`Tie game :/`); 
    gameState = false;
    return false;
  }

  // Update the board with the player's move
  const makeMove = (row, col, markers) => {
    if (board[row][col] === null) {
      board[row][col] = markers;
      console.log(`Position: (${row},${col}) now occupied by ${markers}`);
      displayBoard();
      checkWin(); // The whole reason why this function can use 'markers' as a parameter and access it from checkWin(). Closures, baby!
    } else {
      console.log(`Position: (${row},${col}) is already occupied. Try again.`);
    }

    // Check winner example from RPS project. There was no separate disableButtons() function ever made though. Built-in JS method/function?
    // if(playerScore === 5) {
    //   winner.textContent = "You Win!";
    //   disableButtons();
    // } else if(computerScore === 5) {
    //   winner.textContent = "You Lose";
    //   disableButtons();
    // }
  }

  return { board, status, displayBoard, checkWin, makeMove };
})();

// Function that controls game flow, state of the game's turns & player info
function gameController () {
  const board = Gameboard();

  let gameActive = false;
  
  let currentPlayer = Players[0];
  
  // List of players. Might not need to be a factory function wrapped inside an IIFE (module pattern)? Do we need this.crossMarker = "X" or "crossMarker" & same with nought?
  // Link name with HTML form element. Link marker with randomly assigned marker in startGame() function.
  function Players (name, marker) {
    this.name = name;
    this.marker = marker;
    // const { name, marker } = Players; <-- possibly replace this.name & this.marker all at once?
  }

  // Factory function variant of "Player" code above (creating a player)
  // function createPlayer (name, marker) {
  //   return { name, marker };
  // }

  const startGame = () => {
    // Randomly assigns 'X' or 'O' marker to players
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

    // Displays assigned player markers
    document.querySelector("label[for=player-1]").innerText = `Player 1 (${currentPlayer})`;
    document.querySelector("label[for=player-2]").innerText = `Player 2 (${currentPlayer === 'X' ? 'O' : 'X'})`;

    // Logic that starts the game. Change back to 'false' in the checkWin() function above and link that function back to this one...somehow
    gameActive = true;
  }

  const switchTurn = () => {
    currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const newRound = () => {
    board.makeMove();
    console.log(`${getCurrentPlayer().name}'s turn.`);
  }

  newRound();

  // 'disableButtons' function that disables all buttons and the board itself once the game ends goes here

  return { gameActive, startGame, switchTurn, getCurrentPlayer }; // should 'board', 'currentPlayer', 'Players', 'disableButtons' and 'newRound' be added to this list as well?
}

// Object that controls game flow on the display (also an example for now). Should be a factory function wrapped inside an IIFE (module pattern)
const displayController = (function () {
  const cells = document.querySelectorAll('.cell');
  const grid = document.querySelector('.board');
  const startBtn = document.querySelector('.start');
  const restartBtn = document.querySelector('.restart');

  // Should implement "Gameboard.makeMove" somewhere in this function (not necessarily here). This should be the only way the UI has access to the Gameboard above?
  // const markerUI = Gameboard.markers; // Would need to move markers variable up the scope (see checkWin above)
  // for (const marker in markers) {
  //   const markers[0] = document.createElement("p"); // Cannot redeclare block-scoped variable 'markers'
  //   const markers[1] = document.createElement("p"); // Cannot redeclare block-scoped variable 'markers'

  //   markers[0].setAttribute("data-cell", "X");
  //   markers[1].setAttribute("data-cell", "O");

  //   const markerX = document.createTextNode(`${marker[0]}`);
  //   const markerO = document.createTextNode(`${marker[1]}`);

  //   markers[0].appendChild(markerX);
  //   markers[1].appendChild(markerO);
  // }

  // currentPlayer: new Players,
  // gameResult: {
  //   winningPlayer: null,
  //   losingPlayer: null,
  // },
  // boardState: function (Gameboard) {
  //   return Gameboard;
  // }
})();

// Should each cell be a button when we do the UI later on (buttons help with accessibility)? Or just "clickable" (mouseclick, mousedown, etc) squares/divs?


// Old and/or incorrect code

// const marker = ["X", "O"]; <-- had "global" scope within IIFE, now is just within checkWin() function (also within IIFE)

//   // Check the rows
//   for (let i = 0; i < 3; i++) {
//     if (
//       board[i][0] === marker &&
//       board[i][1] === marker &&
//       board[i][2] === marker
//     ) {
//       console.log(`Marker ${marker} is the Winner`);
//       return true;
//     }
//   }

//   // Check the columns
//   for (let i = 0; i < 3; i++) {
//     if (
//       board[i][0] === marker &&
//       board[i][1] === marker &&
//       board[i][2] === marker
//     ) {
//       console.log(`Marker ${marker} is the Winner`);
//       return true;
//     }
//   }

  // Alternative logic for columns. Longer, not as good. Keep in case for loop above this doesn't work
  // if (
  //   (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
  //   (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
  //   (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker)
  // ) {
  //   return true;
  // }

  // Check the diagonals
//   if (
//     (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
//     (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker)
//   ) {
//     console.log(`Marker ${marker} is the Winner`);
//     return true;
//   }
      // SHOULD check for draws but doesn't
      // if (makeMove >= 9 && checkWin === false) { 
      //   console.log(`Tie game :/`); 
      // }