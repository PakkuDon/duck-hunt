var newPlayer = function(name) {
  var name = name;
  var score = 0;
  var isPlaying = true;

  return {
    getName: function() {
      return name;
    },
    getScore: function() {
      return score;
    },
    isPlaying: function() {
      return isPlaying;
    },
    increaseScore: function(value) {
      score += value;
    },
    setPlaying: function(isPlaying) {
      isPlaying = isPlaying;
    }
  }
};
