export class UIManager {
  constructor() {
    this.initializeElements();
  }

  initializeElements() {
    this.startBtn = document.querySelector(".start_btn .start");
    this.profileBtn = document.querySelector(".start_btn .stats");
    this.profileBox = document.querySelector(".profile_box");
    this.infoBox = document.querySelector(".info_box");
    this.quizBox = document.querySelector(".quiz_box");
    this.resultBox = document.querySelector(".result_box");
    this.optionList = document.querySelector(".option_list");
    this.profileQuitBtn = document.querySelector(".profile-buttons .quit");
    this.exitBtn = document.querySelector(".buttons .quit");
    this.continueBtn = document.querySelector(".buttons .restart");
    this.nextBtn = document.querySelector("footer .next_btn");
    this.bottomQueCounter = document.querySelector("footer .total_que");
    this.timeLine = document.querySelector("header .time_line");
    this.timeText = document.querySelector(".timer .time_left_txt");
    this.timeCount = document.querySelector(".timer .timer_sec");

    // ... initialize other UI elements
  }

  showQuestion(question, options) {
    const queText = document.querySelector(".que_text");
    let queTag = `<span>${question.numb} ${question.question}</span>`;
    let optionTag = options
      .map((option) => `<div class="option"><span>${option}</span></div>`)
      .join("");

    queText.innerHTML = queTag;
    this.optionList.innerHTML = optionTag;
  }

  updateQuestionCounter(current, total, errors) {
    this.bottomQueCounter.innerHTML = `
            <span>
                <p>${current}</p> of <p>${total}</p> Questions | Errors: <p>${errors}</p>
            </span>`;
  }

  showResult(percentage, totalTime, errorTotal) {
    this.infoBox.classList.remove("activeInfo");
    this.quizBox.classList.remove("activeQuiz");
    this.resultBox.classList.add("activeResult");

    const scoreText = this.resultBox.querySelector(".score_text");
    scoreText.innerHTML = this.generateScoreTag(
      percentage,
      totalTime,
      errorTotal,
    );
  }

  generateScoreTag(percentage, formattedTime, errorTotal) {
    if (percentage > 90) {
      return `
                <span>Great! 🎉 <p>${percentage}</p>% of <p>100</p></span>
                <span>Errors: <p>${errorTotal}</p></span>
                <span>Time: <p>${formattedTime}</p></span>
            `;
    } else if (percentage > 50) {
      return `
                <span>Nice 😎 <p>${percentage}</p>% of <p>100</p></span>
                <span>Errors: <p>${errorTotal}</p></span>
                <span>Time: <p>${formattedTime}</p></span>
            `;
    }
    return `
            <span>Sorry 😐 Only <p>${percentage}</p>% of <p>100</p></span>
            <span>Errors: <p>${errorTotal}</p></span>             
            <span>Time: <p>${formattedTime}</p></span>
        `;
  }

  showCorrectAnswer(correctAns) {
    const options = this.optionList.children;
    for (let option of options) {
      if (option.textContent.trim() === correctAns) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", this.getTickIcon());
        break;
      }
    }
  }

  markOptionCorrect(option) {
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", this.getTickIcon());
  }

  markOptionIncorrect(option) {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", this.getCrossIcon());
  }

  disableOptions() {
    const options = this.optionList.children;
    for (let option of options) {
      option.classList.add("disabled");
    }
  }

  showNextButton() {
    this.nextBtn.classList.add("show");
  }

  hideNextButton() {
    this.nextBtn.classList.remove("show");
  }

  updateTotalTime(time) {
    console.log(`updateTotalTime(): ${time}`);
    const totalTimeDiv = document.querySelector(".total_time .time");

    // Debug checks
    if (!totalTimeDiv) {
      console.error("Could not find .total_time element");
      return;
    }

    // Force a refresh by using innerHTML instead of textContent
    totalTimeDiv.innerHTML = `${time}`;

    // Verify the update in console
    console.log("Updated total time to:", totalTimeDiv.innerHTML);
  }

  updateProfileStats(
    totalTime,
    totalQuestions,
    totalErrors,
    testCountLength,
    scores,
  ) {
    console.log("updateProfileStats() - received data:", {
      totalTime,
      totalQuestions,
      totalErrors,
      testCountLength,
      scores,
    });

    const totalTimeElement = this.profileBox.querySelector(
      ".stat:nth-child(1) span",
    );
    const questionsAnsweredElement = this.profileBox.querySelector(
      ".stat:nth-child(2) span",
    );
    const totalErrorsElement = this.profileBox.querySelector(
      ".stat:nth-child(3) span",
    );
    const quizTypesElement = this.profileBox.querySelector(
      ".stat:nth-child(4) span",
    );

    // Set values directly from parameters
    totalTimeElement.textContent = totalTime;
    questionsAnsweredElement.textContent = totalQuestions || 0;
    totalErrorsElement.textContent = totalErrors || 0;
    quizTypesElement.textContent = testCountLength;

    // Update score list
    const scoreListElement = this.profileBox.querySelector(".score-list");
    if (!scoreListElement) {
      console.error("Score list element not found");
      return;
    }

    scoreListElement.innerHTML = "";

    // Safe iteration over scores
    if (scores) {
      Object.entries(scores).forEach(([quizType, stats]) => {
        const scoreItem = document.createElement("div");
        scoreItem.classList.add("score-item");
        scoreItem.innerHTML = `
        <div class="quiz-type">${quizType}:</div>
        <div class="results">
          <span class="score">Times: ${stats?.played || 0}</span>
          <span class="error">Error: ${stats?.error || 0}</span>
          <span class="score">Score: ${stats?.score || 0}%</span>
        </div>
      `;
        scoreListElement.appendChild(scoreItem);
      });
    }
  }

  // Helper methods
  getTickIcon() {
    return `
      <div class="icon tick">
        <i class="fas fa-check"></i>
      </div>`;
  }

  getCrossIcon() {
    return `
      <div class="icon cross">
        <i class="fas fa-times"></i>
      </div>`;
  }

  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}
