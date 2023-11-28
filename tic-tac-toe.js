// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

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
    for (let marker of markers) {
      switch (true) {
        case // rows
        (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
        (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
        (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;

        case // columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;

        case // diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          return true;
      }
    }

    return false;
  }

  // Update the board with the player's move
  const makeMove = (row, col, markers) => {
    if (board[row][col] === null) {
      board[row][col] = markers;
      console.log(`Position: (${row},${col}) now occupied by ${markers}`);
      displayBoard();
      checkWin();

      if (makeMove > 9) { // This may need to be (makeMove >= 9) instead
        console.log(`Tie game :/`); // SHOULD check for draws
        // Add logic to display "You Lose!" to the other player
        // Disable further interactions
      }
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

  // Add marker or markers back in after "board" if needed
  return { board, displayBoard, checkWin, makeMove };
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