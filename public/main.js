import {
  chapter_1_questions,
  yes_no_questions,
  gender_questions,
  verb_biti,
} from "./library.js";
import Quiz from "./classes/Quiz.js";

/**
 * Main Class
 *
 * The `Main` class serves as the entry point for the quiz application. It initializes the quiz system,
 * retrieves quiz-related data from local storage, and sets up a global `Quiz` instance. This class also
 * provides utility functions to manage quiz statistics and prepare the quiz environment.
 *
 * @class
 */
class Main {
  /**
   * Constructs the `Main` instance.
   * - Retrieves quiz data from local storage or initializes default values if none exist.
   * - Initializes a `Quiz` instance with a set of questions and quiz statistics.
   * - Exposes the `Quiz` instance globally for debugging or external manipulation.
   */
  constructor() {
    // Retrieve quiz data from local storage
    const quizData = this.getQuizData();

    // Initialize Quiz instance with questions and quizData
    this.quiz = new Quiz(verb_biti, quizData);

    // Expose the Quiz instance globally
    window.quiz = this.quiz;

    // Start the quiz
    this.startQuiz();
  }

  /**
   * Retrieves quiz data from local storage or initializes default values if no data is found.
   *
   * @returns {Object} An object containing quiz statistics:
   * - `timeSpent` {number} Total time spent on quizzes (in seconds).
   * - `testCounts` {Object} An object where keys represent test IDs or names and values are the number of attempts.
   * - `scores` {Array<number>} An array containing scores from all quiz attempts.
   */
  getQuizData() {
    const storedData = localStorage.getItem("quizData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      // Default structure for quiz statistics
      return {
        timeSpent: 0,
        testCounts: {},
        scores: [],
      };
    }
  }

  /**
   * Starts the quiz application.
   * This method is responsible for initial setup and outputting a readiness message.
   * Additional event listeners or logic for quiz preparation can be added here.
   */
  startQuiz() {
    console.log("Quiz game is ready! Please click the start button to begin.");
    // Bind any additional event listeners or logic here if needed
  }
}

// Start the main class
const main = new Main();
