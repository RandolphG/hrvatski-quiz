import { TimerManager } from "./TimeManager.js";
import { QuestionManager } from "./QuestionManager.js";
import { ScoreManager } from "./ScoreManager.js";
import { UIManager } from "./UIManager.js";
import { StorageManager } from "./StorageManager.js";

export default class Quiz {
  constructor(questions, quizData) {
    this.timerManager = new TimerManager();
    this.originalQuestionsData = questions;
    this.questionManager = new QuestionManager(questions);
    this.scoreManager = new ScoreManager();
    this.storageManager = new StorageManager();
    this.uiManager = new UIManager();
    this.category = null;
    this.data = quizData;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.uiManager.startBtn.onclick = () => this.showInfoBox();
    this.uiManager.profileBtn.onclick = () => this.showStats();
    this.uiManager.profileQuitBtn.onclick = () => this.hideProfile();
    this.uiManager.exitBtn.onclick = () => this.hideInfoBox();
    this.uiManager.continueBtn.onclick = () => this.startQuiz();
    this.uiManager.nextBtn.onclick = () => this.handleNextQuestion();
    this.uiManager.resultBox.querySelector(".buttons .restart").onclick = () =>
      this.restartQuiz();
    this.uiManager.resultBox.querySelector(".buttons .quit").onclick = () =>
      window.location.reload();
  }

  showStats() {
    this.uiManager.profileBox.classList.add("activeProfile");
    const quizData = this.storageManager.getQuizData();

    console.log(`QUIZ DATA : ` + quizData);
    console.log(quizData);
    // Update profile stats using UI manager
    this.uiManager.updateProfileStats(
      this.timerManager.formatTime(quizData.stats.totalTime),
      quizData.stats.totalQuestions,
      quizData.stats.totalErrors,
      Object.keys(quizData.testCounts).length,
      quizData.score,
    );
  }

  hideProfile() {
    this.uiManager.profileBox.classList.remove("activeProfile");
  }

  showInfoBox() {
    this.uiManager.infoBox.classList.add("activeInfo");
  }

  hideInfoBox() {
    this.uiManager.infoBox.classList.remove("activeInfo");
  }

  setCategory(category) {
    this.category = category;
    // Update question manager with filtered questions
    const filteredData = this.originalQuestionsData.find(
      (cat) => cat[category],
    );

    /*const filteredData = this.questionManager.questions.find(
      (cat) => cat[category],
    );*/
    if (filteredData) {
      this.questionManager = new QuestionManager(filteredData[category]);
    } else {
      console.warn(`Category "${category}" not found.`);
      this.questionManager = new QuestionManager([]);
    }
  }

  startQuiz() {
    if (!this.questionManager.questions.length) {
      console.error("No questions available for the selected category.");
      return;
    }

    this.hideInfoBox();
    this.uiManager.quizBox.classList.add("activeQuiz");

    this.showCurrentQuestion();
    this.startTimers();
  }

  showCurrentQuestion() {
    const currentQuestion = this.questionManager.getCurrentQuestion();
    const shuffledOptions = this.questionManager.getShuffledOptions();

    this.uiManager.showQuestion(currentQuestion, shuffledOptions);
    this.uiManager.updateQuestionCounter(
      this.questionManager.currentIndex + 1,
      this.questionManager.totalQuestions,
      this.scoreManager.errorTotal,
    );

    // Add click listeners to options
    const options = this.uiManager.optionList.querySelectorAll(".option");
    options.forEach((option) => {
      option.addEventListener("click", () => this.handleOptionSelected(option));
    });
  }

  startTimers() {
    this.timerManager.startTimer(
      this.uiManager.timeCount,
      this.uiManager.timeText,
      () => this.handleTimeOut(),
    );
    this.timerManager.startTimerLine(this.uiManager.timeLine);
    this.timerManager.startTotalTimeCounter((time) =>
      this.uiManager.updateTotalTime(time),
    );
  }

  handleOptionSelected(selectedOption) {
    this.timerManager.stopAllTimers();

    const userAnswer = selectedOption.textContent.trim();
    const isCorrect = this.questionManager.isCorrectAnswer(userAnswer);

    if (isCorrect) {
      this.scoreManager.incrementScore();
      this.uiManager.markOptionCorrect(selectedOption);
    } else {
      this.scoreManager.incrementError();
      this.uiManager.markOptionIncorrect(selectedOption);
      this.uiManager.showCorrectAnswer(
        this.questionManager.getCurrentQuestion().answer,
        this.uiManager.optionList,
      );
    }

    this.uiManager.disableOptions();
    this.uiManager.showNextButton();
  }

  handleTimeOut() {
    this.timerManager.stopAllTimers();
    this.uiManager.timeText.textContent = "Time Out";

    const correctAnswer = this.questionManager.getCurrentQuestion().answer;
    this.uiManager.showCorrectAnswer(correctAnswer, this.uiManager.optionList);
    this.uiManager.disableOptions();
    this.uiManager.showNextButton();
  }

  handleNextQuestion() {
    if (this.questionManager.nextQuestion()) {
      this.showCurrentQuestion();
      this.startTimers();
      this.uiManager.hideNextButton();
    } else {
      this.showResult();
    }
  }

  showResult() {
    this.timerManager.stopAllTimers();

    const percentage = this.scoreManager.calculatePercentage(
      this.questionManager.totalQuestions,
    );

    this.uiManager.showResult(
      percentage,
      this.timerManager.formatTime(this.timerManager.totalTime),
      this.scoreManager.errorTotal,
    );

    // Update storage with results
    this.storageManager.updateStats(
      this.category,
      this.timerManager.totalTime,
      this.questionManager.totalQuestions,
      this.scoreManager.errorTotal,
      percentage,
    );

    // Initialize drink tracker if needed
    if (window.DrinkTracker) {
      const drinkTracker = new DrinkTracker(60);
      console.log(
        `current percentage : ${drinkTracker.getCurrentPercentage()}`,
      );
    }
  }

  restartQuiz() {
    // Reset all managers
    this.timerManager.reset();
    this.questionManager.reset();
    this.scoreManager.reset();

    // Reset UI
    this.uiManager.quizBox.classList.add("activeQuiz");
    this.uiManager.resultBox.classList.remove("activeResult");
    this.uiManager.hideNextButton();

    // Start fresh
    this.showCurrentQuestion();
    this.startTimers();
  }
}
