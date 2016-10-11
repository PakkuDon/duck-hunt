// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');

// Register event handlers
var intervalID = setInterval(function() {
  duckHuntGame.tick();
  duckElem.style.left = duckHuntGame.duck.x + 'px';
  duckElem.style.top = duckHuntGame.duck.y + 'px';
}, 1);
