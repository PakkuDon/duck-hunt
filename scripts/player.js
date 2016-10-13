var newPlayer = function(name) {
  var name = name || '';
  var score = 0;
  var isPlaying = false;

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
    setName: function(newName) {
      name = newName;
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
