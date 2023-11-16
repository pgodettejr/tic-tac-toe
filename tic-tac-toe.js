// Game board example object. Will change this after some more thought is put into it.
const gameboard = { [bob]: yes };

// List of players. Will need to change this from a constructor to a factory function wrapped inside an IIFE (module pattern)
function Players (name, score, x, o) {
  this.name = name;
  this.score = score;
  this.x = x;
  this.o = o;
}

// Object that controls game flow on the display (also an example for now)
const displayController = {};