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

  // Checks to see if a player has won the game. See columns case for possible approach towards showing the winner in UI
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
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableAll();
          return true;

        case // Check the columns
        (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) ||
        (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker) ||
        (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableAll();
          return true;

        case // Check the diagonals
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
        (board[2][0] === marker && board[1][1] === marker && board[0][2] === marker):
          console.log(`Marker ${marker} is the Winner`);
          displayController.info.replaceChildren();
          displayController.info.textContent = `Marker ${marker} is the Winner!`;
          displayController.disableAll();
          return true;

        case // Check for draws
        (board[0][0] !== null && board[0][1] !== null && board[0][2] !== null) &&
        (board[1][0] !== null && board[1][1] !== null && board[1][2] !== null) &&
        (board[2][0] !== null && board[2][1] !== null && board[2][2] !== null):
          console.log(`Tie game :/`); 
          displayController.info.replaceChildren();
          displayController.info.textContent = `Tie game :/`;
          displayController.disableAll();
          return true;

        // TODO: Display "You Win!" to the winning player. Possibly highlight winner's input box & marker icon (look at WesBos JS30 Unicorn lesson or research confetti effect CSS)
        // TODO: Add logic to display "You Lose!" to the other player. Possibly highlight loser's input box & marker icon
      }
    }

    // Check for draws
    // if (board !== null) {
    //   console.log(`Tie game :/`); 
    //   displayController.info.replaceChildren();
    //   displayController.info.textContent = `Tie game :/`;
    //   displayController.disableAll();
    //   return false;
    // }
  }

  // Update the board with the player's move
  const makeMove = (row, col, marker) => {
    if (board[row][col] === null) {
      board[row][col] = marker;
      displayBoard();
      checkWin();
    } else {
      console.log(`Position: (${row},${col}) is already occupied. Try again.`); // TODO: Add logic to update the UI (displayController) with this message, then delete this
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

// Function that controls game flow, state of the game's turns & player info
function gameController () {
  // DOM for names that players entered into the "form" before game start
  let player1 = document.getElementById("player-1");
  let player2 = document.getElementById("player-2");

  // List of players. Try to figure out a way to assign the markers at random on game start in the future (Math.random code from prior versions - see old code below)
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
  // TODO: Switch to location.reload() - Read up on this. Might not even need Gameboard.board below this line once location.reload() is implemented.
  const restartGame = () => {
    Gameboard.board = [
      [null, null, null], 
      [null, null, null], 
      [null, null, null],
    ];
  };

  // Switches player turns
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  // Gets the current player (for use in other functions outside of gameController)
  const getCurrentPlayer = () => currentPlayer;

  // TODO: should 'currentPlayer', 'Players' & 'newRound' be added or keep them private?
  return { restartGame, switchTurn, getCurrentPlayer }; 
};

// Object that controls game flow on the display (also an example for now). Factory function wrapped inside an IIFE (module pattern)
const displayController = (function () {
  // DOM for display elements
  const cells = document.querySelectorAll('.cell');
  const grid = document.querySelector('.board');
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
  // TODO: Switch to location.reload() in our restartGame function above & replace () on addEventListener with restartGame & delete code below
  restartBtn.addEventListener('click', () => {
    gameFlow.restartGame();
    startBtn.setAttribute("disabled", "");
  });

  // Places player marker in a given cell once clicked, then switches player turn
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      Gameboard.makeMove(row, col, gameFlow.getCurrentPlayer().marker);
      cell.textContent = gameFlow.getCurrentPlayer().marker; 
      cell.setAttribute("disabled", ""); // OPTION: Marker "fades" when cell is disabled but still shows on UI. Replace disable with checkWin occupy message?

      // Switches the player's turn on the condition that there is no game winner yet, then displays the current turn on the UI
      if (!Gameboard.checkWin()) {
        gameFlow.switchTurn();
        console.log(`${gameFlow.getCurrentPlayer().name()}'s turn.`); 
        info.replaceChildren();
        info.textContent = `${gameFlow.getCurrentPlayer().name()}'s turn`;
      } 
    });
  });
  
  // Disables the restart button & the board itself before game start & once the game ends. 
  // Works well for before the game starts but no so much after the game ends. May need to either redo this function or create a separate one for game end purposes.
  // OPTION: rename this to disableStart and create a separate function named disableEnd and run that function under checkWin (only restart button is enabled - see startBtn code)
  const disableAll = () => {
    startBtn.removeAttribute("disabled");
    restartBtn.setAttribute("disabled", "");
    cells.forEach(cell => cell.setAttribute("disabled", ""));
  };

  // Prevents interactivity with Restart and board cells until the game starts (when the Start button is pressed)
  disableAll();

  // TODO: See return comments above (what can we NOT declare & keep private without breaking the app)
  return { cells, grid, info, startBtn, restartBtn, gameFlow, disableAll } 
})();


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