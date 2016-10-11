var newDuckHuntGame = function(width, height, players) {
  var width = width;
  var height = height;
  var duck = newDuck(width, height);
  var players = players;
  var currentPlayerNo = 0;
  var round = 1;

  // Commonly used values
  var maxAmmo = 3;
  var ammoRemaining = maxAmmo;
  var hitBoxRadius = 30;
  var targetPoints = 1000;
  var bonusPoints = 10000;
  var clockSpeed = 100;

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
    isRunning: function() {
      return players.filter(function(player) {
        return player.isPlaying();
      }).length > 0;
    },
    getClockSpeed: function() {
      return clockSpeed;
    },
    tick: function() {
      duck.move();
      // If duck at edge of screen switch directions
      if (duck.getX() > width || duck.getX() < 0
        || duck.getY() > height || duck.getY() < 0) {
        duck.setDirection((Math.floor(Math.random() * 360)));
      }
    },
    shoot: function(x, y) {
      // Check if duck has been hit
      var duckX = duck.getX();
      var duckY = duck.getY();
      var isShot = isInRange(x, duckX - hitBoxRadius, duckX + hitBoxRadius)
        && isInRange(y, duckY - hitBoxRadius, duckY + hitBoxRadius);

      // If duck is hit, update score and switch players
      if (isShot) {
        players[currentPlayerNo].increaseScore(targetPoints);
        ammoRemaining = maxAmmo;
        currentPlayerNo++;
      }
      else {
        // Update ammo remaining
        ammoRemaining--;
        // If out of ammo, disqualify player and move to next player
        if (ammoRemaining === 0) {
          console.log('test');
          players[currentPlayerNo].setPlaying(false);
          currentPlayerNo++;
          ammoRemaining = maxAmmo;
        }
      }

      // If all remaining players have cleared round,
      // get next available player
      if (currentPlayerNo >= players.length) {
        currentPlayerNo = -1;
        for (var i = 0; i < players.length; i++) {
          if (players[i].isPlaying()) {
            currentPlayerNo = i;
            break;
          }
        }

        // If any players remaining, move to next round
        if (currentPlayerNo !== -1) {
          round++;
          clockSpeed -= 10;
        }
      }

      return isShot;
    }
  };
};

var isInRange = function(value, min, max) {
  return value >= min && value < max;
}
