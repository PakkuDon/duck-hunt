// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var screenElem = document.querySelector('#screen');
var playerElems = document.querySelectorAll('.player');
var gameStatsElem = document.querySelector('#game-stats');
var roundNumberElem = document.querySelector('#round-number');
var ammoElem = document.querySelector('#ammo-remaining');
var targetsElem = document.querySelector('#targets');

duckElem.className += ' horizontal';

// Initialise model
var game = newDuckHuntGame({
  getWidth: function() {
    return screenElem.offsetWidth;
  },
  getHeight: function() {
    return screenElem.offsetHeight;
  }
});
var intervalID;

// Check if value is between min and max
var isInRange = function(value, min, max) {
  return value >= min && value < max;
}

// Initialise game with given number of players
var startGame = function(noOfPlayers) {
  game.start(noOfPlayers);
  stopGameTick();
  startGameTick();
}

// Start game animation
var startGameTick = function() {
  intervalID = setInterval(function() {
    game.tick();
    updateUI();
  }, game.getClockSpeed());
};

// Stop game animation
var stopGameTick = function() {
  clearInterval(intervalID);
}

// Show duck's current position
var showDuck = function(duck) {
  duckElem.style.left = duck.getX() - duckElem.clientWidth / 2 + 'px';
  duckElem.style.top = duck.getY() - duckElem.clientHeight / 2 + 'px';
}

// Show current player stats
var showPlayerStats = function(players) {
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
}

// Show current game state
var showGameStats = function(game) {
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

// Update UI to match game state
var updateUI = function() {
  showDuck(game.getDuck());
  showPlayerStats(game.getPlayers());
  showGameStats(game);
}

// Register event handlers
screenElem.addEventListener('click', function(e) {
  var clickX = e.pageX - screenElem.offsetLeft;
  var clickY = e.pageY - screenElem.offsetTop ;
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
