// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

  // Player markers
  // const markers = ["X", "O"];

  // Allows access to the gameController function that controls game flow. Might not need this: if we don't, change all instances of "state" to just "gameController"
  // let state = gameController();

  // Displays the current state of the game board (in the console). Marker currently showing as "undefined"
  const displayBoard = () => {
    for (let row of board) {
      console.log(row);
    }
  };  

  // Checks to see if a player has won the game. 
  // OPTION: return statements within switch statement could be 'break' instead.
  const checkWin = () => {
    const board = Gameboard.board;
    const markers = ["X", "O"];
    for (let marker of markers) {
      switch (true) {
        case // Check the rows
        (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
        (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
        (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          displayController.disableAll();
          return true;

        case // Check the columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          displayController.disableAll();
          return true;

        case // Check the diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          displayController.disableAll();
          return true;

        case // Check for draws
        // TODO: Potentially move this back outside of the switch statement if it doesn't work. return goes back to 'false'. not sure if 'makeMove >= 9' is the best way to write
        (makeMove >= 9):
          console.log(`Tie game :/`); 
          displayController.disableAll();
          return true;

        // TODO: Display "You Win!" to the winning player. Possibly highlight winner's input box & marker icon
        // TODO: Add logic to display "You Lose!" to the other player. Possibly highlight loser's input box & marker icon

        // Switch the players turn 
        // TODO: may need to be newRound instead of switchTurn...or maybe both?
        default:
          gameController.switchTurn(); // Uncaught TypeError: gameController.switchTurn is not a function. Re-enable 'state' variable above?
      }
    }
  }

  // Update the board with the player's move
  // TODO: Marker showing as undefined when cell in the UI is clicked (see the rest of the code)
  // TODO: May need to add logic to update the UI (displayController) with the current move.
  const makeMove = (row, col, marker) => {
    if (board[row][col] === null) {
      board[row][col] = marker;
      console.log(`Position: (${row},${col}) now occupied by ${marker}`);
      displayBoard();
      checkWin(); // The whole reason why this function can use 'marker' as a parameter and access it from checkWin(). Closures, baby!
    } else {
      console.log(`Position: (${row},${col}) is already occupied. Try again.`);
    }

    // Check winner example from RPS project. There was no separate disableButtons() function ever made though
    // if(playerScore === 5) {
    //   winner.textContent = "You Win!";
    //   disableButtons();
    // } else if(computerScore === 5) {
    //   winner.textContent = "You Lose";
    //   disableButtons();
    // }
  }

  // TODO: Do we HAVE to return board & state? Can we keep them as private function & still work outside?
  return { board, displayBoard, checkWin, makeMove }; 
})();

// Function that controls game flow, state of the game's turns & player info. 
// TODO 1: Test ChatGPT solution first (move this entire function to top of file)
// TODO 2: Move all functions in Gameboard to here & reorganize necessary code (IIFE didn't work. Have no mentions of any Gameboard or displayController functions/methods/variables)
function gameController () {
  let currentPlayer = Players[0];
  
  // List of players. 
  // TODO: Do we need this.crossMarker = "X" or "crossMarker" & same with nought?
  // TODO: Link name with HTML form element. 

  // TODO: Link marker with randomly assigned marker in startGame() function.
  // ATTEMPT #1: Changing the value 'marker' to 'Gameboard(.checkWin).markers'

  // TODO: Marker is currently showing as "undefined" although debugging never got to this part of the code?
  function Players (name, marker) {
    this.name = name;
    this.marker = marker;
    // const { name, marker } = Players; <-- OPTION: possibly replace this.name & this.marker all at once?
  }

  // OPTION: Factory function variant of "Player" code above (creating a player)
  // function createPlayer (name, marker) {
  //   return { name, marker };
  // }

  // Starts the game
  const startGame = () => {
    // Randomly assigns 'X' or 'O' marker to players. Possibly delete this feature entirely

    // TODO: Fix markers showing as "undefined" (spills over into cell buttons when they are clicked. see code below)
    // ATTEMPT #1: Simply changing quotes to solve undefined marker error didn't work
    // ATTEMPT #2: Change 'X' and 'O' to 'Gameboard(.checkWin).marker(s)[0][1]' respectively.
    currentPlayer = Math.random() < 0.5 ? "X" : "O";

    // Displays assigned player markers. 
    document.querySelector("label[for=player-1]").innerText = `Player 1 (${currentPlayer})`;
    document.querySelector("label[for=player-2]").innerText = `Player 2 (${currentPlayer === "X" ? "O" : "X"})`;

    // TODO: Need more logic that starts the game here. Set Player 1's turn so they can make a move?
    Gameboard.board = [
      [null, null, null], 
      [null, null, null], 
      [null, null, null],
    ];
  };

  // Restarts the game
  const restartGame = () => {
    Gameboard.board = [
      [null, null, null], 
      [null, null, null], 
      [null, null, null],
    ];

    // TODO: Add logic here that clears the UI & resets any styling. location.reload()? Read up on this. Might not even need Gameboard.board above this line if we use it.
  };

  // Switches player turns
  // TODO: Add logic that show the player's turn has switched (as textContent? in a DOM variable targeting a <span> or <h2> etc. Display markers in startGame is one way to do it)
  const switchTurn = () => {
    currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  // TODO: This might be redundant with other code and/or may need to be added to forEach method on the board cells below (in displayController) 
  // const newRound = () => {
  //   Gameboard.makeMove();
  //   console.log(`${getCurrentPlayer().name}'s turn.`);
  // }

  // newRound();

  // TODO: should 'currentPlayer', 'Players' & 'newRound' be added or keep them private?
  return { startGame, restartGame, switchTurn, getCurrentPlayer }; 
};

// Object that controls game flow on the display (also an example for now). Factory function wrapped inside an IIFE (module pattern)
const displayController = (function () {
  // DOM for display elements
  // TODO: May need to update 'cells' DOM to reflect as buttons, then update forEach method below accordingly
  const cells = document.querySelectorAll('.cell');
  const grid = document.querySelector('.board');
  const startBtn = document.querySelector('.start');
  const restartBtn = document.querySelector('.restart');

  // UI access to gameController above
  const gameFlow = gameController();

  // 'Start' button functionality
  startBtn.addEventListener('click', (e) => {
    // Checks to see if Player name input boxes are filled out
    let names = document.getElementById('player-names').checkValidity();
    if (names) {
      e.preventDefault();
      gameFlow.startGame();
      startBtn.setAttribute("disabled", "");
      restartBtn.removeAttribute("disabled");
      cells.forEach(cell => cell.removeAttribute("disabled"));
    }
  });

  // 'Restart' button functionality. If we use location.reload() in our restartGame function above, simply replace () on addEventListener with restartGame & delete code below
  restartBtn.addEventListener('click', () => {
    gameFlow.restartGame();
    startBtn.setAttribute("disabled", "");
  });

  // Places player marker in a given cell once clicked, then switches player turn
  // TODO: gameFlow.getCurrentPlayer().marker is showing as "undefined", meaning the marker itself is "undefined"
  // OPTION: Update this method to reflect the cells as "Buttons" once the change is made in HTML?
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      Gameboard.makeMove(row, col, gameFlow.getCurrentPlayer().marker);
      // cells[0].textContent = Gameboard.board; <-- This just puts the entire array into the top left cell as commas
      cell.setAttribute("disabled", "");
      gameFlow.switchTurn();
      console.log(`${gameFlow.getCurrentPlayer().name}'s turn.`);
    });
  });
  
  // Disables the restart button & the board itself before game start & once the game ends
  const disableAll = () => {
    startBtn.removeAttribute("disabled");
    restartBtn.setAttribute("disabled", "");
    cells.forEach(cell => cell.setAttribute("disabled", ""));
  };

  // Prevents interactivity with Restart and board cells until the game starts (Start button is pressed)
  disableAll();

  // TODO: See return comments above (what can we NOT declare & keep private without breaking the app)
  return { cells, grid, startBtn, restartBtn, gameFlow, disableAll } 
})();


// TODO: Read 'Private Variables & Functions' &/or 'Prototypal Inheritance with Factories' from Factory Functions TOP lesson if needed regarding what we're returning in factories


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

// Old logic for adding player assigned marker to the cell they clicked on
// cells.forEach((cell) => {
//   cell.addEventListener('click', () => {
//     for (let row of board.board) {
//       let addMarker = document.createTextNode(`${currentPlayer}`);
//       board.makeMove(row);
//       cell.appendChild(addMarker);
//     }
//   });
// });