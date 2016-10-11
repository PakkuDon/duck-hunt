var newPlayer = function(name) {
  var name = name;
  var score = 0;
  return {
    getName: function() {
      return name;
    },
    getScore: function() {
      return score;
    },
    incrementScore: function(value) {
      score += value;
    }
  }
};
