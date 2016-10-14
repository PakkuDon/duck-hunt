// Grab DOM elements
var duckElem = document.querySelector('#duck');
var dogElem = document.querySelector('#dog');
var screenElem = document.querySelector('#screen');
var playerElems = document.querySelectorAll('.player');
var gameStatsElem = document.querySelector('#game-stats');
var roundNumberElem = document.querySelector('#round-number');
var ammoElem = document.querySelector('#ammo-remaining');
var targetsElem = document.querySelector('#targets');
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
  targetsElem.innerHTML = '';

  // Show ammo remaining
  for (var i = 0; i < game.getAmmoRemaining(); i++) {
    var ammoIcon = document.createElement('span');
    ammoIcon.className = 'sprite ammo';
    ammoElem.appendChild(ammoIcon);
  }

  // Show target hits/misses
  game.getTargets().forEach(function(target) {
    var targetIcon = document.createElement('span');
    targetIcon.className = 'sprite target';
    if (target) {
      targetIcon.className += ' hit';
    }
    targetsElem.appendChild(targetIcon);
  });

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
  var clickY = e.pageY - screenElem.offsetTop;

  var previousState = game.getState();
  game.shoot(clickX, clickY);
  var nextState = game.getState();

  // TODO: Dirty checking
  var messages = [];
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
    var maxScore = -1;
    nextState.players.forEach(function(player) {
      if (player.getScore() > maxScore) {
        maxScore = player.getScore();
      }
    });
    var leadPlayers = nextState.players.filter(function(player) {
      return player.getScore() === maxScore;
    });

    if (leadPlayers.length > 1) {
      messages.push('Draw');
    }
    else {
      var winner = leadPlayers[0];
      var playerNo = nextState.players.indexOf(winner);
      messages.push('Player ' + (playerNo + 1) + ' ' + winner.getName() + ' wins');
    }
  }

  // Display alerts
  stopGameTick();
  for (var i = 0; i < messages.length; i++) {
    (function(i) {
      setTimeout(function() {
        alertElem.innerHTML = messages[i];
      }, i * 2000);
    })(i);
  }

  setTimeout(function() {
    alertElem.innerHTML = '';
    if (game.isRunning()) {
      startGameTick();
    }
    updateUI();
  }, i * 2000)
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
