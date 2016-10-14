var newDuck = function(bounds) {
  var x;
  var y;
  var dx;
  var dy;
  var HITBOX_RADIUS = 30;

  // Create duck object
  return {
    getX: function() {
      return x;
    },
    getY: function() {
      return y;
    },
    getHorizontalSpeed: function() {
      return dx;
    },
    getVerticalSpeed: function() {
      return dy;
    },
    // Calculate initial coordinates and velocity
    spawn: function() {
      x = Math.random() > 0.5 ? bounds.getWidth() : 0;
      y = (Math.random() * bounds.getHeight() * 0.6);
      dx = 5;
      dy = -5;
    },
    // Checks if x, y coordinates are within parrot's hitbox
    isShot: function(shootX, shootY) {
      return isInRange(shootX, x - HITBOX_RADIUS, x + HITBOX_RADIUS)
        && isInRange(shootY, y - HITBOX_RADIUS, y + HITBOX_RADIUS);
    },
    // Sets duck's next position
    move: function() {
      // Change direction at boundary
      if (x + dx > bounds.getWidth()) {
        dx = -Math.abs(dx);
      }
      else if (x + dx < 0) {
        dx = Math.abs(dx);
      }

      if (y + dy > bounds.getHeight() * 0.6) {
        dy = -Math.abs(dy);
      }
      else if (y + dy < 0) {
        dy = Math.abs(dy);
      }

      // Calculate next x,y coordinates
      x += dx;
      y += dy;
    }
  }
};
