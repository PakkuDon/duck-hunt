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
var game = newDuckHuntGame(screenElem);
var intervalID;

var startGame = function(noOfPlayers) {
  game.start(noOfPlayers);
  stopGameTick();
  startGameTick();
}

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
      playerElem.querySelector('.score').innerHTML = '';
      playerElem.className += ' lost';
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

// Change selected player's name
playerElems.forEach(function(playerElem, index) {
  var nameInput = playerElem.querySelector('.name');
  nameInput.addEventListener('input', function(e) {
    game.getPlayers()[index].setName(nameInput.value);
  })
});

// Start game with set number of players
document.querySelector('#one-player-game-btn').addEventListener('click', function() {
  startGame(1);
});

document.querySelector('#two-player-game-btn').addEventListener('click', function() {
  startGame(2);
});

updateUI();
