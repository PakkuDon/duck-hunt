var newDuck = function(width, height) {
  // Calculate initial coordinates and direction
  // Spawn duck at edge of screen
  var x = Math.random() > 0.5 ? width : 0;
  var y = Math.random() > 0.5 ? height : 0;
  var direction = Math.random() * 360;

  // Create duck object
  return {
    getX: function() {
      return x;
    },
    getY: function() {
      return y;
    },
    getDirection: function() {
      return direction;
    },
    // Calculate duck's next coordinates based on its current angle
    // http://stackoverflow.com/q/14437325
    move: function() {
      x += Math.cos(direction);
      y += Math.sin(direction);
    },
    // Change duck's direction
    setDirection: function(nextDirection) {
      direction = nextDirection;
    }
  }
};
