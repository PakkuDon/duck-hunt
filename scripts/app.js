// Constants
var ALERT_TIME = 2000;
var PROCESS_INTERVAL = 10;

// Grab DOM elements
var screenElem = document.querySelector('#screen');
var playerElems = document.querySelectorAll('.player');

// Initialise model
var view = getView();
var game = newDuckHuntGame(view.getBounds());
var messages = [];
var animationID;
var lastTick = Date.now();

// Check if value is between min and max
var isInRange = function(value, min, max) {
  return value >= min && value < max;
}

// Perform game tick
var tick = function() {
  if (Date.now() - lastTick >= game.getClockSpeed()) {
    lastTick = Date.now();
    game.tick();
    view.updateUI(game);
  }
  animationID = requestAnimationFrame(tick);
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
    if (messages.length > 0 && !view.isModalVisible()) {
      stopGameTick();
      var message = messages.shift();
      view.showAlert(message);

      // Clear alert and resume game after all alerts processed
      setTimeout(function() {
        view.clearAlert();
        if (game.isRunning()) {
          startGameTick();
        }
      }, ALERT_TIME);
    }
  }, PROCESS_INTERVAL);
}

// Start game animation
var startGameTick = function() {
  animationID = requestAnimationFrame(tick);
};

// Stop game animation
var stopGameTick = function() {
  cancelAnimationFrame(animationID);
}

// Register event handlers
// Record player shot at click coordinates and
// update game state
screenElem.addEventListener('click', function(e) {
  // Prevent shoot from firing if message queue has messages
  if (messages.length > 0 || view.isModalVisible()) {
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
    && !nextState.players[previousState.currentPlayerNo].isPlaying) {
    messages.push('Game Over');
  }
  // Display alert if player got bonus points
  if (previousState.currentPlayerNo != -1) {
    var scoreDiff = nextState.players[previousState.currentPlayerNo].score
      - previousState.players[previousState.currentPlayerNo].score;
    if (scoreDiff > game.getTargetValue()) {
      messages.push('Bonus<br />' + game.getBonusValue());
    }
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

document.querySelector('#instructions-btn').addEventListener('click', function() {
  view.toggleInstructions();
});

// Show instructions

processMessageQueue();
view.updateUI(game);
