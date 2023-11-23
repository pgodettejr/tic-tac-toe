// Game board example object. Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

  // Displays the current state of the game board
  function displayBoard () {
    for (let row of board) {
      console.log(row);
    }
  }  

  // Checks to see if a player has won the game
  function checkWin(marker) {
    // Check the rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === marker &&
        board[i][1] === marker &&
        board[i][2] === marker
      ) {
        return true;
      }
    }

    // Check the columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === marker &&
        board[i][1] === marker &&
        board[i][2] === marker
      ) {
        return true;
      }
    }

    // Check the diagonals
    if (
      (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
      (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker)
    ) {
      return true;
    }

    return false;
  }

  // Update the board with the player's move
  function makeMove(row, col, marker) {
    if (board[row][col] === null) {
      board[row][col] = marker;
      console.log(`Position: (${row},${col}) now occupied by ${marker}`);
      displayBoard();

      if (checkWin(marker)) {
        console.log(`You Win!`);
        // Add logic to display "You Lose!" to the other player
        // Disable further interactions
      }
    } else {
      console.log(`Position: (${row},${col}) is already occupied. Try again.`);
    }
  }
})();

// List of players. Might not need to be a factory function wrapped inside an IIFE (module pattern)? Do we need this.crossMarker = "X" or "crossMarker" & same with nought?
function Players (name, marker) {
  this.name = name;
  this.marker = marker;
  // const { name, marker } = Players; <-- possibly replace this.name & this.marker all at once?
}

// Factory function variant of "Player" code above (creating a player)
// function createPlayer (name, marker) {
//   return { name, marker };
// }

// Object that controls game flow on the display (also an example for now). Should be a factory function wrapped inside an IIFE (module pattern)
const displayController = {
  activePlayer: new Players,
  gameResult: {
    winningPlayer: null,
    losingPlayer: null,
  },
  boardState: function (gameboard) {
    return gameboard;
  }
};

// Should each cell be a button when we do the UI later on (buttons help with accessibility)? Or just "clickable" (mouseclick, mousedown, etc) squares/divs?