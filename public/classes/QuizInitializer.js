export class QuizInitializer {
  constructor(Quiz, questions, quizData) {
    this.Quiz = Quiz;
    this.questions = questions;
    this.quizData = quizData;
  }

  initialize() {
    const quiz = new this.Quiz(this.questions, this.quizData);
    // Make quiz instance available globally for debugging
    window.quiz = quiz;
    return quiz;
  }
}
