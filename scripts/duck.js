var newDuck = function(bounds) {
  var x;
  var y;
  var dx;
  var dy;

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
    // Calculate initial coordinates and velocity
    spawn: function() {
      x = Math.random() > 0.5 ? bounds.offsetWidth : 0;
      y = (Math.random() * bounds.offsetHeight * 0.6);
      dx = 5;
      dy = -5;
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
