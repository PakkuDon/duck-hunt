// Represents list of high scores for game
var scoreBoard = (function() {
  var SCORE_LIMIT = 5;
  var scores = [];

  return {
    // Return scores
    getScores: function() {
      return scores.slice();
    },
    // Return true if given score is a new high score
    isHighScore: function(score) {
      if (scores.length < SCORE_LIMIT) {
        return true;
      }
      return scores[score.length - 1].score < score;
    },
    // Add score to leaderboard if high score
    addRecord: function(name, score) {
      if (!this.isHighScore(score)) {
        return;
      }
      // Find position to insert score
      for (var i = scores.length - 1; i >= 0; i++) {
        if (scores[i].score > score) {
          break;
        }
      }
      scores.splice(i, 0, { name: name, score: score });
    }
  }
})();
