export class ScoreManager {
  constructor() {
    this.userScore = 0;
    this.errorTotal = 0;
    this.percentage = 0;
  }

  incrementScore() {
    this.userScore++;
  }

  incrementError() {
    this.errorTotal++;
  }

  calculatePercentage(totalQuestions) {
    this.percentage = ((this.userScore / totalQuestions) * 100).toFixed(1);
    return this.percentage;
  }

  reset() {
    this.userScore = 0;
    this.errorTotal = 0;
    this.percentage = 0;
  }
}
