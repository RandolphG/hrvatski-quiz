export class QuestionManager {
  constructor(questions) {
    this.totalQuestions = null;
    this.currentIndex = null;
    this.questions = questions;
    this.currentIndex = 0;
    this.totalQuestions = questions.length;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  getShuffledOptions() {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion.options.sort(() => Math.random() - 0.5);
  }

  isCorrectAnswer(userAnswer) {
    const correctAnswer = this.getCurrentQuestion().answer.trim();
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  }

  nextQuestion() {
    if (this.currentIndex < this.totalQuestions - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  reset() {
    this.currentIndex = 0;
  }
}
