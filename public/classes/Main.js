import { StorageService } from "./StorageService.js";
import { DropdownManager } from "./DropdownManager.js";
import { CategoryManager } from "./CategoryManager.js";
import { NotificationService } from "./NotificationService.js";
import { QuizInitializer } from "./QuizInitializer.js";
import NotificationManager from "./NotificationManager.js";
import { BrowserInfoService } from "./BrowserInfoService.js";
import { ListManager } from "./ListManager.js";
import Quiz from "./QuizManager.js";
import { AppConfig } from "./AppConfig.js";
import { chapter_1_questions, defaultData } from "./_data.js";

export class Main {
  constructor() {
    this.storageService = null;
    this.categoryManager = null;
    this.dropdownManager = null;
    this.notificationService = null;
    this.browserInfoService = null;
    this.listManager = null;
    this.startButton = document.querySelector(".start_btn .start");

    this.initializeServices();
    this.initializeList(); // Add this line
    this.initializeQuiz();
    this.setupListSelection();
    // this.setupCategorySelection();
    this.initializeBrowserInfo();
    this.logReadiness();
  }

  initializeServices() {
    // Initialize all required services
    this.storageService = new StorageService(defaultData);
    this.categoryManager = new CategoryManager(chapter_1_questions);
    // this.dropdownManager = new DropdownManager(AppConfig.DROPDOWN_ID);
    this.notificationService = new NotificationService(NotificationManager);
    this.browserInfoService = new BrowserInfoService();

    // Get initial quiz data
    this.quizData = this.storageService.getQuizData();
  }

  async initializeBrowserInfo() {
    // Display basic browser info
    this.browserInfoService.displayBrowserInfo();

    // Get and display geolocation
    await this.browserInfoService.getGeolocation();

    // Get and log local IPs
    const ips = await this.browserInfoService.getLocalIPs();
    console.log("Local IPs:", ips);

    // Show the popover
    this.browserInfoService.show();
  }

  /**
   * Get selected categories
   * @returns {*}
   */
  getSelectedCategories() {
    return this.listManager.getSelectedItems();
  }

  initializeQuiz() {
    // Initialize quiz with QuizInitializer
    const quizInitializer = new QuizInitializer(
      Quiz,
      chapter_1_questions,
      this.quizData,
    );
    this.quiz = quizInitializer.initialize();
  }

  initializeList() {
    this.listManager = new ListManager(chapter_1_questions);
    this.listManager.populateList();
  }

  setupListSelection() {
    // Access the list container through listManager
    this.listManager.listContainer.addEventListener(
      "categorySelected",
      (event) => {
        const { category, isSelected } = event.detail;

        if (isSelected) {
          this.handleCategorySelection(category);
        } else {
          // Handle deselection if needed
          this.startButton.disabled = true;
          this.startButton.style.opacity = "0.5";
          this.startButton.style.cursor = "not-allowed";
        }
      },
    );
  }

  setupStartButton() {
    if (!this.startButton) {
      throw new Error("Start button not found");
    }
    // Disable start button initially
    this.startButton.disabled = true;
    this.startButton.style.opacity = "0.5";
    this.startButton.style.cursor = "not-allowed";
  }

  /*setupCategorySelection() {
    // Get and populate categories
    const categories = this.categoryManager.getCategories();
    this.dropdownManager.populate(categories);

    // Set up category selection handling
    this.dropdownManager.onChange((event) => {
      const selectedCategory = event.target.value;
      if (selectedCategory) {
        this.handleCategorySelection(selectedCategory);
      }
    });
  }*/

  handleCategorySelection(category) {
    // Update quiz category
    this.quiz.setCategory(category);

    /*this.quiz.incrementTestCount(category);*/

    // Enable start button when category is selected
    if (this.startButton) {
      // Add safety check
      this.startButton.disabled = false;
      this.startButton.style.opacity = "1";
      this.startButton.style.cursor = "pointer";
    }

    // Show notification
    this.notificationService.showCategoryNotification(category);

    console.log(`Quiz category set to: ${category}`);
  }

  logReadiness() {
    console.log("Quiz game is ready! Please click the start button to begin.");
  }
}

/* Usage */
export const initializeApp = () => {
  try {
    return new Main();
  } catch (error) {
    console.error("Failed to initialize application:", error);
    throw error;
  }
};
