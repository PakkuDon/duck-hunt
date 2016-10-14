var newDuckHuntGame = function(bounds) {
  // Constants - Not actually consts but don't edit these
  var MAX_AMMO = 3;
  var TARGET_POINTS = 1000;
  var BONUS_POINTS = 10000;
  var INITIAL_REQUIRED_TARGETS = 7;
  var MAX_TARGETS = 10;
  var INITIAL_ROUND = 1;
  var INITIAL_CLOCK_SPEED = 100;

  // General game properties
  var duck = newDuck(bounds);
  var players = [newPlayer(), newPlayer()];
  var noOfPlayers = 0;
  var currentPlayerNo = 0;
  var round = 1;
  var targets = [];
  var clockSpeed = INITIAL_CLOCK_SPEED;
  var ammoRemaining = MAX_AMMO;
  var requiredTargets = INITIAL_REQUIRED_TARGETS;

  return {
    getDuck: function() {
      return duck;
    },
    getPlayers: function() {
      return players;
    },
    getCurrentPlayer: function() {
      return currentPlayerNo;
    },
    getNextPlayer: function() {
      var nextPlayerNo = -1;
      for (var i = 1; i <= players.length; i++) {
        var playerNo = (currentPlayerNo + i) % players.length;
        if (players[playerNo].isPlaying()) {
          nextPlayerNo = playerNo;
          break;
        }
      }
      return nextPlayerNo;
    },
    getRoundNumber: function() {
      return round;
    },
    getClockSpeed: function() {
      return clockSpeed;
    },
    getTargets: function() {
      return targets;
    },
    getAmmoRemaining: function() {
      return ammoRemaining;
    },
    getState: function() {
      return {
        players: players,
        currentPlayerNo: currentPlayerNo,
        round: round,
        ammoRemaining: ammoRemaining,
        targets: targets,
        isRunning: this.isRunning()
      };
    },
    isRunning: function() {
      return players.filter(function(player) {
        return player.isPlaying();
      }).length > 0;
    },
    start: function(newNoOfPlayers) {
      currentPlayerNo = 0;
      noOfPlayers = newNoOfPlayers;
      targets = [];
      ammoRemaining = MAX_AMMO;
      round = INITIAL_ROUND;
      clockSpeed = INITIAL_CLOCK_SPEED;
      requiredTargets = INITIAL_REQUIRED_TARGETS;

      // Set initial state for all players
      for (var i = 0; i < players.length; i++) {
        players[i].setPlaying(i < noOfPlayers);
        players[i].resetScore();
      }

      duck.spawn();
    },
    reload: function() {
      ammoRemaining = MAX_AMMO;
    },
    tick: function() {
      duck.move();
    },
    shoot: function(x, y) {
      if (!this.isRunning()) {
        return;
      }

      // Check if duck has been hit
      var isShot = duck.isShot(x, y);

      // If duck is hit, mark target as hit and update score
      if (isShot) {
        players[currentPlayerNo].increaseScore(TARGET_POINTS);
        targets.push(true);
      }
      // Deduct ammo on miss
      else {
        // If out of ammo, mark target as miss
        if (ammoRemaining === 0) {
          targets.push(false);
        }
      }

      // Update ammo remaining
      ammoRemaining--;

      // If all targets exhausted, check if player has passed
      if (targets.length >= MAX_TARGETS) {
        var hitCount = targets.filter(function(target) {
          return target;
        }).length;

        // If player didn't hit enough targets, disqualify them
        if (hitCount < requiredTargets) {
          players[currentPlayerNo].setPlaying(false);
        }
        // Award bonus points if all targets hit
        else if (hitCount === MAX_TARGETS) {
          players[currentPlayerNo].increaseScore(BONUS_POINTS);
        }

        // If remaining players have completed round,
        // move to next round
        if (this.getNextPlayer() !== -1
          && currentPlayerNo >= this.getNextPlayer()) {
          round++;
          if (clockSpeed >= 10) {
            clockSpeed -= 10;
          }
        }
        // Switch to next player
        currentPlayerNo = this.getNextPlayer();

        // Reset target results
        targets = [];
      }

      // Respawn duck and reload on end of target attempt
      if ((isShot || ammoRemaining === 0)
        && this.getNextPlayer() !== -1) {
        this.reload();
        duck.spawn();
      }

      return isShot;
    }
  };
};
