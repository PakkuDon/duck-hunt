// Different states a duck can be in
var DuckState = {
  DEFAULT: {},
  FLEE: {},
  SHOT: {}
};

var newDuck = function(bounds) {
  var x;
  var y;
  var dx;
  var dy;
  var state = DuckState.DEFAULT;
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
      x = Math.random() > 0.5 ? bounds.right() : bounds.left();
      y = Math.random() * bounds.bottom();
      dx = 5;
      dy = -5;
      state = DuckState.DEFAULT;
    },
    // Change state if duck is shot
    shoot: function(shootX, shootY) {
      if (isInRange(shootX, x - HITBOX_RADIUS, x + HITBOX_RADIUS)
        && isInRange(shootY, y - HITBOX_RADIUS, y + HITBOX_RADIUS)) {
        state = DuckState.SHOT;
      }
    },
    isShot: function() {
      return state === DuckState.SHOT;
    },
    // Sets duck's next position
    move: function() {
      // Change direction at boundary
      // Constrain duck position to bounds
      if (x + dx > bounds.right()) {
        x = bounds.right();
        dx = -Math.abs(dx);
      }
      else if (x + dx < bounds.left()) {
        x = bounds.left();
        dx = Math.abs(dx);
      }

      if (y + dy > bounds.bottom()) {
        y = bounds.bottom()
        dy = -Math.abs(dy);
      }
      else if (y + dy < bounds.top()) {
        y = bounds.top();
        dy = Math.abs(dy);
      }

      // Calculate next x,y coordinates
      x += dx;
      y += dy;
    }
  }
};
