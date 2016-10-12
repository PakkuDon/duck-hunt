// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var gameElem = document.querySelector('#game');
var screenElem = document.querySelector('#screen');
var playerElems = document.querySelectorAll('.player');
var gameStatsElem = document.querySelector('#game-stats');
var roundNumberElem = document.querySelector('#round-number');
var ammoElem = document.querySelector('#ammo-remaining');
var targetsElem = document.querySelector('#targets');

duckElem.className += ' horizontal';

// Initialise model
var players = [newPlayer('Bobby'), newPlayer('Tables')];
var game = newDuckHuntGame(screenElem, players);
var intervalID;

var startGameTick = function() {
  intervalID = setInterval(function() {
    game.tick();
    duckElem.style.left = game.getDuck().getX() - duckElem.clientWidth / 2 + 'px';
    duckElem.style.top = game.getDuck().getY() - duckElem.clientHeight / 2 + 'px';

    updateUI();
  }, game.getClockSpeed());
};

var stopGameTick = function() {
  clearInterval(intervalID);
}

var updateUI = function() {
  // Show player details
  var players = game.getPlayers();
  for (var i = 0; i < playerElems.length; i++) {
    var player = players[i];
    var playerElem = playerElems[i];

    playerElem.className = 'player';

    if (i < players.length) {
      playerElem.querySelector('.name').innerHTML = player.getName();
      playerElem.querySelector('.score').innerHTML = player.getScore();

      // Highlight defeated or current player
      if (!player.isPlaying()) {
        playerElem.className += ' lost';
      }
      else if (i === game.getCurrentPlayer()) {
        playerElem.className += ' current';
      }
    }
    else {
      playerElem.querySelector('.name').innerHTML = '';
      playerElem.querySelector('.score').innerHTML = '';
      playerElem.className = 'lost';
    }
  }

  // Show current round state
  roundNumberElem.innerHTML = game.getRoundNumber();
  ammoElem.innerHTML = game.getAmmoRemaining();
  var targetString = '';
  game.getTargets().forEach(function(target) {
    targetString += target ? 'O ' : 'X ';
  });
  targetsElem.innerHTML = targetString;

  // Stop animating on game end
  if (!game.isRunning()) {
    stopGameTick();
  }
}

// Register event handlers
gameElem.addEventListener('click', function(e) {
  var clickX = e.pageX - gameElem.offsetLeft - duckElem.clientWidth / 2 ;
  var clickY = e.pageY - gameElem.offsetTop - duckElem.clientHeight / 2 ;

  game.shoot(clickX, clickY);

  updateUI();
});

startGameTick();
