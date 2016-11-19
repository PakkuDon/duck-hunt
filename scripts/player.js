var newPlayer = function() {
  var score = 0;
  var isPlaying = false;

  return {
    getScore: function() {
      return score;
    },
    isPlaying: function() {
      return isPlaying;
    },
    getState: function() {
      return {
        score: score,
        isPlaying: isPlaying
      };
    },
    resetScore: function() {
      score = 0;
    },
    increaseScore: function(value) {
      score += value;
    },
    setPlaying: function(flag) {
      isPlaying = flag;
    }
  }
};
