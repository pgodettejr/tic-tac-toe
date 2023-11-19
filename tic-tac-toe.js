// Game board example object
const gameboard = (function () {
  const boardPosition = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return boardPosition;
})();

// List of players. Might not need to be a factory function wrapped inside an IIFE (module pattern)?
function Players (name, marker) {
  this.name = name;
  this.marker = marker;
}

// Factory function variant of "Player" code above (creating a player)
function createPlayer (name, marker) {
  return { name, marker };
}
// Object that controls game flow on the display (also an example for now)
const displayController = {};