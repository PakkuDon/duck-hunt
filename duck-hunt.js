var duck = {
  x: 0,
  y: 0,
  direction: 0,
  // Calculate duck's next coordinates based on its current angle
  // http://stackoverflow.com/q/14437325
  move: function() {
    this.x = this.x + Math.cos(this.direction);
    this.y = this.y + Math.sin(this.direction);
  },
  setDirection: function(degrees) {
    this.direction = degrees;
  }
};

var player = {
  name: '',
  score: 0
};

var duckHuntGame = {
  width: 500,
  height: 300,
  duck: duck,
  players: [],
  currentPlayer: 0,
  round: 1,
  ammo: 3,
  tick: function() {
    this.duck.move();

    // If duck at edge of screen switch directions
    if (this.duck.x > this.width || this.duck.x < 0
      || this.duck.y > this.height || this.duck.y < 0) {
        this.duck.setDirection((Math.floor(Math.random() * 360)));
      }
  },
  shoot: function(x, y) {
    // TODO: Collision check
    // TODO: If duck is hit, update score
    // TODO: Switch players
    // TODO: If both players have

    // TODO: Else, deduct ammo
    this.ammo--;
    return false;
  }
};
