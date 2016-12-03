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
      return scores[scores.length - 1].score < score;
    },
    // Add score to leaderboard if high score
    addRecord: function(name, score) {
      if (!this.isHighScore(score)) {
        return;
      }
      // Find position to insert score
      for (var i = scores.length; i >= 1; i--) {
        if (scores[i - 1].score > score) {
          break;
        }
      }
      scores.splice(i, 0, { name: name, score: score });

      // Trim excess entries
      if (scores.length > SCORE_LIMIT) {
        scores.pop();
      }
    }
  }
})();
