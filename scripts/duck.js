var newDuck = function(bounds) {
  // Calculate initial coordinates and velocity
  // Spawn duck at edge of screen
  var x;
  var y;
  var dx = 5;
  var dy = -5;

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
    spawn: function() {
      x = Math.random() > 0.5 ? bounds.offsetWidth : 0;
      y = Math.random() > 0.5 ? bounds.offsetHeight * 0.6 : 0;
    },
    // Sets duck's next position
    move: function() {
      // Change direction at boundary
      if (x + dx > bounds.offsetWidth || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy > bounds.offsetHeight * 0.6 || y + dy < 0) {
        dy = -dy;
      }

      // Calculate next x,y coordinates
      x += dx;
      y += dy;
    }
  }
};
