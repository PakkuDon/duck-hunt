// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');

var duckHuntGame = newDuckHuntGame(500, 200);

// Register event handlers
var intervalID = setInterval(function() {
  duckHuntGame.tick();
  duckElem.style.left = duckHuntGame.getDuck().getX() + 'px';
  duckElem.style.top = duckHuntGame.getDuck().getY() + 'px';
}, 1);
