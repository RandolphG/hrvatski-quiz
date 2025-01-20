/**
 * @jest-environment jsdom
 */

import Quiz from "../../public/classes/Quiz";

describe("Quiz", () => {
  let quiz;
  let mockQuestions;
  let mockQuizData;

  // Mock DOM elements
  beforeEach(() => {
    // Setup mock DOM
    document.body.innerHTML = `
      <div class="start_btn">
        <button class="start">Start Quiz</button>
        <button class="stats">View Stats</button>
      </div>
      <div class="info_box">
        <div class="buttons">
          <button class="quit">Exit Quiz</button>
          <button class="restart">Continue</button>
        </div>
      </div>
      <div class="quiz_box">
        <header>
          <div class="time_line"></div>
          <div class="timer">
            <div class="time_left_txt">Time Left</div>
            <div class="timer_sec">30</div>
          </div>
          <div class="total_time"></div>
        </header>
        <section>
          <div class="que_text"></div>
          <div class="option_list"></div>
        </section>
        <footer>
          <div class="total_que"></div>
          <button class="next_btn">Next</button>
        </footer>
      </div>
      <div class="result_box">
        <div class="score_text"></div>
        <div class="buttons">
          <button class="restart">Replay</button>
          <button class="quit">Quit</button>
        </div>
      </div>
      <div class="profile_box">
        <div class="profile-buttons">
          <button class="quit">Close</button>
        </div>
        <div class="stat"></div>
        <div class="score-list"></div>
      </div>
    `;

    // Mock questions data
    mockQuestions = [
      {
        category1: [
          {
            numb: 1,
            question: "Test Question 1?",
            answer: "Correct Answer",
            options: [
              "Wrong Answer 1",
              "Correct Answer",
              "Wrong Answer 2",
              "Wrong Answer 3",
            ],
          },
        ],
      },
    ];

    // Mock quiz data
    mockQuizData = {
      testCounts: {},
      score: {},
      stats: {
        totalTime: 0,
        totalQuestions: 0,
        totalErrors: 0,
      },
    };

    // Mock localStorage
    const mockLocalStorage = {
      store: {},
      getItem: function (key) {
        return this.store[key] || null;
      },
      setItem: function (key, value) {
        this.store[key] = value.toString();
      },
    };
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

    // Mock timers
    jest.useFakeTimers();

    quiz = new Quiz(mockQuestions, mockQuizData);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe("Initialization", () => {
    test("should initialize with correct default values", () => {
      expect(quiz.timeValue).toBe(30);
      expect(quiz.queCount).toBe(0);
      expect(quiz.queNumb).toBe(1);
      expect(quiz.userScore).toBe(0);
      expect(quiz.errorTotal).toBe(0);
    });

    test("should setup event listeners", () => {
      expect(quiz.startBtn.onclick).toBeDefined();
      expect(quiz.profileBtn.onclick).toBeDefined();
      expect(quiz.exitBtn.onclick).toBeDefined();
      expect(quiz.continueBtn.onclick).toBeDefined();
    });
  });

  describe("Quiz Navigation", () => {
    test("should show info box when start button is clicked", () => {
      quiz.startBtn.click();
      expect(quiz.infoBox.classList.contains("activeInfo")).toBeTruthy();
    });

    test("should hide info box when exit button is clicked", () => {
      quiz.infoBox.classList.add("activeInfo");
      quiz.exitBtn.click();
      expect(quiz.infoBox.classList.contains("activeInfo")).toBeFalsy();
    });
  });

  describe("Question Handling", () => {
    test("should display question correctly", () => {
      quiz.setCategory("category1");
      quiz.showQuestion(0);
      const queText = document.querySelector(".que_text");
      expect(queText.textContent).toContain("Test Question 1?");
    });

    test("should handle correct answer selection", () => {
      quiz.setCategory("category1");
      quiz.showQuestion(0);
      const correctOption = Array.from(quiz.optionList.children).find(
        (option) => option.textContent.trim() === "Correct Answer",
      );
      quiz.optionSelected(correctOption);
      expect(quiz.userScore).toBe(1);
      expect(correctOption.classList.contains("correct")).toBeTruthy();
    });

    test("should handle incorrect answer selection", () => {
      quiz.setCategory("category1");
      quiz.showQuestion(0);
      const wrongOption = Array.from(quiz.optionList.children).find(
        (option) => option.textContent.trim() === "Wrong Answer 1",
      );
      quiz.optionSelected(wrongOption);
      expect(quiz.errorTotal).toBe(1);
      expect(wrongOption.classList.contains("incorrect")).toBeTruthy();
    });
  });

  describe("Timer Functions", () => {
    test("should start and update timer", () => {
      quiz.startTimer(30);
      jest.advanceTimersByTime(1000);
      expect(quiz.timeCount.textContent).toBe("29");
    });

    test("should handle timeout", () => {
      quiz.setCategory("category1");
      quiz.showQuestion(0);
      quiz.startTimer(1);
      jest.advanceTimersByTime(2000);
      expect(quiz.timeText.textContent).toBe("TimeOut");
    });
  });

  describe("Result Handling", () => {
    test("should calculate and display results correctly", () => {
      quiz.setCategory("category1");
      quiz.userScore = 1;
      quiz.questions = mockQuestions[0].category1;
      quiz.showResult();
      expect(quiz.percentage).toBe("100.0");
      expect(quiz.resultBox.classList.contains("activeResult")).toBeTruthy();
    });

    test("should save quiz data to localStorage", () => {
      quiz.setCategory("category1");
      quiz.userScore = 1;
      quiz.questions = mockQuestions[0].category1;
      quiz.showResult();
      const savedData = JSON.parse(localStorage.getItem("quizData"));
      expect(savedData).toBeDefined();
      expect(savedData.stats.totalQuestions).toBe(1);
    });
  });
});
