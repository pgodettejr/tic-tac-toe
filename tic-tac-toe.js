// Game board example object. Factory function wrapped inside an IIFE (module pattern). Could make boardPosition into an object with 3 properties, each with 3-index arrays
const gameboard = (function () {
  const boardPosition = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return boardPosition;
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