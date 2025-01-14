export default class Quiz {
  constructor(questions, quizData) {
    this.questions = questions;
    this.data = quizData; // Store the quizData object
    this.questions = questions;
    this.timeValue = 30;
    this.queCount = 0;
    this.queNumb = 1;
    this.userScore = 0;
    this.errorTotal = 0; // track errors
    this.percentage = 0; // track percentage
    this.totalTime = 0; // track total time
    this.widthValue = 0;
    this.counter = null;
    this.counterLine = null;

    this.startBtn = document.querySelector(".start_btn .start");
    this.profileBtn = document.querySelector(".start_btn .stats");

    this.profileBox = document.querySelector(".profile_box");
    this.profileQuitBtn = this.profileBox.querySelector(
      ".profile-buttons .quit",
    );

    this.infoBox = document.querySelector(".info_box");
    this.exitBtn = this.infoBox.querySelector(".buttons .quit");
    this.continueBtn = this.infoBox.querySelector(".buttons .restart");

    this.quizBox = document.querySelector(".quiz_box");
    this.resultBox = document.querySelector(".result_box");
    this.optionList = document.querySelector(".option_list");
    this.timeLine = document.querySelector("header .time_line");
    this.timeText = document.querySelector(".timer .time_left_txt");
    this.timeCount = document.querySelector(".timer .timer_sec");
    this.nextBtn = document.querySelector("footer .next_btn");
    this.bottomQueCounter = document.querySelector("footer .total_que");
    this.totalTimeDiv = this.createTotalTimeElement(); // Create total time element
    // Increment a specific test count
    this.incrementTestCount("sample_test");
    this.init();
  }

  init() {
    this.startBtn.onclick = () => this.showInfoBox();
    this.profileBtn.onclick = () => this.showStats();
    this.profileQuitBtn.onclick = () => this.hideProfile();
    this.exitBtn.onclick = () => this.hideInfoBox();
    this.continueBtn.onclick = () => this.startQuiz();
    this.nextBtn.onclick = () => this.nextQuestion();
    this.resultBox.querySelector(".buttons .restart").onclick = () =>
      this.restartQuiz();
    this.resultBox.querySelector(".buttons .quit").onclick = () =>
      window.location.reload();
  }

  showStats() {
    console.log("Show stats!");
    this.profileBox.classList.add("activeProfile");

    // Load quiz data from local storage
    const quizData = JSON.parse(localStorage.getItem("quizData")) || {
      testCounts: {},
      stats: {
        totalTime: 0,
        totalQuestions: 0,
        totalErrors: 0,
      },
    };

    // Update profile stats
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

    totalTimeElement.textContent = this.formatTime(quizData.stats.totalTime);
    questionsAnsweredElement.textContent = quizData.stats.totalQuestions;
    totalErrorsElement.textContent = quizData.stats.totalErrors;
    quizTypesElement.textContent = Object.keys(quizData.testCounts).length;

    // Populate scores
    const scoreListElement = this.profileBox.querySelector(".score-list");
    scoreListElement.innerHTML = ""; // Clear previous entries

    Object.entries(quizData.testCounts).forEach(([quizType, stats]) => {
      const scoreItem = document.createElement("div");
      scoreItem.classList.add("score-item");

      scoreItem.innerHTML = `
        ${quizType}:
        <div class="results">
          <span class="error">${stats.errors || 0}</span>
          <span class="score">${stats.score || 0}%</span>
        </div>
      `;

      scoreListElement.appendChild(scoreItem);
    });
  }

  hideProfile() {
    console.log(`hide stats!!`);
    this.profileBox.classList.remove("activeProfile");
  }

  incrementTestCount(testName) {
    if (!this.data.testCounts[testName]) {
      this.data.testCounts[testName] = 0;
    }
    if (!this.data.totalTimesPlayed) {
      this.data.totalTimesPlayed = 0;
    }
    this.data.testCounts[testName]++;
    this.data.totalTimesPlayed++;

    // Save updated data to local storage
    this.saveQuizData();
  }

  saveQuizData() {
    localStorage.setItem("quizData", JSON.stringify(this.data));
  }

  saveQuizStats() {
    // Retrieve or initialize data
    const quizData = JSON.parse(localStorage.getItem("quizData")) || {
      testCounts: {},
      stats: {
        totalTime: 0,
        totalQuestions: 0,
        totalErrors: 0,
      },
    };

    // Update stats
    quizData.stats.totalTime += this.totalTime;
    quizData.stats.totalQuestions += this.questions.length;
    quizData.stats.totalErrors += this.errorTotal;

    // Update specific test stats
    const currentTest = this.currentQuizType || "General Quiz";
    if (!quizData.testCounts[currentTest]) {
      quizData.testCounts[currentTest] = { errors: 0, score: 0 };
    }
    quizData.testCounts[currentTest].errors += this.errorTotal;
    quizData.testCounts[currentTest].score = this.percentage;

    // Save to local storage
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }

  createTotalTimeElement() {
    const timerContainer = document.querySelector(".total_time");
    const totalTimeDiv = document.createElement("div");
    totalTimeDiv.classList.add("total_time");

    // Initialize the total time dynamically
    totalTimeDiv.innerHTML = `
        <div class=total_txt">Time</div>
        <div class="time">${this.formatTime(this.totalTime)}</div>
  `;

    timerContainer.insertAdjacentElement("afterend", totalTimeDiv);
    return totalTimeDiv.querySelector(".time");
  }

  startTotalTimeCounter() {
    this.totalTimeInterval = setInterval(() => {
      this.totalTime++;
      // Dynamically update the innerHTML with formatted time
      this.totalTimeDiv.innerHTML = this.formatTime(this.totalTime);
    }, 1000);
  }

  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  stopTotalTimeCounter() {
    clearInterval(this.totalTimeInterval);
  }

  showInfoBox() {
    this.infoBox.classList.add("activeInfo");
  }

  hideInfoBox() {
    console.log("hideInfoBox");
    this.infoBox.classList.remove("activeInfo");
  }

  startQuiz() {
    this.hideInfoBox();
    this.quizBox.classList.add("activeQuiz");
    this.showQuestion(this.queCount);
    this.updateQuestionCounter(this.queNumb);
    this.startTimer(this.timeValue);
    this.startTimerLine(this.widthValue);
    this.startTotalTimeCounter(); // Start total time counter
  }

  showQuestion(index) {
    const queText = document.querySelector(".que_text");
    const question = this.questions[index];

    // Shuffle the options array
    const shuffledOptions = question.options.sort(() => Math.random() - 0.5);

    let queTag = `<span>${question.numb} ${question.question}</span>`;
    let optionTag = shuffledOptions
      .map((option) => `<div class="option"><span>${option}</span></div>`)
      .join("");

    queText.innerHTML = queTag;
    this.optionList.innerHTML = optionTag;

    const options = this.optionList.querySelectorAll(".option");
    options.forEach((option) =>
      option.setAttribute("onclick", "quiz.optionSelected(this)"),
    );
  }

  optionSelected(answer) {
    clearInterval(this.counter);
    clearInterval(this.counterLine);

    let userAns = answer.textContent.trim();
    let correctAns = this.questions[this.queCount].answer.trim();

    if (userAns.toLowerCase() === correctAns.toLowerCase()) {
      this.userScore++;
      answer.classList.add("correct");
      answer.insertAdjacentHTML("beforeend", this.getTickIcon());
    } else {
      this.errorTotal++; // Increment error count for incorrect answers
      answer.classList.add("incorrect");
      answer.insertAdjacentHTML("beforeend", this.getCrossIcon());

      const options = this.optionList.children;
      for (let i = 0; i < options.length; i++) {
        if (options[i].textContent.trim() === correctAns) {
          options[i].classList.add("correct");
          options[i].insertAdjacentHTML("beforeend", this.getTickIcon());
        }
      }
    }

    [...this.optionList.children].forEach((child) =>
      child.classList.add("disabled"),
    );
    this.nextBtn.classList.add("show");
  }

  updateQuestionCounter(index) {
    this.bottomQueCounter.innerHTML = `
        <span>
            <p>${index}</p> of <p>${this.questions.length}</p> Questions | Errors: <p>${this.errorTotal}</p>
        </span>`;
  }

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

  nextQuestion() {
    if (this.queCount < this.questions.length - 1) {
      this.queCount++;
      this.queNumb++;
      this.showQuestion(this.queCount);
      this.updateQuestionCounter(this.queNumb);
      clearInterval(this.counter);
      clearInterval(this.counterLine);
      this.startTimer(this.timeValue);
      this.startTimerLine(this.widthValue);
      this.timeText.textContent = "Time Left";
      this.nextBtn.classList.remove("show");
    } else {
      clearInterval(this.counter);
      clearInterval(this.counterLine);
      this.showResult();
    }
  }

  restartQuiz() {
    this.quizBox.classList.add("activeQuiz");
    this.resultBox.classList.remove("activeResult");
    this.resetValues();
    this.showQuestion(this.queCount);
    this.updateQuestionCounter(this.queNumb);
    this.startTimer(this.timeValue);
    this.startTimerLine(this.widthValue);
    this.timeText.textContent = "Time Left";
    this.nextBtn.classList.remove("show");
  }

  resetValues() {
    this.timeValue = 30;
    this.queCount = 0;
    this.queNumb = 1;
    this.userScore = 0;
    this.percentage = 0; // Reset percentage
    this.totalTime = 0; // Reset total time
    this.widthValue = 0;

    // Reset total time display
    this.totalTimeDiv.textContent = "00:00";
  }

  showResult() {
    this.infoBox.classList.remove("activeInfo");
    this.quizBox.classList.remove("activeQuiz");
    this.resultBox.classList.add("activeResult");

    // super.showResult(); // Call the original method
    // this.saveQuizStats(); // Save stats after completing the quiz

    // Stop total time counter when the quiz ends
    this.stopTotalTimeCounter();

    // Calculate percentage
    this.percentage = ((this.userScore / this.questions.length) * 100).toFixed(
      1,
    );

    this.errorTotal = this.questions.length - this.userScore;

    // Format the total time
    const formattedTotalTime = this.formatTime(this.totalTime);

    // Update the result display
    const scoreText = this.resultBox.querySelector(".score_text");
    let scoreTag = "";

    this.data.stats.totalTime += formattedTotalTime;
    this.data.stats.totalErrors += this.errorTotal;
    this.data.stats.totalQuestions += this.questions.length;
    this.data.score.noun_gender.error = this.errorTotal;
    this.data.score.noun_gender.score = this.percentage;

    // Save updated data to local storage
    this.saveQuizData();

    if (this.percentage > 90) {
      scoreTag = `
      <span>Great! 🎉 <p>${this.percentage}</p>% of <p>100</p></span>
      <span>Time: <p>${formattedTotalTime}</p></span>
    `;
    } else if (this.percentage > 50) {
      scoreTag = `
      <span>Nice 😎 <p>${this.percentage}</p>% of <p>100</p></span>
      <span>Time: <p>${formattedTotalTime}</p></span>
    `;
    } else {
      scoreTag = `
      <span>Sorry 😐 Only <p>${this.percentage}</p>% of <p>100</p></span>
      <span>Time: <p>${formattedTotalTime}</p></span>
    `;
    }

    scoreText.innerHTML = scoreTag;
  }

  startTimer(time) {
    this.counter = setInterval(() => {
      this.timeCount.textContent = time;
      12;
      time--;
      if (time < 9)
        this.timeCount.textContent = "0" + this.timeCount.textContent;
      if (time < 0) this.handleTimeOut();
    }, 1000);
  }

  handleTimeOut() {
    clearInterval(this.counter);
    this.timeText.textContent = "Time Off";
    const correctAns = this.questions[this.queCount].answer;
    [...this.optionList.children].forEach((option) => {
      if (option.textContent.trim() === correctAns) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", this.getTickIcon());
      }
      option.classList.add("disabled");
    });
    this.nextBtn.classList.add("show");
  }

  startTimerLine(time) {
    this.counterLine = setInterval(() => {
      time++;
      this.timeLine.style.width = time + "px";
      if (time > 549) clearInterval(this.counterLine);
    }, 57);
  }
}
