// Quiz.test.js
import Quiz from "./Quiz.js";

describe("Quiz Class", () => {
  let quiz;
  let mockQuestions;

  beforeEach(() => {
    // Set up the mock DOM
    document.body.innerHTML = `
      <div class="start_btn"><button>Start</button></div>
      <div class="info_box">
        <div class="buttons">
          <button class="quit">Quit</button>
          <button class="restart">Restart</button>
        </div>
      </div>
      <div class="quiz_box"></div>
      <div class="result_box">
        <div class="score_text"></div>
        <div class="buttons">
          <button class="restart">Restart</button>
          <button class="quit">Quit</button>
        </div>
      </div>
      <div class="option_list"></div>
      <header>
        <div class="time_line"></div>
      </header>
      <div class="timer">
        <div class="time_left_txt"></div>
        <div class="timer_sec"></div>
      </div>
      <footer>
        <div class="next_btn"></div>
        <div class="total_que"></div>
      </footer>
      <div class="total_time"></div>
    `;

    // Mock questions
    mockQuestions = [
      {
        numb: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
      },
    ];

    // Create an instance of Quiz
    quiz = new Quiz(mockQuestions);
  });

  it("should initialize with default values", () => {
    expect(quiz.timeValue).toBe(30);
    expect(quiz.queCount).toBe(0);
    expect(quiz.userScore).toBe(0);
    expect(quiz.errorTotal).toBe(0);
    expect(quiz.percentage).toBe(0);
  });

  it("should show the info box when start button is clicked", () => {
    quiz.startBtn.click();
    expect(
      document.querySelector(".info_box").classList.contains("activeInfo"),
    ).toBe(true);
  });

  it("should start the quiz and show the first question", () => {
    quiz.startQuiz();
    expect(
      document.querySelector(".quiz_box").classList.contains("activeQuiz"),
    ).toBe(true);
    expect(document.querySelector(".que_text").innerHTML).toContain(
      "What is 2 + 2?",
    );
  });

  it("should correctly handle a correct answer", () => {
    quiz.startQuiz();
    const option = document.querySelector(".option");
    option.textContent = "4";
    quiz.optionSelected(option);

    expect(option.classList.contains("correct")).toBe(true);
    expect(quiz.userScore).toBe(1);
  });

  it("should correctly handle an incorrect answer", () => {
    quiz.startQuiz();
    const option = document.querySelector(".option");
    option.textContent = "3";
    quiz.optionSelected(option);

    expect(option.classList.contains("incorrect")).toBe(true);
    expect(quiz.errorTotal).toBe(1);
  });

  it("should update the question counter", () => {
    quiz.updateQuestionCounter(1);
    const counterText = document.querySelector(".total_que").innerHTML;
    expect(counterText).toContain("1 of 1 Questions");
  });

  it("should show the result box with the score", () => {
    quiz.userScore = 1;
    quiz.showResult();
    const resultText = document.querySelector(
      ".result_box .score_text",
    ).innerHTML;
    expect(resultText).toContain("You got 1 out of 1");
  });

  it("should format time correctly", () => {
    const formattedTime = quiz.formatTime(75);
    expect(formattedTime).toBe("01:15");
  });

  it("should increment total time when counter is started", () => {
    jest.useFakeTimers();
    quiz.startTotalTimeCounter();
    jest.advanceTimersByTime(2000);
    expect(quiz.totalTime).toBe(2);
    jest.useRealTimers();
  });

  it("should stop the total time counter", () => {
    jest.useFakeTimers();
    quiz.startTotalTimeCounter();
    quiz.stopTotalTimeCounter();
    jest.advanceTimersByTime(2000);
    expect(quiz.totalTime).toBe(0);
    jest.useRealTimers();
  });
});
