var newDuckHuntGame = function(width, height) {
  var width = width;
  var height = height;
  var duck = newDuck(width, height);
  var players = [];
  var currentPlayer = 0;
  var round = 1;
  var ammoRemaining = 3;
  var duckHitBox = 10;

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
    tick: function() {
      duck.move();
      // If duck at edge of screen switch directions
      if (duck.getX() > width || duck.getX() < 0
        || duck.getY() > height || duck.getY() < 0) {
        duck.setDirection((Math.floor(Math.random() * 360)));
      }
    },
    shoot: function(x, y) {
      // TODO: Collision check
      // TODO: If duck is hit, update score
      // TODO: Switch players
      // TODO: If all players have cleared round,
      // move to next round

      // TODO: Else, deduct ammo
      ammoRemaining--;
      return false;
    }
  };
};
