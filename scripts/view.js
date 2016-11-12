var getView = function() {
  // View variables
  var modalVisible = false;

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
  var instructionsElem = document.querySelector('#instructions');

  // Return available view methods
  return {
    isModalVisible: function() {
      return modalVisible;
    },
    // Update DOM to match game state
    updateUI: function(game) {
      this.showDuck(game.getDuck());
      this.showPlayerStats(game.getPlayers());
      this.showGameStats(game);
    },
    toggleInstructions: function() {
      if (instructionsElem.classList.contains('hidden')) {
        instructionsElem.classList.remove('hidden');
      }
      else {
        instructionsElem.classList.add('hidden');
      }
    },
    // Return game screen width/height
    getBounds: function() {
      return {
        left: function() {
          return duckElem.clientWidth / 2;
        },
        top: function() {
          return duckElem.clientHeight / 2;
        },
        right: function() {
          return screenElem.offsetWidth - duckElem.clientWidth / 2;
        },
        bottom: function() {
          return screenElem.offsetHeight * 0.7 - duckElem.clientHeight / 2;
        }
      };
    },
    // Show duck's current position
    showDuck: function(duck) {
      duckElem.style.left = duck.getX() - duckElem.clientWidth / 2 + 'px';
      duckElem.style.top = duck.getY() - duckElem.clientHeight / 2 + 'px';

      // Change duck sprite based on direction
      if (duck.getHorizontalSpeed() > 0) {
        duckElem.style.transform = '';
      }
      else {
        duckElem.style.transform = 'scaleX(-1)';
      }
    },
    showPlayerStats: function(players) {
      for (var i = 0; i < playerElems.length; i++) {
        var player = players[i];
        var playerElem = playerElems[i];

        // Reset CSS class and score to current values
        playerElem.classList.add('player');
        playerElem.querySelector('.score').innerHTML = player.getScore();

        // Highlight disqualified or current player
        if (!player.isPlaying()) {
          playerElem.classList.add('lost');
        }
        else {
          playerElem.classList.remove('lost');
        }

        if (i === game.getCurrentPlayer()) {
          playerElem.classList.add('current');
        }
        else {
          playerElem.classList.remove('current');
        }
      }
    },
    showGameStats: function(game) {
      roundNumberElem.innerHTML = game.getRoundNumber();
      ammoElem.innerHTML = '';

      // Show ammo remaining
      for (var i = 0; i < game.getAmmoRemaining(); i++) {
        var ammoIcon = document.createElement('span');
        ammoIcon.classList.add('sprite', 'ammo');
        ammoElem.appendChild(ammoIcon);
      }

      // Show target hits/misses
      var targets = game.getTargets();
      for (var i = 0; i < game.getTargetsPerRound(); i++) {
        var target = targets[i];
        var targetIcon = targetElems[i];
        targetIcon.classList.add('sprite', 'target');
        if (target) {
          targetIcon.classList.add('hit');
        }
        else {
          targetIcon.classList.remove('hit');
        }

        if (i === targets.length) {
          targetIcon.classList.add('current');
        }
        else {
          targetIcon.classList.remove('current');
        }
      }
    },
    showAlert: function(message) {
      alertElem.innerHTML = message
      modalVisible = true;
    },
    clearAlert: function() {
      alertElem.innerHTML = '';
      modalVisible = false;
    }
  }
}
