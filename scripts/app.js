// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var gameElem = document.querySelector('#game');
var playerElems = document.querySelectorAll('.player');
var gameStatsElem = document.querySelector('#game-stats');

// Initialise model
var players = [newPlayer('Bobby'), newPlayer('Tables')];
var game = newDuckHuntGame(500, 200, players);

var updateUI = function() {
  // Show player details
  var players = game.getPlayers();
  for (var i = 0; i < playerElems.length; i++) {
    var player = players[i];
    var playerElem = playerElems[i];

    playerElem.innerHTML = '';
    playerElem.className = '';

    if (i < players.length) {
      playerElem.innerHTML = '<div>Player: ' + player.getName() + '</div>';
      playerElem.innerHTML += '<div>Score: ' + player.getScore() + '</div>';
      // Highlight defeated or current player
      if (!player.isPlaying()) {
        playerElem.className = 'lost';
      }
      else if (i === game.getCurrentPlayer()) {
        playerElem.className = 'current';
      }
    }
  }

  // Show current round state
  gameStatsElem.innerHTML = 'Round: ' + game.getRoundNumber()
    + ' Ammo: ' + game.getAmmoRemaining();
}

// Register event handlers
var intervalID = setInterval(function() {
  game.tick();
  duckElem.style.left = game.getDuck().getX() - duckElem.clientWidth / 2 + 'px';
  duckElem.style.top = game.getDuck().getY() - duckElem.clientHeight / 2 + 'px';

  updateUI();
}, game.getClockSpeed());

gameElem.addEventListener('click', function(e) {
  var clickX = e.pageX - gameElem.offsetLeft - duckElem.clientWidth / 2 ;
  var clickY = e.pageY - gameElem.offsetTop - duckElem.clientHeight / 2 ;

  console.log(game.shoot(clickX, clickY));

  updateUI();
});
