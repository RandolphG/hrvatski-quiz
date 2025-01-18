import { chapter_1_questions, example } from "./library.js";
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
    console.log(quizData);

    // Initialize Quiz instance with questions and quizData
    const quiz = new Quiz(chapter_1_questions, quizData);
    this.quiz = quiz;

    // Expose the Quiz instance globally for debugging or external manipulation
    window.quiz = quiz;

    // Populate the dropdown with categories
    this.populateDropdown();

    // Set up the dropdown listener to set the quiz category
    this.setupCategoryDropdown();

    // Log readiness
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
        totalTimesPlayed: 0,
        testCounts: {},
        stats: {
          totalTime: 0,
          totalQuestions: 0,
          totalErrors: 0,
          questionTypes: 0,
        },
        score: {
          noun_gender: {
            played: 0,
            error: 0,
            score: 90,
          },
          personal_pronoun: {
            played: 0,
            error: 0,
            score: 90,
          },
          present_tense_of_verbs: {
            played: 0,
            error: 0,
            score: 90,
          },
          word_order: {
            played: 0,
            error: 0,
            score: 90,
          },
          questions: {
            played: 0,
            error: 0,
            score: 90,
          },
          Presentative_Statements: {
            played: 0,
            error: 0,
            score: 90,
          },
          conjunctions: {
            played: 0,
            error: 0,
            score: 90,
          },
          possessive_pronominal_adjectives: {
            played: 0,
            error: 0,
            score: 90,
          },
          demonstrative_adjectives: {
            played: 0,
            error: 0,
            score: 90,
          },
        },
      };
    }
  }

  /**
   * Sets up the category dropdown listener.
   * Dynamically updates the quiz category based on the selected dropdown option.
   */
  setupCategoryDropdown(quiz) {
    const dropdown = document.getElementById("categorySelector");

    // Attach an event listener to the dropdown
    dropdown.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;

      if (selectedCategory) {
        // Update the quiz category
        this.quiz.setCategory(selectedCategory);
        this.quiz.incrementTestCount(selectedCategory);
        console.log(`Quiz category set to: ${selectedCategory}`);
      }
    });
  }

  // Function to dynamically populate the dropdown
  populateDropdown() {
    const dropdown = document.getElementById("categorySelector");
    // Get keys from the first object in the array
    const categories = Object.keys(chapter_1_questions[0]);

    // Clear any existing options (if needed)
    dropdown.innerHTML = "";

    // Add a placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Select a category";
    placeholderOption.value = "";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    dropdown.appendChild(placeholderOption);

    // Iterate over categories and create option elements
    categories.forEach((category) => {
      const option = document.createElement("option");
      // Set the value to the key
      option.value = category;
      // Format the key for display (replace underscores with spaces)
      option.textContent = category.replace(/_/g, " ");
      dropdown.appendChild(option);
    });
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
