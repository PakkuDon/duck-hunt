// Different states a duck can be in
var DuckState = {
  DEFAULT: {
    execute: function(duck) {
      var bounds = duck.getBounds();

      // Change direction at boundary
      // Constrain duck position to bounds
      if (duck.getX() + duck.getHorizontalSpeed() > bounds.right()) {
        duck.setX(bounds.right());
        duck.setHorizontalSpeed(-Math.abs(duck.getHorizontalSpeed()));
      }
      else if (duck.getX() + duck.getHorizontalSpeed() < bounds.left()) {
        duck.setX(bounds.left());
        duck.setHorizontalSpeed(Math.abs(duck.getHorizontalSpeed()));
      }

      if (duck.getY() + duck.getVerticalSpeed() > bounds.bottom()) {
        duck.setY(bounds.bottom());
        duck.setVerticalSpeed(-Math.abs(duck.getVerticalSpeed()));
      }
      else if (duck.getY() + duck.getVerticalSpeed() < bounds.top()) {
        duck.setY(bounds.top());
        duck.setVerticalSpeed(Math.abs(duck.getVerticalSpeed()));
      }

      // Calculate next x,y coordinates
      duck.setX(duck.getX() + duck.getHorizontalSpeed());
      duck.setY(duck.getY() + duck.getVerticalSpeed());
    }
  },
  FLEE: {
    execute: function(duck) {

    }
  },
  SHOT: {
    execute: function(duck) {

    }
  }
};

var newDuck = function(bounds) {
  var x;
  var y;
  var dx;
  var dy;
  var currentState = DuckState.DEFAULT;
  var HITBOX_RADIUS = 30;
  var SPEED = 5;

  // Create duck object
  return {
    getX: function() {
      return x;
    },
    getY: function() {
      return y;
    },
    setX: function(newX) {
      x = newX;
    },
    setY: function(newY) {
      y = newY;
    },
    getHorizontalSpeed: function() {
      return dx;
    },
    getVerticalSpeed: function() {
      return dy;
    },
    setHorizontalSpeed: function(speed) {
      dx = speed;
    },
    setVerticalSpeed: function(speed) {
      dy = speed;
    },
    getBounds: function() {
      return bounds;
    },
    // Calculate initial coordinates and velocity
    spawn: function() {
      if (Math.random() > 0.5) {
        x = bounds.right();
        dx = -SPEED;
      }
      else {
        x = bounds.left();
        dx = SPEED;
      }
      y = Math.random() * bounds.bottom();
      dy = Math.random() > 0.5 ? -SPEED : SPEED;
      currentState = DuckState.DEFAULT;
    },
    // Change currentState if duck is shot
    shoot: function(shootX, shootY) {
      if (isInRange(shootX, x - HITBOX_RADIUS, x + HITBOX_RADIUS)
        && isInRange(shootY, y - HITBOX_RADIUS, y + HITBOX_RADIUS)) {
        currentState = DuckState.SHOT;
      }
    },
    // Set current state to given state
    changeState: function(nextState) {
      currentState = nextState;
    },
    // Return true if current state is given state
    isInState: function(state) {
      return currentState === state;
    },
    update: function() {
      currentState.execute(this);
    }
  }
};
