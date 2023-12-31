// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

  // Player markers (attempted to move this from checkWin to target markers in displayController better but didn't work)
  // const markers = ["X", "O"];

  // Displays the current state of the game board (in the console). Delete this once all the UI elements work.
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
      }
    }
  }

  // Update the board with the player's move
  const makeMove = (row, col, marker) => {
    if (board[row][col] === null) {
      board[row][col] = marker;
      console.log(`Position: (${row},${col}) now occupied by ${marker}`); // TODO: Add logic to update the UI (displayController) with the current move, then delete this
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

  // TODO: Do we HAVE to return board? Can we keep it as a private function & still work outside?
  return { board, displayBoard, checkWin, makeMove }; 
})();

// Function that controls game flow, state of the game's turns & player info. 
// TODO 1: Test ChatGPT solution first (move this entire function to top of file)
// TODO 2: Move all functions in Gameboard to here & reorganize necessary code (IIFE didn't work. Have no mentions of any Gameboard or displayController functions/methods/variables)
function gameController () {
  // DOM for names that players entered into the "form" before game start. Neither players name shows in console when turn is switched (shows as empty string - see cell buttons)
  // OPTION #1: change let to const (nope)
  // OPTION #2: change 'getElementById' to querySelector('#player-X') (nope)
  // OPTION #4: remove 'let' from both entirely (nope)
  // OPTION #5: move DOM elements inside gameController parentheses as parameters instead (nope)
  // OPTION #6: place DOM elements AND players object (as a different name) under a separate 'Players' factory function outside of gameController
  let player1 = document.getElementById('player-1').value;
  let player2 = document.getElementById('player-2').value; 

  // List of players. Neither players name shows in console when turn is switched (shows as empty string - see cell buttons). Returns the same with or w/o template literals
  // OPTION #7: Put both player1 & player2 under square brackets (nope)
  // OPTION #8: Empty the players array, then write a function similar to addBookToLibrary that 'pushes' each object (name & marker) into the array to be read later on below
  const players = [
    {
      name: player1,
      marker: "X"
    },
    {
      name: `${player2}`,
      marker: "O"
    }
  ];

  let currentPlayer = players[0];

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
  // TODO: Add logic that show the player's turn has switched (as textContent? in a DOM variable targeting a <span> or <h2> etc)
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  // Gets the current player (for use in other functions outside of gameController)
  const getCurrentPlayer = () => currentPlayer;

  // TODO: This might be redundant with other code and/or may need to be added to forEach method on the board cells below (in displayController) 
  // const newRound = () => {
  //   Gameboard.makeMove();
  //   console.log(`${getCurrentPlayer().name}'s turn.`);
  // }

  // newRound();

  // TODO: should 'currentPlayer', 'Players' & 'newRound' be added or keep them private?
  return { restartGame, switchTurn, getCurrentPlayer }; 
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
  // OPTION: Update this method to reflect the cells as "Buttons" once the change is made in HTML?
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      Gameboard.makeMove(row, col, gameFlow.getCurrentPlayer().marker);
      // cells[0].textContent = Gameboard.board; <-- Puts entire array into the top left cell as commas. Possibly 'cell.textContent = Gameboard.board or getCurrentPlayer().marker'
      cell.setAttribute("disabled", "");
      gameFlow.switchTurn();
      // Neither players name shows in console when turn is switched. Issue may be with 'players' object
      // OPTION #3: remove () from getCurrentPlayer (nope)
      console.log(`${gameFlow.getCurrentPlayer().name}'s turn.`); 
    });
  });
  
  // Disables the restart button & the board itself before game start & once the game ends
  const disableAll = () => {
    startBtn.removeAttribute("disabled");
    restartBtn.setAttribute("disabled", "");
    cells.forEach(cell => cell.setAttribute("disabled", ""));
  };

  // Prevents interactivity with Restart and board cells until the game starts (when the Start button is pressed)
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

// Attempt to randomly assign 'X' and 'O' markers to players at the beginning of the game

  // TODO: Do we need this.crossMarker = "X" or "crossMarker" & same with nought?
  // TODO: Link name with HTML form element.

  // TODO: Link marker with randomly assigned marker in startGame() function.
  // ATTEMPT #1: Changing the value 'marker' to 'Gameboard(.checkWin).markers'
  // let marker = Gameboard.checkWin.markers

  // ATTEMPT #2: Factory function variant of "Player" code below (creating a player) & moved this outside of gameController to the global scope
  // Player 2's marker has to be what Player 1's marker isn't. It can't be chosen at random along with Player 1.
  // OPTION: const getMarker = () => marker - return getMarker at the bottom instead of 'marker'

  // function createPlayer (name, oppMarker) {
  //   const markers = ["X", "O"];
  //   const marker = markers.filter(option => option !== oppMarker)[0]; or incorporate Math.random() < 0.5 ? "X" : "O"; somehow
  //
  //   return { name, marker };
  // };

  // List of players. 
  // TODO: Marker is currently showing as "undefined" although debugging never got to this part of the code? (see attempts just above)
  // function createPlayer (name, oppMarker) {
  //   const markers = ["X", "O"];
  //   const marker = markers.filter(option => option !== oppMarker)[0]; // or incorporate Math.random() < 0.5 ? "X" : "O"; somehow
  
  //   return { name, marker };
  // };

  // Starts the game
  // const startGame = () => {
    // Randomly assigns 'X' or 'O' marker to players. Possibly delete this feature entirely
    // Player 2's marker has to be what Player 1's marker isn't. It can't be chosen at random along with Player 1.

    // TODO: Fix markers showing as "undefined" (spills over into cell buttons when they are clicked. see code below)
    // ATTEMPT #1: Simply changing from single to double quotes
    // ATTEMPT #2: Change 'X' and 'O' to 'Gameboard(.checkWin).marker(s)[0][1]' respectively.
    // currentPlayer = Math.random() < 0.5 ? "X" : "O";
    // const player1 = createPlayer("Player 1");
    // const player2 = createPlayer("Player 2", player1.marker);

    // Displays assigned player markers. Showing as ([object Object]) next to both players now on display.
    // document.querySelector("label[for=player-1]").innerText = `Player 1 (${player1})`; // player 1 = {name: 'Player 1', marker: 'X' or 'O'}
    // document.querySelector("label[for=player-2]").innerText = `Player 2 (${player2})`; // player 2 = {name: 'Player 2', marker: whatever marker didn't get picked}

    // TODO: Need more logic that starts the game here. Set Player 1's turn so they can make a move? 
    // Do we even need Gameboard.board if it's empty anyway when the page loads and the start button is disabled in any other scenario or state?
    // Gameboard.board = [
    //   [null, null, null], 
    //   [null, null, null], 
    //   [null, null, null],
    // ];