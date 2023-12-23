// Game board example object (3 x 3 array). Factory function wrapped inside an IIFE (module pattern). Could make board into an object with 3 properties, each with 3-index arrays
const Gameboard = (function () {
  let board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null],
  ];

  // Allows access to the gameController function that controls game flow
  let state = gameController();

  // Allows access to the UI
  // let display = displayController(); <-- ReferenceError: Cannot access 'displayController' before initialization

  // Displays the current state of the game board (in the console)
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
    let gameState = state.gameActive;
    for (let marker of markers) {
      switch (true) {
        case // Check the rows
        (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker) ||
        (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) ||
        (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          display.disableAll();
          return true;

        case // Check the columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          display.disableAll();
          return true;

        case // Check the diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          display.disableAll();
          return true;

        // TODO: Display "You Win!" to the winning player. Possibly highlight winner's input box & marker icon
        // TODO: Add logic to display "You Lose!" to the other player. Possibly highlight loser's input box & marker icon

        // Switch the players turn 
        // TODO: may need to be newRound instead of switchTurn...or maybe both?
        default:
          state.switchTurn();
      }

      gameState = false;
    }

    // Check for draws
    console.log(`Tie game :/`); 
    gameState = false;
    display.disableAll();
    return false;
  }

  // Update the board with the player's move
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
  return { board, state, displayBoard, checkWin, makeMove }; 
})();

// Function that controls game flow, state of the game's turns & player info. 
// TODO 1: Test ChatGPT solution first (move this entire function to top of file)
// TODO 2: Move all functions in Gameboard to here & reorganize necessary code (IIFE didn't work. Have no mentions of any Gameboard or displayController functions/methods/variables)
function gameController () {
  // const board = Gameboard(); <-- ReferenceError: Cannot access 'Gameboard' before initialization

  let gameActive = false;
  
  let currentPlayer = Players[0];
  
  // List of players. 
  // TODO: Do we need this.crossMarker = "X" or "crossMarker" & same with nought?
  // TODO: Link name with HTML form element. Link marker with randomly assigned marker in startGame() function.
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
    // Randomly assigns 'X' or 'O' marker to players
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

    // Displays assigned player markers. 
    // TODO: May need to be getElementById('player-1/2') instead. Does this have to be appended as a child or 'sibling' afterwards or can the label text itself simply be updated?
    document.querySelector("label[for=player-1]").innerText = `Player 1 (${currentPlayer})`;
    document.querySelector("label[for=player-2]").innerText = `Player 2 (${currentPlayer === 'X' ? 'O' : 'X'})`;

    // TODO: May need more logic that starts the game here (not just board.board by itself)
    Gameboard.board = [
      [null, null, null], 
      [null, null, null], 
      [null, null, null],
    ];

    // TODO: Change back to 'false' in the checkWin() function above and link that function back to this one...somehow
    gameActive = true;
    console.log('Does startGame work on button click or nah?');
  };

  // Restarts the game
  const restartGame = () => {
    Gameboard.board = [
      [null, null, null], 
      [null, null, null], 
      [null, null, null],
    ];

    // TODO: Add logic here that clears the UI & resets any styling. location.reload()? Read up on this. Might not even need Gameboard.board above this line if we use it.
    gameActive = false;
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
  return { gameActive, startGame, restartGame, switchTurn, getCurrentPlayer }; 
};

// Object that controls game flow on the display (also an example for now). Factory function wrapped inside an IIFE (module pattern)
const displayController = (function () {
  // DOM for display elements
  // TODO: May need to update 'cells' DOM to reflect as buttons, then update forEach method below accordingly
  const cells = document.querySelectorAll('.cell');
  const grid = document.querySelector('.board');
  const startBtn = document.querySelector('.start');
  const restartBtn = document.querySelector('.restart');

  // const board = Gameboard(); <-- UI access to Gameboard above. TypeError: Gameboard is not a function?

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
      console.log('Does this work or nah?');
    } else {
      console.log('It did not work!');
    }
  });

  // 'Restart' button functionality. If we use location.reload() in our restartGame function above, simply replace () on addEventListener with restartGame & delete code below
  restartBtn.addEventListener('click', () => {
    gameFlow.restartGame();
    startBtn.setAttribute("disabled", "");
  });

  // Places player marker in a given cell once clicked, then switches player turn
  // TODO: Update this method to reflect the cells as "Buttons" once the change is made in HTML
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (gameFlow.gameActive) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        Gameboard.makeMove(row, col, gameFlow.getCurrentPlayer().marker); // OPTION: cells[0].textContent = (Game)board.board;
        cell.setAttribute("disabled", "");
        gameFlow.switchTurn();
        console.log(`${getCurrentPlayer().name}'s turn.`);
      }
    });
  });
  
  // Disables the restart button & the board itself before game start & once the game ends
  const disableAll = () => {
    if (gameFlow.gameActive === false) {
      startBtn.removeAttribute("disabled");
      restartBtn.setAttribute("disabled", "");
      cells.forEach(cell => cell.setAttribute("disabled", ""));
    }
  };

  // Prevents interactivity with Restart and board cells until the game starts
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