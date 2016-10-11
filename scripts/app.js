// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var gameElem = document.querySelector('#game');

var players = [newPlayer('Bobby'), newPlayer('Tables')];
var duckHuntGame = newDuckHuntGame(500, 200, players);

// Register event handlers
var intervalID = setInterval(function() {
  duckHuntGame.tick();
  duckElem.style.left = duckHuntGame.getDuck().getX() - duckElem.clientWidth / 2 + 'px';
  duckElem.style.top = duckHuntGame.getDuck().getY() - duckElem.clientHeight / 2 + 'px';
}, duckHuntGame.getClockSpeed());

gameElem.addEventListener('click', function(e) {
  var clickX = e.pageX - gameElem.offsetLeft - duckElem.clientWidth / 2 ;
  var clickY = e.pageY - gameElem.offsetTop - duckElem.clientHeight / 2 ;

  console.log(duckHuntGame.shoot(clickX, clickY));
});
