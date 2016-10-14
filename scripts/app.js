// Constants
var ALERT_TIME = 2000;
var PROCESS_INTERVAL = 10;

// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var screenElem = document.querySelector('#screen');
var playerElems = document.querySelectorAll('.player');
var gameStatsElem = document.querySelector('#game-stats');
var roundNumberElem = document.querySelector('#round-number');
var ammoElem = document.querySelector('#ammo-remaining');
var targetElems = document.querySelectorAll('.target');
var alertElem = document.querySelector('#alert');

duckElem.className += ' horizontal'

// Initialise model
var game = newDuckHuntGame({
  getWidth: function() {
    return screenElem.offsetWidth;
  },
  getHeight: function() {
    return screenElem.offsetHeight;
  }
});
var messages = [];
var intervalID;
var alertVisible = false;

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

// If alerts recorded, pause game and display messages
// before resuming
var processMessageQueue = function() {
  setInterval(function() {
    if (messages.length > 0 && !alertVisible) {
      stopGameTick();
      var message = messages.shift();
      alertVisible = true;
      alertElem.innerHTML = message;

      // Clear alert and resume game after all alerts processed
      setTimeout(function() {
        alertVisible = false;
        alertElem.innerHTML = '';
        if (game.isRunning()) {
          startGameTick();
        }
      }, ALERT_TIME);
    }
  }, PROCESS_INTERVAL);
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

  // Change duck sprite based on direction
  if (duck.getHorizontalSpeed() > 0) {
    duckElem.style.transform = '';
  }
  else {
    duckElem.style.transform = 'scaleX(-1)';
  }
}

// Show current player stats
var showPlayerStats = function(players) {
  for (var i = 0; i < playerElems.length; i++) {
    var player = players[i];
    var playerElem = playerElems[i];

    // Reset CSS class and score to current values
    playerElem.className = 'player';
    playerElem.querySelector('.score').innerHTML = player.getScore();

    // Highlight disqualified or current player
    if (!player.isPlaying()) {
      playerElem.className += ' lost';
    }
    else if (i === game.getCurrentPlayer()) {
      playerElem.className += ' current';
    }
  }
}

// Show current game state
var showGameStats = function(game) {
  roundNumberElem.innerHTML = game.getRoundNumber();
  ammoElem.innerHTML = '';

  // Show ammo remaining
  for (var i = 0; i < game.getAmmoRemaining(); i++) {
    var ammoIcon = document.createElement('span');
    ammoIcon.className = 'sprite ammo';
    ammoElem.appendChild(ammoIcon);
  }

  // Show target hits/misses
  var targets = game.getTargets();
  for (var i = 0; i < game.getTargetsPerRound(); i++) {
    var target = targets[i];
    var targetIcon = targetElems[i];
    targetIcon.className = 'sprite target';
    if (target) {
      targetIcon.className += ' hit';
    }
  };

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
// Record player shot at click coordinates and
// update game state
screenElem.addEventListener('click', function(e) {
  // Prevent shoot from firing if message queue has messages
  if (messages.length > 0 || alertVisible) {
    return;
  }

  var clickX = e.pageX - screenElem.offsetLeft;
  var clickY = e.pageY - screenElem.offsetTop;

  // Dirty checking
  // Report alert if changes detected between shots
  var previousState = game.getState();
  game.shoot(clickX, clickY);
  var nextState = game.getState();

  // If player loses, show game over message
  if (previousState.isRunning
    && !previousState.players[previousState.currentPlayerNo].isPlaying()) {
    messages.push('Game Over');
  }
  // Show next round message
  if (previousState.round !== nextState.round) {
    messages.push('Round ' + nextState.round);
  }
  // Show player change message
  if (previousState.currentPlayerNo !== nextState.currentPlayerNo
    && nextState.currentPlayerNo !== -1) {
    messages.push('Player ' + (nextState.currentPlayerNo + 1));
  }
  // If game has ended, display game result
  if (previousState.isRunning && !nextState.isRunning) {
    messages.push(game.getResult());
  }
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

processMessageQueue();
updateUI();
