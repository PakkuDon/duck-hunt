// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var gameElem = document.querySelector('#game');
var playerStatsElem = document.querySelector('#player-stats');

var players = [newPlayer('Bobby'), newPlayer('Tables')];
var game = newDuckHuntGame(500, 200, players);

var updateUI = function() {
  // Show player details
  playerStatsElem.innerHTML = '';
  var players = game.getPlayers();
  players.forEach(function(player, index) {
    var playerDiv = document.createElement('div');
    playerDiv.innerHTML = '<div>Player: ' + player.getName() + '</div>';
    playerDiv.innerHTML += '<div>Score: ' + player.getScore() + '</div>';

    // Highlight defeated or current player
    if (!player.isPlaying()) {
      playerDiv.className = 'lost';
    }
    else if (index === game.getCurrentPlayer()) {
      playerDiv.className = 'current';
    }

    playerStatsElem.appendChild(playerDiv);
  });

  // Show current round state
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
