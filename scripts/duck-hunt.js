var newDuckHuntGame = function(width, height, players) {
  // Commonly used values
  var maxAmmo = 3;
  var hitBoxRadius = 30;
  var targetPoints = 1000;
  var bonusPoints = 10000;
  var minTargets = 7;
  var targetCount = 10;

  var width = width;
  var height = height;
  var duck = newDuck(width, height);
  var players = players;
  var currentPlayerNo = 0;
  var round = 1;
  var targets = [];
  var clockSpeed = 100;
  var ammoRemaining = maxAmmo;
  var requiredTargets = minTargets;

  return {
    getWidth: function() {
      return width;
    },
    getHeight: function() {
      return height;
    },
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
    isRunning: function() {
      return players.filter(function(player) {
        return player.isPlaying();
      }).length > 0;
    },
    reload: function() {
      ammoRemaining = maxAmmo;
    },
    tick: function() {
      duck.move();
    },
    shoot: function(x, y) {
      // Check if duck has been hit
      var duckX = duck.getX();
      var duckY = duck.getY();
      var isShot = isInRange(x, duckX - hitBoxRadius, duckX + hitBoxRadius)
        && isInRange(y, duckY - hitBoxRadius, duckY + hitBoxRadius);

      // If duck is hit, mark target as hit and update score
      if (isShot) {
        players[currentPlayerNo].increaseScore(targetPoints);
        targets.push(true);
        this.reload();
      }
      // Deduct ammo on miss
      else {
        // Update ammo remaining
        ammoRemaining--;
        // If out of ammo, mark target as miss
        if (ammoRemaining === 0) {
          targets.push(false);
          this.reload();
        }
      }

      // If all targets exhausted, check if player has passed
      if (targets.length >= targetCount) {
        var hitCount = targets.filter(function(target) {
          return target;
        }).length;

        // If player didn't hit enough targets, disqualify them
        if (hitCount < requiredTargets) {
          players[currentPlayerNo].setPlaying(false);
        }
        // Award bonus points if all targets hit
        else if (hitCount === targetCount) {
          players[currentPlayerNo].increaseScore(bonusPoints);
        }

        // If remaining players have completed round,
        // move to next round
        if (currentPlayerNo === players.length -1) {
          round++;
          clockSpeed -= 10;
        }
        // Switch to next player
        currentPlayerNo = this.getNextPlayer();

        // Reset target results
        targets = [];
      }

      return isShot;
    }
  };
};

var isInRange = function(value, min, max) {
  return value >= min && value < max;
}
