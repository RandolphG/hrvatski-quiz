/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/classes/Quiz.js":
/*!********************************!*\
  !*** ./public/classes/Quiz.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Quiz)
/* harmony export */ });
class Quiz {
  constructor(questions, quizData) {
    // Parse questions from the nested data format
    // Save original nested data
    this.originalQuestionsData = questions;
    this.questions = [];
    // Active category for filtering questions
    this.category = null;
    this.totalTimeInterval = null;
    // To store category-specific questions
    this.filteredQuestions = [];

    // Store the quizData object
    this.data = quizData;
    this.questions = questions;
    this.timeValue = 30;
    this.queCount = 0;
    this.queNumb = 1;
    this.userScore = 0;
    this.errorTotal = 0;
    this.percentage = 0;
    this.totalTime = 0;
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
    this.totalTimeDiv = this.createTotalTimeElement();
    // Increment a specific test count

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

  // Parse the nested question data format into a flat array of questions
  parseQuestions(questionsData) {
    const parsedQuestions = [];
    questionsData.forEach((category) => {
      Object.values(category).forEach((questionsArray) => {
        parsedQuestions.push(...questionsArray);
      });
    });
    return parsedQuestions;
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

    // Iterate over the `score` object to populate score items
    Object.entries(quizData.score).forEach(([quizType, stats]) => {
      const scoreItem = document.createElement("div");
      scoreItem.classList.add("score-item");

      scoreItem.innerHTML = `
      <div class="quiz-type">${quizType}:</div>
      <div class="results">
        <span class="score">Times: ${stats.played || 0}</span>
        <span class="error">Err0r: ${stats.error || 0}</span>
        <span class="score">Score: ${stats.score || 0}%</span>
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
    quizData.stats.totalTime += this.totalTime; // Correctly add numerical value
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

  setCategory(category) {
    this.category = category;
    const filteredData = this.originalQuestionsData.find(
      (cat) => cat[category],
    );
    if (filteredData) {
      this.questions = filteredData[category];
    } else {
      console.warn(`Category "${category}" not found.`);
      this.questions = [];
    }
  }

  startQuiz() {
    if (!this.questions.length) {
      console.error("No questions available for the selected category.");
      return;
    }
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
      // option.setAttribute("onclick", "quiz.optionSelected(this)"),
      option.addEventListener("click", () => this.optionSelected(option)),
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

    // Stop total time counter
    this.stopTotalTimeCounter();

    // Calc percentage correct
    this.percentage = ((this.userScore / this.questions.length) * 100).toFixed(
      1,
    );

    // Calc the total error
    this.errorTotal = this.questions.length - this.userScore;

    // Format the total time
    const formattedTotalTime = this.formatTime(this.totalTime);

    // Update the result display
    const scoreText = this.resultBox.querySelector(".score_text");
    let scoreTag = "";

    // Ensure the category exists in the score object
    if (!this.data.score[this.category]) {
      this.data.score[this.category] = { played: 0, error: 0, score: 0 };
    }

    this.data.stats.totalTime += this.totalTime;
    this.data.stats.totalErrors += this.errorTotal;
    this.data.stats.totalQuestions += this.questions.length;

    // Update category-specific stats
    this.data.score[this.category].played++;
    this.data.score[this.category].error = this.errorTotal;
    this.data.score[this.category].score = this.percentage;

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

    // Save updated data to local storage
    this.saveQuizData();
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
    this.timeText.textContent = "TimeOut";
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


/***/ }),

/***/ "./public/library.js":
/*!***************************!*\
  !*** ./public/library.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chapter_1_questions: () => (/* binding */ chapter_1_questions),
/* harmony export */   example: () => (/* binding */ example),
/* harmony export */   mup_questions: () => (/* binding */ mup_questions)
/* harmony export */ });
const chapter_1_questions = [
  {
    gender: [
      {
        numb: 1,
        question: "What is the gender of the Croatian word 'muškàrac' (man)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 2,
        question: "What is the gender of the Croatian word 'sèlo' (village)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 3,
        question: "What is the gender of the Croatian word 'žèna' (woman)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 4,
        question: "What is the gender of the Croatian word 'òtac' (father)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 5,
        question: "What is the gender of the Croatian word 'pìsmo' (letter)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 6,
        question: "What is the gender of the Croatian word 'majka' (mother)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 7,
        question: "What is the gender of the Croatian word 'brat' (brother)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 8,
        question: "What is the gender of the Croatian word 'pivo' (beer)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 9,
        question: "What is the gender of the Croatian word 'sèstra' (sister)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 10,
        question: "What is the gender of the Croatian word 'Jòvan' (name)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 11,
        question: "What is the gender of the Croatian word 'grlo' (throat)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 12,
        question: "What is the gender of the Croatian word 'Màra' (name)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 13,
        question: "What is the gender of the Croatian word 'pas' (dog)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 14,
        question: "What is the gender of the Croatian word 'more' (sea)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 15,
        question: "What is the gender of the Croatian word 'mačka' (cat)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 16,
        question: "What is the gender of the Croatian word 'pròzor' (window)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 17,
        question:
          "What is the gender of the Croatian word 'pìtanje' (question)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 18,
        question: "What is the gender of the Croatian word 'kuća' (house)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 19,
        question: "What is the gender of the Croatian word 'pàpir' (paper)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 20,
        question: "What is the gender of the Croatian word 'polje' (field)?",
        answer: "Neuter",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 21,
        question: "What is the gender of the Croatian word 'òlovka' (pencil)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
    ],
    nouns_of_professions_and_nationalities: [
      {
        numb: 1,
        question:
          "What is the gender of the Croatian word 'stùdent' (university student)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 2,
        question:
          "What is the gender of the Croatian word 'stùdentica' (university student, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 3,
        question:
          "What is the gender of the Croatian word 'profesor' (professor, teacher)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 4,
        question:
          "What is the gender of the Croatian word 'profesòrica' (professor, teacher, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 5,
        question:
          "What is the gender of the Croatian word 'nàstavnik' (teacher, instructor)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 6,
        question:
          "What is the gender of the Croatian word 'nàstavnica' (teacher, instructor, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 7,
        question:
          "What is the gender of the Croatian word 'učenik' (student, pupil)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 8,
        question:
          "What is the gender of the Croatian word 'učenica' (student, pupil, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 9,
        question:
          "What is the gender of the Croatian word 'Amerikànac' (American, male)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 10,
        question:
          "What is the gender of the Croatian word 'Amerìkanka' (American, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 11,
        question:
          "What is the gender of the Croatian word 'Ènglez' (Englishman)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 12,
        question:
          "What is the gender of the Croatian word 'Èngleskinja' (Englishwoman)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 13,
        question:
          "What is the gender of the Croatian word 'Bosànac' (Bosnian, male)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 14,
        question:
          "What is the gender of the Croatian word 'Bòsanka' (Bosnian, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 15,
        question:
          "What is the gender of the Croatian word 'Hr̀vat' (Croat, male)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 16,
        question:
          "What is the gender of the Croatian word 'Hrvàtica' (Croat, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 17,
        question:
          "What is the gender of the Croatian word 'Srbin' (Serb, male)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 18,
        question:
          "What is the gender of the Croatian word 'Srpkinja' (Serb, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 19,
        question:
          "What is the gender of the Croatian word 'Crnògorac' (Montenegrin, male)?",
        answer: "Masculine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
      {
        numb: 20,
        question:
          "What is the gender of the Croatian word 'Crnògorka' (Montenegrin, female)?",
        answer: "Feminine",
        options: ["Masculine", "Feminine", "Neuter"],
      },
    ],
    verb_biti: [
      {
        numb: 1,
        question:
          "What is the full form of the 1st person singular present tense of the verb 'biti'?",
        answer: "jesam",
        options: ["jesam", "sam", "nisi"],
      },
      {
        numb: 2,
        question:
          "What is the clitic form of the 2nd person singular present tense of the verb 'biti'?",
        answer: "si",
        options: ["si", "jesi", "nisi"],
      },
      {
        numb: 3,
        question:
          "What is the negated form of the 3rd person plural present tense of the verb 'biti'?",
        answer: "nisu",
        options: ["nisu", "niće", "jesu"],
      },
      {
        numb: 4,
        question:
          "What is the full form of the 2nd person plural present tense of the verb 'biti'?",
        answer: "jeste",
        options: ["jeste", "ste", "jesmo"],
      },
      {
        numb: 5,
        question:
          "What is the negated form of the 1st person plural present tense of the verb 'biti'?",
        answer: "nismo",
        options: ["nismo", "jesmo", "nije"],
      },
      {
        numb: 6,
        question:
          "What is the clitic form of the 3rd person singular present tense of the verb 'biti'?",
        answer: "je",
        options: ["je", "jest", "jesu"],
      },
      {
        numb: 7,
        question:
          "Which form of the 3rd person singular full form is more commonly used in Croatian?",
        answer: "jest",
        options: ["jest", "jeste", "jesu"],
      },
      {
        numb: 8,
        question:
          "What is the full form of the 3rd person plural present tense of the verb 'biti'?",
        answer: "jesu",
        options: ["jesu", "jesmo", "jeste"],
      },
      {
        numb: 9,
        question:
          "What is the negated form of the 3rd person singular present tense of the verb 'biti'?",
        answer: "nije",
        options: ["nije", "nisam", "niće"],
      },
      {
        numb: 10,
        question:
          "What prefix is added to the clitic form to create negated forms of the verb 'biti'?",
        answer: "ni-",
        options: ["ni-", "je-", "ne-"],
      },
    ],
    yes_no_questions: [
      {
        numb: 1,
        question: "_____ li vi stùdent?",
        answer: "Jèste",
        options: ["Jèste", "je", "jesmo", "jesu", "jest"],
      },
      {
        numb: 2,
        question: "_____ li òni Amerikànci?",
        answer: "Jèsu",
        options: ["Jèsu", "jeste", "jesmo", "je", "jest"],
      },
      {
        numb: 3,
        question: "_____ li ovo tvoje pìsmo?",
        answer: "Je",
        options: ["Je", "jest", "jesu", "jeste", "jesmo"],
      },
      {
        numb: 4,
        question: "_____ li ti Bosanac?",
        answer: "Jesi",
        options: ["Jesi", "je", "jesu", "jesmo", "jest"],
      },
      {
        numb: 5,
        question: "_____ li mi spremni?",
        answer: "Jesmo",
        options: ["Jesmo", "jeste", "jesu", "je", "jest"],
      },
      {
        numb: 6,
        question: "_____ li ti profesor?",
        answer: "Jesi",
        options: ["Jesi", "jesu", "jesmo", "je", "jeste"],
      },
      {
        numb: 7,
        question: "_____ li ona Hrvatica?",
        answer: "Je",
        options: ["Je", "jest", "jesmo", "jesu", "jeste"],
      },
      {
        numb: 8,
        question: "_____ li vi iz Zagreba?",
        answer: "Jeste",
        options: ["Jeste", "jesmo", "jesu", "je", "jest"],
      },
      {
        numb: 9,
        question: "_____ li ovi ljudi u školi?",
        answer: "Jèsu",
        options: ["Jèsu", "jesmo", "jeste", "je", "jest"],
      },
      {
        numb: 10,
        question: "_____ li ovo vaša kuća?",
        answer: "Je",
        options: ["Je", "jeste", "jesmo", "jesu", "jest"],
      },
      {
        numb: 11,
        question: "_____ li oni prijatelji?",
        answer: "Jèsu",
        options: ["Jèsu", "jeste", "jesmo", "je", "jesi"],
      },
      {
        numb: 12,
        question: "_____ li vi na večeri?",
        answer: "Jeste",
        options: ["Jeste", "jesmo", "jesu", "je", "jesi"],
      },
      {
        numb: 13,
        question: "_____ li ja spreman za test?",
        answer: "Jesam",
        options: ["Jesam", "jesi", "jesmo", "jesu", "je"],
      },
      {
        numb: 14,
        question: "_____ li njih dvoje studenti?",
        answer: "Jèsu",
        options: ["Jèsu", "jesmo", "jeste", "je", "jest"],
      },
      {
        numb: 15,
        question: "_____ li ona profesorica?",
        answer: "Je",
        options: ["Je", "jeste", "jesmo", "jesu", "jesi"],
      },
      {
        numb: 16,
        question: "_____ li ovo vaše knjige?",
        answer: "Je",
        options: ["Je", "jesu", "jesmo", "jeste", "jesi"],
      },
      {
        numb: 17,
        question: "_____ li mi sretni?",
        answer: "Jesmo",
        options: ["Jesmo", "jesu", "jeste", "je", "jesi"],
      },
      {
        numb: 18,
        question: "_____ li vi umorni?",
        answer: "Jeste",
        options: ["Jeste", "jesu", "jesmo", "je", "jesi"],
      },
      {
        numb: 19,
        question: "_____ li ovi ljudi iz Hrvatske?",
        answer: "Jèsu",
        options: ["Jèsu", "jesmo", "jeste", "je", "jesi"],
      },
      {
        numb: 20,
        question: "_____ li on iz Beograda?",
        answer: "Je",
        options: ["Je", "jesu", "jeste", "jesmo", "jesi"],
      },
    ],
    conjunctions: [
      {
        numb: 1,
        question: "_____ li vi student?",
        answer: "Jèste",
        options: ["Jèste", "je", "jesmo", "jesu", "jest"],
      },
      {
        numb: 2,
        question: "Kako _____ Marko i Ana došli ovde?",
        answer: "i",
        options: ["i", "a", "ali", "ili", "ii"],
      },
      {
        numb: 3,
        question: "Bio je umoran, _____ nastavio je raditi.",
        answer: "ali",
        options: ["ali", "i", "a", "ili", "ii"],
      },
      {
        numb: 4,
        question: "Danas ćemo jesti _____ ribu _____ meso.",
        answer: "ili ... ili",
        options: ["i ... i", "ili ... ili", "a ... a", "ali ... ali", "ii"],
      },
      {
        numb: 5,
        question: "On voli čaj, _____ ponekad pije kafu.",
        answer: "a",
        options: ["a", "ali", "i", "ili", "ii"],
      },
      {
        numb: 6,
        question: "Došli su _____ Marko _____ Ana.",
        answer: "i ... i",
        options: ["i ... i", "a ... a", "ili ... ili", "ali ... ali", "ii"],
      },
      {
        numb: 7,
        question: "Rekao je da će stići, _____ nije došao.",
        answer: "ali",
        options: ["ali", "a", "i", "ili", "ii"],
      },
      {
        numb: 8,
        question: "Ne znam da li je _____ došao _____ nije.",
        answer: "ili ... ili",
        options: ["ili ... ili", "a ... a", "i ... i", "ali ... ali", "ii"],
      },
      {
        numb: 9,
        question: "_____ ti tako misliš?",
        answer: "A",
        options: ["A", "i", "ali", "ili", "ii"],
      },
      {
        numb: 10,
        question: "Knjiga je bila teška, _____ sam je završio.",
        answer: "ali",
        options: ["ali", "a", "i", "ili", "ii"],
      },
      {
        numb: 11,
        question: "Voli i kafu _____ čaj.",
        answer: "i",
        options: ["i", "a", "ali", "ili", "ii"],
      },
      {
        numb: 12,
        question: "_____ vi razumete ovo?",
        answer: "A",
        options: ["A", "ali", "i", "ili", "ii"],
      },
      {
        numb: 13,
        question: "_____ Marko _____ Ana su stigli kasno.",
        answer: "I ... i",
        options: ["I ... i", "Ali ... ali", "A ... a", "Ili ... ili", "ii"],
      },
      {
        numb: 14,
        question: "Nisam siguran da li _____ znaš odgovor.",
        answer: "i",
        options: ["i", "ali", "a", "ili", "ii"],
      },
      {
        numb: 15,
        question: "Rekao je nešto, _____ nisam ga razumeo.",
        answer: "ali",
        options: ["ali", "a", "i", "ili", "ii"],
      },
      {
        numb: 16,
        question: "_____, to je vrlo važno!",
        answer: "I",
        options: ["I", "A", "Ali", "Ili", "ii"],
      },
      {
        numb: 17,
        question: "Da li voliš _____ voće _____ povrće?",
        answer: "ili ... ili",
        options: ["ili ... ili", "a ... a", "i ... i", "ali ... ali", "ii"],
      },
      {
        numb: 18,
        question: "Pričao je o tome, _____ nisam shvatila sve.",
        answer: "ali",
        options: ["ali", "i", "a", "ili", "ii"],
      },
      {
        numb: 19,
        question: "_____, možemo ići zajedno.",
        answer: "I",
        options: ["I", "A", "Ali", "Ili", "ii"],
      },
      {
        numb: 20,
        question: "_____, je li ovo tačno?",
        answer: "A",
        options: ["A", "i", "ali", "ili", "ii"],
      },
    ],
    possessive_pronominal_adjectives: [
      {
        numb: 1,
        question: "Ovo je _____ knjiga.",
        answer: "moja",
        options: ["moja", "tvoja", "njena", "naša", "vaša"],
      },
      {
        numb: 2,
        question: "Da li je ovo _____ kuća?",
        answer: "tvoja",
        options: ["moja", "tvoja", "njena", "naša", "vaša"],
      },
      {
        numb: 3,
        question: "Oni su prodali _____ auto.",
        answer: "svoj",
        options: ["svoj", "moj", "tvoj", "njen", "naš"],
      },
      {
        numb: 4,
        question: "Da li ste vi zaboravili _____ pasoš?",
        answer: "vaš",
        options: ["vaš", "tvoj", "moj", "njen", "njihov"],
      },
      {
        numb: 5,
        question: "Ona traži _____ telefon.",
        answer: "svoj",
        options: ["svoj", "tvoj", "njihov", "naš", "njen"],
      },
      {
        numb: 6,
        question: "_____ mišljenje je drugačije od mog.",
        answer: "Tvoje",
        options: ["Tvoje", "Vaše", "Njeno", "Naše", "Njihovo"],
      },
      {
        numb: 7,
        question: "Ovo su _____ stvari.",
        answer: "naše",
        options: ["naše", "moje", "njihove", "vaše", "tvoje"],
      },
      {
        numb: 8,
        question: "_____ kuća je blizu reke.",
        answer: "Njena",
        options: ["Njena", "Naša", "Moja", "Vaša", "Tvoja"],
      },
      {
        numb: 9,
        question: "Da li je ovo _____ jakna?",
        answer: "njegova",
        options: ["njegova", "njen", "njihova", "tvoja", "naša"],
      },
      {
        numb: 10,
        question: "Oni su zaboravili _____ stvari kod kuće.",
        answer: "svoje",
        options: ["svoje", "naše", "njene", "vaše", "tvoje"],
      },
      {
        numb: 11,
        question: "Ovo je _____ torba.",
        answer: "moj",
        options: ["moj", "njen", "njihov", "tvoj", "vaš"],
      },
      {
        numb: 12,
        question: "Da li ste vi doneli _____ knjige?",
        answer: "vaše",
        options: ["vaše", "tvoje", "moje", "njihove", "njene"],
      },
      {
        numb: 13,
        question: "Ovo je _____ stan.",
        answer: "njihov",
        options: ["njihov", "naš", "vaš", "tvoj", "njen"],
      },
      {
        numb: 14,
        question: "Ovo je _____ sestra.",
        answer: "njezina",
        options: ["njezina", "njena", "moj", "naša", "vaša"],
      },
      {
        numb: 15,
        question: "On je zaboravio _____ torbu.",
        answer: "svoju",
        options: ["svoju", "tvoju", "moju", "njegovu", "našu"],
      },
      {
        numb: 16,
        question: "Da li ste vi izgubili _____ ključeve?",
        answer: "vaše",
        options: ["vaše", "tvoje", "njihove", "njene", "moje"],
      },
      {
        numb: 17,
        question: "_____ automobil je parkiran ispred kuće.",
        answer: "Moj",
        options: ["Moj", "Tvoj", "Njihov", "Naš", "Vaš"],
      },
      {
        numb: 18,
        question: "Da li je to _____ ideja?",
        answer: "tvoja",
        options: ["tvoja", "njena", "njihova", "naša", "moja"],
      },
      {
        numb: 19,
        question: "Oni su zaboravili _____ rančeve kod kuće.",
        answer: "svoje",
        options: ["svoje", "njihove", "naše", "njegove", "tvoje"],
      },
      {
        numb: 20,
        question: "_____ porodica živi u Zagrebu.",
        answer: "Njena",
        options: ["Njena", "Naša", "Njihova", "Tvoja", "Vaša"],
      },
      {
        numb: 21,
        question: "Da li ste vi odneli _____ dokumente?",
        answer: "vaše",
        options: ["vaše", "njihove", "moje", "tvoje", "svoje"],
      },
      {
        numb: 22,
        question: "Ovo je _____ škola.",
        answer: "naša",
        options: ["naša", "njihova", "tvoja", "moja", "vaša"],
      },
      {
        numb: 23,
        question: "Oni su prodali _____ kuću.",
        answer: "svoju",
        options: ["svoju", "njihovu", "našu", "moju", "tvoju"],
      },
      {
        numb: 24,
        question: "_____ roditelji su veoma ljubazni.",
        answer: "Njeni",
        options: ["Njeni", "Naši", "Vaši", "Njihovi", "Tvoji"],
      },
      {
        numb: 25,
        question: "On je doneo _____ laptop.",
        answer: "svoj",
        options: ["svoj", "njegov", "moj", "tvoj", "njihov"],
      },
      {
        numb: 26,
        question: "Da li ste vi ostavili _____ kaput?",
        answer: "vaš",
        options: ["vaš", "njihov", "moj", "tvoj", "njen"],
      },
      {
        numb: 27,
        question: "Ovo su _____ deca.",
        answer: "naša",
        options: ["naša", "njihova", "vaša", "moja", "tvoja"],
      },
      {
        numb: 28,
        question: "_____ posao je veoma važan.",
        answer: "Njegov",
        options: ["Njegov", "Naš", "Vaš", "Tvoj", "Njihov"],
      },
      {
        numb: 29,
        question: "Oni su odneli _____ stvari na put.",
        answer: "svoje",
        options: ["svoje", "njihove", "naše", "vaše", "tvoje"],
      },
      {
        numb: 30,
        question: "Da li je to _____ mačka?",
        answer: "njihova",
        options: ["njihova", "njen", "moja", "vaša", "naša"],
      },
    ],
    demonstrative_pronominal_adjectives: [
      {
        numb: 1,
        question:
          "Which word would you use to describe something close to the speaker?",
        answer: "ovaj",
        options: ["ovaj", "taj", "onaj", "njihov", "moj"],
      },
      {
        numb: 2,
        question:
          "Which demonstrative adjective indicates something neutral or closer to the listener?",
        answer: "taj",
        options: ["taj", "ovaj", "onaj", "njihov", "naš"],
      },
      {
        numb: 3,
        question:
          "Which word means something far from both the speaker and listener?",
        answer: "onaj",
        options: ["onaj", "taj", "ovaj", "vaš", "njihova"],
      },
      {
        numb: 4,
        question: "Da li ti se sviđa _____ pas? (close to speaker)",
        answer: "ovaj",
        options: ["ovaj", "taj", "onaj", "njihov", "moj"],
      },
      {
        numb: 5,
        question:
          "Koji od ovih automobila ti se više sviđa, _____ ili _____? (close to speaker vs. neutral)",
        answer: "ovaj ... taj",
        options: [
          "ovaj ... taj",
          "taj ... onaj",
          "onaj ... ovaj",
          "njihov ... vaš",
          "moj ... njihov",
        ],
      },
      {
        numb: 6,
        question: "_____ kuća je blizu reke. (neutral position)",
        answer: "Taj",
        options: ["Taj", "Ovaj", "Onaj", "Vaš", "Njegov"],
      },
      {
        numb: 7,
        question:
          "Da li si video _____ planinu? (far from speaker and listener)",
        answer: "onaj",
        options: ["onaj", "taj", "ovaj", "njihov", "tvoj"],
      },
      {
        numb: 8,
        question: "Ovo je moj sto, a _____ je tvoj. (neutral position)",
        answer: "taj",
        options: ["taj", "onaj", "ovaj", "njihov", "moj"],
      },
      {
        numb: 9,
        question:
          "Kako ti se čini _____ zgrada tamo? (far from speaker and listener)",
        answer: "onaj",
        options: ["onaj", "taj", "ovaj", "njihova", "naša"],
      },
      {
        numb: 10,
        question:
          "Which demonstrative is used for an object someone is holding?",
        answer: "ovaj",
        options: ["ovaj", "taj", "onaj", "njihov", "vaš"],
      },
      {
        numb: 11,
        question:
          "_____ pas koji stoji pored tebe je simpatičan. (neutral position)",
        answer: "Taj",
        options: ["Taj", "Ovaj", "Onaj", "Njihov", "Naš"],
      },
      {
        numb: 12,
        question:
          "Da li ti se sviđa _____ film koji smo gledali? (far from speaker and listener)",
        answer: "onaj",
        options: ["onaj", "taj", "ovaj", "njihov", "vaš"],
      },
      {
        numb: 13,
        question: "Kako se zove _____ devojka ovde? (close to speaker)",
        answer: "ovaj",
        options: ["ovaj", "taj", "onaj", "njihova", "naša"],
      },
      {
        numb: 14,
        question:
          "Which demonstrative adjective is closest in meaning to 'this' in English?",
        answer: "ovaj",
        options: ["ovaj", "taj", "onaj", "njihova", "moj"],
      },
      {
        numb: 15,
        question:
          "Which demonstrative adjective is closest in meaning to 'that' in English?",
        answer: "taj",
        options: ["taj", "ovaj", "onaj", "njihov", "vaš"],
      },
      {
        numb: 16,
        question: "_____ knjiga na stolu je moja. (close to speaker)",
        answer: "Ova",
        options: ["Ova", "Ta", "Ona", "Njegova", "Vaša"],
      },
      {
        numb: 17,
        question: "_____ ptica na grani mi se mnogo dopada. (neutral position)",
        answer: "Ta",
        options: ["Ta", "Ova", "Ona", "Naša", "Njihova"],
      },
      {
        numb: 18,
        question:
          "Kako ti se sviđa _____ selo koje smo posetili prošle godine? (far from speaker and listener)",
        answer: "ono",
        options: ["ono", "to", "ovo", "njihovo", "moje"],
      },
      {
        numb: 19,
        question: "_____ park ovde je veoma lep. (close to speaker)",
        answer: "Ovaj",
        options: ["Ovaj", "Taj", "Onaj", "Njihov", "Vaš"],
      },
      {
        numb: 20,
        question:
          "Da li ti se dopada _____ torba pored tebe? (neutral position)",
        answer: "ta",
        options: ["ta", "ova", "ona", "njihova", "naša"],
      },
      {
        numb: 21,
        question:
          "Ko je vlasnik _____ bicikla tamo? (far from speaker and listener)",
        answer: "onog",
        options: ["onog", "tog", "ovog", "njihovog", "mojeg"],
      },
      {
        numb: 22,
        question:
          "_____ film koji sada gledamo je zanimljiv. (close to speaker)",
        answer: "Ovaj",
        options: ["Ovaj", "Taj", "Onaj", "Njegov", "Vaš"],
      },
      {
        numb: 23,
        question:
          "Kako se zove _____ pesma koja se upravo završila? (neutral position)",
        answer: "ta",
        options: ["ta", "ova", "ona", "njihova", "naša"],
      },
      {
        numb: 24,
        question:
          "Da li ti se sviđa _____ kuća na brdu? (far from speaker and listener)",
        answer: "ona",
        options: ["ona", "ta", "ova", "njihova", "moj"],
      },
      {
        numb: 25,
        question: "_____ auto ovde je novi. (close to speaker)",
        answer: "Ovaj",
        options: ["Ovaj", "Taj", "Onaj", "Njegov", "Vaš"],
      },
      {
        numb: 26,
        question: "Kako se zove _____ dečko pored tebe? (neutral position)",
        answer: "taj",
        options: ["taj", "ovaj", "onaj", "njihov", "vaš"],
      },
      {
        numb: 27,
        question:
          "Da li ti se dopada _____ grad tamo u daljini? (far from speaker and listener)",
        answer: "onaj",
        options: ["onaj", "taj", "ovaj", "njihov", "vaš"],
      },
      {
        numb: 28,
        question:
          "_____ stablo ovde je staro preko sto godina. (close to speaker)",
        answer: "Ovo",
        options: ["Ovo", "To", "Ono", "Njihovo", "Moje"],
      },
      {
        numb: 29,
        question:
          "Da li ti se dopada _____ pesma koju slušamo? (neutral position)",
        answer: "ta",
        options: ["ta", "ova", "ona", "njihova", "naša"],
      },
      {
        numb: 30,
        question:
          "Kako ti se čini _____ planina tamo u daljini? (far from speaker and listener)",
        answer: "ona",
        options: ["ona", "ta", "ova", "njihova", "vaša"],
      },
    ],
    word_order: [
      {
        numb: 1,
        question:
          "In the sentence 'Ona je Amerikanka,' which word occupies the Y slot?",
        answer: "je",
        options: ["Ona", "je", "Amerikanka", "se", "li"],
      },
      {
        numb: 2,
        question: "In 'Kako se ona zove?', which word is the clitic?",
        answer: "se",
        options: ["Kako", "se", "ona", "zove", "je"],
      },
      {
        numb: 3,
        question: "Which slot does 'je' occupy in 'Amerikanka je'?",
        answer: "Y",
        options: ["X", "Y", "Z", "None", "Both X and Y"],
      },
      {
        numb: 4,
        question:
          "What is the first significant unit (slot X) in 'Zovem se Sanja Lalić'?",
        answer: "Zovem",
        options: ["Zovem", "se", "Sanja", "Lalić", "je"],
      },
      {
        numb: 5,
        question: "Which clitic must always come before others in a sentence?",
        answer: "li",
        options: ["li", "je", "se", "da", "su"],
      },
      {
        numb: 6,
        question: "In 'Da li ste student?', which word occupies slot X?",
        answer: "Da",
        options: ["Da", "li", "ste", "student", "je"],
      },
      {
        numb: 7,
        question: "What is the clitic in 'Jeste li student?'?",
        answer: "li",
        options: ["li", "Jeste", "student", "je", "se"],
      },
      {
        numb: 8,
        question: "In 'Kako se ona zove?', which word occupies slot Z?",
        answer: "zove",
        options: ["Kako", "se", "ona", "zove", "je"],
      },
      {
        numb: 9,
        question: "True or false: Slot Z can occasionally be empty.",
        answer: "True",
        options: ["True", "False"],
      },
      {
        numb: 10,
        question: "In 'Amerikanka je,' what type of word is in slot Z?",
        answer: "predicate noun",
        options: ["subject", "clitic", "predicate noun", "verb", "adjective"],
      },
      {
        numb: 11,
        question: "Which word follows 'li' in 'Jeste li student?'?",
        answer: "student",
        options: ["student", "Jeste", "je", "se", "ona"],
      },
      {
        numb: 12,
        question:
          "In 'Ja se zovem Sanja Lalić,' which clitic comes after the first significant unit?",
        answer: "se",
        options: ["se", "zovem", "ja", "Sanja", "je"],
      },
      {
        numb: 13,
        question: "Which word is in slot X in 'Kako se ona zove?'?",
        answer: "Kako",
        options: ["Kako", "se", "ona", "zove", "je"],
      },
      {
        numb: 14,
        question:
          "True or false: Clitics must always follow the first significant unit in the sentence.",
        answer: "True",
        options: ["True", "False"],
      },
      {
        numb: 15,
        question:
          "In 'Jeste li student?', what is the grammatical role of 'li'?",
        answer: "question particle",
        options: ["question particle", "verb", "noun", "adjective", "pronoun"],
      },
      {
        numb: 16,
        question: "Which clitic forms part of the question phrase 'Da li'?",
        answer: "li",
        options: ["li", "da", "je", "se", "su"],
      },
      {
        numb: 17,
        question: "In 'Ona je Amerikanka,' which word is the subject?",
        answer: "Ona",
        options: ["Ona", "je", "Amerikanka", "se", "li"],
      },
      {
        numb: 18,
        question:
          "Which word in 'Zòvem se Sanja Làlić' is pronounced without its own accent?",
        answer: "se",
        options: ["Zòvem", "se", "Sanja", "Làlić", "je"],
      },
      {
        numb: 19,
        question: "In 'Da li ste student?', which word is the predicate noun?",
        answer: "student",
        options: ["student", "ste", "li", "Da", "se"],
      },
      {
        numb: 20,
        question:
          "What does 'Da' represent in the phrase 'Da li ste student?'?",
        answer: "conjunction",
        options: ["conjunction", "verb", "noun", "pronoun", "clitic"],
      },
    ],
  },
];

/* Mup Questions */
const mup_questions = [
  {
    numb: 1,
    question: "Nositelj zakonodavne vlasti u Republici Hrvatskoj je:",
    answer: "Hrvatski sabor",
    options: [
      "Hrvatski sabor",
      "Predsjednik Republike Hrvatske",
      "Vlada Republike Hrvatske",
      "Ustavni sud Republike Hrvatske",
    ],
  },
  {
    numb: 2,
    question: "Granice Republike Hrvatske mogu se mijenjati samo odlukom:",
    answer: "Hrvatskoga sabora",
    options: [
      "Vlade Republike Hrvatske",
      "Predsjednika Republike Hrvatske",
      "Hrvatskoga sabora",
      "Ustavnog suda Republike Hrvatske",
    ],
  },
  {
    numb: 3,
    question: "Dana 5. kolovoza u Republici Hrvatskoj je blagdan:",
    answer: "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
    options: [
      "Praznik rada",
      "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
      "Svi Sveti",
      "Dan antifašističke borbe",
    ],
  },
  {
    numb: 4,
    question: "Himna Republike Hrvatske je:",
    answer: "Lijepa naša domovino",
    options: [
      "Lijepa naša domovino",
      "Himna slobode",
      "Oj Hrvatska mati",
      "U boj, u boj",
    ],
  },
  {
    numb: 5,
    question:
      "Institucija neovisna o svim tijelima državne vlasti, ustanovljena Ustavom Republike Hrvatske, a koja jamči njegovo poštivanje i primjenu, zaštitu ljudskih prava i temeljnih sloboda građana u Republici Hrvatskoj je:",
    answer: "Ustavni sud Republike Hrvatske",
    options: [
      "Ustavni sud Republike Hrvatske",
      "Hrvatski sabor",
      "Pučki pravobranitelj",
      "Vrhovni sud Republike Hrvatske",
    ],
  },
  {
    numb: 6,
    question:
      "Grad na istoku Hrvatske koji je tijekom Domovinskog rata pretrpio velika razaranja i progon hrvatskog stanovništva, a čiji je vodotoranj simbol stradanja i otpora grada:",
    answer: "Vukovar",
    options: ["Vukovar", "Osijek", "Slavonski Brod", "Đakovo"],
  },
  {
    numb: 7,
    question:
      "Povijesna građevina, najveći rimski amfiteatar na području današnje Hrvatske nalazi se u:",
    answer: "Puli",
    options: ["Puli", "Zagrebu", "Osijeku", "Zadru"],
  },
  {
    numb: 8,
    question:
      "Druga najduža europska rijeka koja protječe kroz istočni dio Republike Hrvatske zove se:",
    answer: "Dunav",
    options: ["Dunav", "Sava", "Drava", "Kupa"],
  },
  {
    numb: 9,
    question:
      "Najstariji i najveći nacionalni park Republike Hrvatske kojeg čine 16 međusobno povezanih jezera, 1979. godine upisan na UNESCO-ov Popis svjetske baštine je:",
    answer: "Plitvička jezera",
    options: ["Plitvička jezera", "Kornati", "Krka", "Risnjak"],
  },
  {
    numb: 10,
    question:
      "Brončanu skulpturu »Zdenac života« koja se nalazi u Zagrebu, ispred Hrvatskog narodnog kazališta, izradio je poznati hrvatski kipar:",
    answer: "Ivan Meštrović",
    options: [
      "Antun Augustinčić",
      "Frano Kršinić",
      "Ivan Meštrović",
      "Robert Frangeš",
    ],
  },
  {
    numb: 11,
    question:
      "Jedna od znamenitosti Zagreba, poznata po krovu s motivima hrvatskog povijesnog grba, je:",
    answer: "Crkva sv. Marka",
    options: [
      "Crkva sv. Marka",
      "Stari grad Zrinskih",
      "Velika Onofrijeva česma",
      "Tvrđava Nehaj",
    ],
  },
  {
    numb: 12,
    question:
      "Osnivač Hrvatske akademije znanosti i umjetnosti i inicijator podizanja đakovačke katedrale bio je đakovačko-srijemski biskup:",
    answer: "Josip Juraj Strossmayer",
    options: [
      "Juraj Dobrila",
      "Josip Jelačić",
      "Josip Juraj Strossmayer",
      "Juraj Jezerinac",
    ],
  },
  {
    numb: 13,
    question:
      "Hrvatski grad kroz koji prolaze četiri rijeke (Korana, Kupa, Mrežnica i Dobra) zove se:",
    answer: "Karlovac",
    options: ["Karlovac", "Sisak", "Varaždin", "Požega"],
  },
  {
    numb: 14,
    question:
      "Poznati hrvatski matematičar, astronom, geodet i fizičar po kome je nazvan Institut koji predstavlja stožernu znanstvenu ustanovu u Republici Hrvatskoj u području prirodnih i biomedicinskih znanosti te istraživanju mora i okoliša je:",
    answer: "Ruđer Bošković",
    options: [
      "Juraj Haulik",
      "Ruđer Bošković",
      "Lavoslav Ružička",
      "Ivan Vučetić",
    ],
  },
  {
    numb: 15,
    question:
      "Na svjetskom prvenstvu u nogometu održanom u Rusiji 2018. godine reprezentacija Republike Hrvatske je osvojila:",
    answer: "Drugo mjesto",
    options: ["Prvo mjesto", "Drugo mjesto", "Treće mjesto", "Četvrto mjesto"],
  },
  {
    numb: 16,
    question: "Nositelj izvršne vlasti u Republici Hrvatskoj je:",
    answer: "Vlada Republike Hrvatske",
    options: [
      "Vlada Republike Hrvatske",
      "Vrhovni sud Republike Hrvatske",
      "Hrvatski sabor",
      "Pučki pravobranitelj",
    ],
  },
  {
    numb: 17,
    question: "Datum pristupanja Republike Hrvatske Europskoj uniji je:",
    answer: "1. srpnja 2013.",
    options: [
      "1. srpnja 2013.",
      "1. svibnja 2004.",
      "25. lipnja 1991.",
      "9. svibnja 1950.",
    ],
  },
  {
    numb: 18,
    question:
      "Izumitelj daktiloskopije, sustava identifikacije pomoću otisaka prstiju, rođen na otoku Hvaru, a umro u Argentini, je:",
    answer: "Ivan Vučetić",
    options: [
      "Andrija Mohorovičić",
      "Ivan Vučetić",
      "Ruđer Bošković",
      "Đuro Deželić",
    ],
  },
  {
    numb: 19,
    question:
      "U Republici Hrvatskoj državna je vlast ustrojena na načelu diobe vlasti na:",
    answer: "zakonodavnu, izvršnu i sudbenu",
    options: [
      "zakonodavnu, izvršnu i sudbenu",
      "izvršnu i sudbenu",
      "zakonodavnu i sudbenu",
      "zakonodavnu i izvršnu",
    ],
  },
  {
    numb: 20,
    question:
      "Osim Grada Zagreba, kao posebne i jedinstvene, teritorijalne i upravne cjeline, Republika Hrvatska ima 20 jedinica područne (regionalne) samouprave, koje se zovu:",
    answer: "županije",
    options: ["regije", "kotarevi", "županije", "provincije"],
  },
  {
    numb: 21,
    question:
      "Najpoznatija vrsta ugroženih ptica, koja se hrani strvinama, a obitava na sjevernojadranskim otocima (pretežno na Cresu) je:",
    answer: "bjeloglavi sup",
    options: ["galeb", "orao štekavac", "roda", "bjeloglavi sup"],
  },
  {
    numb: 22,
    question:
      "Jedan od najpoznatijih dvoraca u sjevernom dijelu Republike Hrvatske je:",
    answer: "Trakošćan",
    options: ["Eltz", "Trakošćan", "Trsat", "Kamerlengo"],
  },
  {
    numb: 23,
    question:
      "Kako se zove rijeka koja je, prema ukupnoj duljini vodotoka, najdulja rijeka u Republici Hrvatskoj (562 km)?",
    answer: "Sava",
    options: ["Sava", "Drava", "Kupa", "Dunav"],
  },
  {
    numb: 24,
    question:
      "Kako se zove najgušći jadranski arhipelag, čiji je jedan dio proglašen nacionalnim parkom 1980. godine?",
    answer: "Kornati",
    options: ["Kornati", "Brijuni", "Mljet", "Krka"],
  },
  {
    numb: 25,
    question:
      "Kojeg se književnika, autora epa »Judita«, naziva ocem hrvatske književnosti?",
    answer: "Marko Marulić",
    options: [
      "Marko Marulić",
      "Ivan Gundulić",
      "Petar Zoranić",
      "Antun Gustav Matoš",
    ],
  },
  {
    numb: 26,
    question:
      "Vođa hrvatskog narodnog preporoda pokrenuo je na hrvatskom jeziku 1835. godine »Novine horvatzke«. Njegovo ime je:",
    answer: "Ljudevit Gaj",
    options: [
      "August Šenoa",
      "Dimitrije Demeter",
      "Ljudevit Gaj",
      "Stanko Vraz",
    ],
  },
  {
    numb: 27,
    question:
      "»Notturno« i »Utjeha kose« pjesme su najpoznatijeg književnika hrvatske moderne:",
    answer: "Antuna Gustava Matoša",
    options: [
      "Petra Preradovića",
      "Hanibala Lucića",
      "Antuna Gustava Matoša",
      "Dobriše Cesarića",
    ],
  },
  {
    numb: 28,
    question:
      "Katedrala sv. Jakova, 2000. godine upisana na UNESCO-ov Popis svjetske baštine, nalazi se u:",
    answer: "Šibeniku",
    options: ["Splitu", "Zagrebu", "Puli", "Šibeniku"],
  },
  {
    numb: 29,
    question: "Središnja banka Republike Hrvatske je:",
    answer: "Hrvatska narodna banka",
    options: [
      "Hrvatska banka za obnovu i razvoj",
      "Hrvatska gospodarska banka",
      "Hrvatska narodna banka",
      "Hrvatska poštanska banka",
    ],
  },
  {
    numb: 30,
    question:
      "Znamenito turističko odredište na jugu Hrvatske, okruženo gradskim zidinama, 1979. godine upisano na UNESCO-ov Popis svjetske baštine je:",
    answer: "Dubrovnik",
    options: ["Dubrovnik", "Split", "Šibenik", "Pula"],
  },
  {
    numb: 31,
    question:
      "Jedan od najznačajnijih Hrvata svih vremena, rođen u Šibeniku, leksikograf i izumitelj (padobran, mostovi, mlinovi) je:",
    answer: "Faust Vrančić",
    options: [
      "Faust Vrančić",
      "Ruđer Bošković",
      "Ivan Vučetić",
      "Nikola Tesla",
    ],
  },
  {
    numb: 32,
    question: "Hrvatski državljani stječu opće i jednako biračko pravo:",
    answer: "s navršenih 18 godina života",
    options: [
      "s navršenih 16 godina života",
      "muškarci s navršenih 16, a žene s navršenih 18 godina života",
      "s navršenih 18 godina života",
      "s navršenom 21 godinom života",
    ],
  },
  {
    numb: 33,
    question: "Vrhovni zapovjednik oružanih snaga Republike Hrvatske je:",
    answer: "Predsjednik Republike",
    options: [
      "Predsjednik Sabora",
      "Predsjednik Vlade",
      "Predsjednik Republike",
      "Predsjednik Ustavnog suda",
    ],
  },
  {
    numb: 34,
    question:
      "Hrvatski velikaši pogubljeni u Bečkom Novom Mjestu 1671. godine, nakon sloma neuspjele urote usmjerene protiv habsburškog apsolutizma:",
    answer: "Petar IV. Zrinski i Fran Krsto Frankopan",
    options: [
      "Antun i Stjepan Radić",
      "Petar Berislavić i Petar Keglević",
      "Matija Gubec i Ilija Gregorić",
      "Petar IV. Zrinski i Fran Krsto Frankopan",
    ],
  },
  {
    numb: 35,
    question:
      "Papa koji je tijekom svog pontifikata tri puta posjetio Republiku Hrvatsku bio je:",
    answer: "Ivan Pavao II.",
    options: ["Ivan Pavao II.", "Benedikt XVI.", "Franjo", "Pio XII."],
  },
  {
    numb: 36,
    question: "Slava Raškaj bila je poznata hrvatska:",
    answer: "slikarica",
    options: ["književnica", "balerina", "slikarica", "liječnica"],
  },
  {
    numb: 37,
    question:
      "Poznati hrvatski političar i vođa hrvatskog seljaštva, umro od posljedica atentata 1928. godine u beogradskoj skupštini, bio je:",
    answer: "Stjepan Radić",
    options: [
      "Stjepan Radić",
      "Ivan Mažuranić",
      "Frano Supilo",
      "Milan Šufflay",
    ],
  },
  {
    numb: 38,
    question: "»Morske orgulje« jedna su od znamenitosti grada:",
    answer: "Zadra",
    options: ["Senja", "Makarske", "Zadra", "Trogira"],
  },
  {
    numb: 39,
    question: "Marija Jurić Zagorka bila je:",
    answer: "prva profesionalna novinarka i poznata hrvatska književnica",
    options: [
      "prva profesionalna novinarka i poznata hrvatska književnica",
      "operna pjevačica",
      "glumica",
      "skladateljica",
    ],
  },
  {
    numb: 40,
    question:
      "Jedan od najznačajnijih hrvatskih izumitelja s početka 20. stoljeća, tvorac mehaničke olovke i nalivpera s krutom tintom je:",
    answer: "Eduard Slavoljub Penkala",
    options: [
      "Ferdinand Budicki",
      "Dragutin Novak",
      "Vladimir Prelog",
      "Eduard Slavoljub Penkala",
    ],
  },
  {
    numb: 41,
    question: "Poznati park prirode u Baranji je:",
    answer: "Kopački rit",
    options: ["Vransko jezero", "Kopački rit", "Paklenica", "Risnjak"],
  },
  {
    numb: 42,
    question:
      "Književnost baroka u Republici Hrvatskoj obilježio je svojim epovima Ivan Gundulić. Njegova poznata djela su:",
    answer: "»Osman« i »Dubravka«",
    options: [
      "»Kiklop« i »Mirisi, zlato i tamjan«",
      "»Zlatarevo zlato« i »Posljednji Stipančići«",
      "»Smrt Smail-age Čengića« i »Ribanje i ribarsko prigovaranje«",
      "»Osman« i »Dubravka«",
    ],
  },
  {
    numb: 43,
    question:
      "Jedan od najstarijih spomenika hrvatske pismenosti iz razdoblja oko 1100. godine, Baščanska ploča, sačuvana u Baškoj na otoku Krku pisana je:",
    answer: "glagoljicom",
    options: ["ćirilicom", "glagoljicom", "latinicom", "goticom"],
  },
  {
    numb: 44,
    question:
      "Na Olimpijskim igrama 1996. i 2004. godine Republika Hrvatska osvojila je zlatnu medalju i bila svjetski prvak 2003. godine u:",
    answer: "rukometu",
    options: ["nogometu", "vaterpolu", "rukometu", "odbojci"],
  },
  {
    numb: 45,
    question: "S kojom državom Republika Hrvatska ima najdužu kopnenu granicu?",
    answer: "Bosna i Hercegovina",
    options: ["Bosna i Hercegovina", "Slovenija", "Srbija", "Mađarska"],
  },
  {
    numb: 46,
    question: "Zastupnici u Hrvatskom saboru biraju se na vrijeme od:",
    answer: "4 godine",
    options: ["2 godine", "3 godine", "4 godine", "5 godina"],
  },
  {
    numb: 47,
    question: "U Republici Hrvatskoj smrtna kazna:",
    answer: "ne postoji",
    options: [
      "ne postoji",
      "postoji, ali se ne primjenjuje",
      "postoji samo za ratni zločin i zločin protiv čovječnosti",
      "postoji samo za djelo veleizdaje, u situaciji neposredne ratne opasnosti",
    ],
  },
  {
    numb: 48,
    question:
      "Opunomoćenik Hrvatskog sabora koji štiti ustavna i zakonska prava građana u postupku pred državnom upravom i tijelima – Ombudsman, na hrvatskom jeziku naziva se:",
    answer: "Pučki pravobranitelj",
    options: [
      "Pučki pravobranitelj",
      "Zastupnik građana",
      "Narodni zastupnik",
      "Građanski odvjetnik",
    ],
  },
  {
    numb: 49,
    question: "Dan antifašističke borbe u Republici Hrvatskoj je dan:",
    answer: "22. lipnja",
    options: ["8. ožujka", "9. svibnja", "22. lipnja", "4. srpnja"],
  },
  {
    numb: 50,
    question:
      "Početkom 4. stoljeća rimski car Dioklecijan izgradio je svoju palaču na području Dalmacije. Kako se danas zove grad čija je povijesna jezgra Dioklecijanova palača?",
    answer: "Split",
    options: ["Split", "Dubrovnik", "Zadar", "Trogir"],
  },
  {
    numb: 51,
    question:
      "Zagrebački nadbiskup i kardinal koji je bio proganjan i osuđen u političkom procesu nakon Drugog svjetskog rata, zvao se:",
    answer: "Alojzije Stepinac",
    options: [
      "Franjo Rački",
      "Alojzije Stepinac",
      "Maksimilijan Vrhovac",
      "Franjo Kuharić",
    ],
  },
  {
    numb: 52,
    question:
      "Godine 1993. Hrvatska vojska izvela je munjevitu vojnu akciju kojom je, kopnenim putem, povezala sjever i jug Hrvatske, koji je agresor okupacijom prostora razdvojio. To je bila akcija:",
    answer: "Maslenica",
    options: ["Oluja", "Bljesak", "Maslenica", "Maestral"],
  },
  {
    numb: 53,
    question:
      "Nacionalni park nedaleko Šibenika, poznat po prekrasnim sedrenim slapovima (Roški slap, Skradinski buk) je:",
    answer: "Krka",
    options: ["Cetina", "Krka", "Rastoke", "Lonjsko polje"],
  },
  {
    numb: 54,
    question: "Ivana Brlić Mažuranić bila je poznata hrvatska:",
    answer: "književnica",
    options: ["liječnica", "glumica", "slikarica", "književnica"],
  },
  {
    numb: 55,
    question: "Skladatelj prve hrvatske opere »Ljubav i zloba« je:",
    answer: "Vatroslav Lisinski",
    options: [
      "Ivan Zajc",
      "Vatroslav Lisinski",
      "Jakov Gotovac",
      "Josip Runjanin",
    ],
  },
  {
    numb: 56,
    question: "Prvi predsjednik Republike Hrvatske bio je:",
    answer: "Franjo Tuđman",
    options: [
      "Stjepan Radić",
      "Franjo Tuđman",
      "Ante Pavelić",
      "Ivo Josipović",
    ],
  },
  {
    numb: 57,
    question:
      "Renesansni dubrovački dramski pisac i komediograf, autor poznatih djela: »Dundo Maroje«, »Skup« i »Novela od Stanca«, zvao se:",
    answer: "Marin Držić",
    options: ["Marin Držić", "Ivan Gundulić", "Marko Marulić", "Petar Zoranić"],
  },
  {
    numb: 58,
    question:
      "Koji je hrvatski otok poznat po čipki, siru, soli i najstarijim stablima maslina?",
    answer: "Pag",
    options: ["Krk", "Pag", "Hvar", "Brač"],
  },
  {
    numb: 59,
    question:
      "Navedite ime jednog od najpoznatijih i najboljih hrvatskih košarkaša, koji je igrao i u NBA ligi, rođenog u Šibeniku, čija je skulptura postavljena u parku Olimpijskog muzeja u Lausanni:",
    answer: "Dražen Petrović",
    options: ["Toni Kukoč", "Dino Rađa", "Dražen Petrović", "Stojko Vranković"],
  },
  {
    numb: 60,
    question:
      "Zbog datuma proglašenja, Ustav Republike Hrvatske ima i popularni naziv:",
    answer: "božićni",
    options: ["proljetni", "ljetni", "božićni", "jesenski"],
  },
  {
    numb: 61,
    question:
      "Bojni ples s mačevima koji se od 15. stoljeća tradicionalno održava na Korčuli zove se:",
    answer: "Moreska",
    options: ["Kolo", "Moreska", "Tanac", "Dubrovnik Waltz"],
  },
  {
    numb: 62,
    question:
      "Opišite zastavu Republike Hrvatske: Sastoji se od tri boje koje su položene vodoravno i to ovim redom (odozgo prema dolje):",
    answer: "CRVENA, BIJELA i PLAVA a u sredini zastave nalazi se GRB.",
    options: [
      "CRVENA, BIJELA i PLAVA a u sredini zastave nalazi se GRB.",
      "BIJELA, CRVENA i PLAVA a u sredini zastave nalazi se GRB.",
      "PLAVA, BIJELA i CRVENA a u sredini zastave nalazi se GRB.",
      "CRVENA, PLAVA i BIJELA a u sredini zastave nalazi se GRB.",
    ],
  },
  {
    numb: 63,
    question: "Koji hrvatski znanstvenik je izumio izmjeničnu struju?",
    answer: "Nikola Tesla",
    options: [
      "Ruđer Bošković",
      "Nikola Tesla",
      "Ivan Meštrović",
      "Andrija Mohorovičić",
    ],
  },
  {
    numb: 64,
    question:
      "Kako se zove najpoznatiji nacionalni park u Hrvatskoj poznat po slapovima?",
    answer: "Plitvička jezera",
    options: ["Krka", "Plitvička jezera", "Paklenica", "Kornati"],
  },
  {
    numb: 65,
    question: "Koji grad u Hrvatskoj nazivaju 'Biserom Jadrana'?",
    answer: "Dubrovnik",
    options: ["Split", "Dubrovnik", "Zadar", "Rijeka"],
  },
  {
    numb: 66,
    question:
      "Grad u sjeverozapadnoj Hrvatskoj, poznat kao barokna prijestolnica Hrvatske, čije je groblje dragulj parkovne arhitekture je:",
    answer: "Varaždin",
    options: ["Varaždin", "Čakovec", "Krapina", "Zagreb"],
  },
  {
    numb: 67,
    question: "Predsjednik Republike Hrvatske bira se na vrijeme od:",
    answer: "5 godina",
    options: ["5 godina", "4 godine", "6 godina", "7 godina"],
  },
  {
    numb: 68,
    question: "Najviša planina u Hrvatskoj, s najvišim vrhom od 1.831 m, je:",
    answer: "Dinara",
    options: ["Dinara", "Biokovo", "Velebit", "Papuk"],
  },
  {
    numb: 69,
    question:
      "Svjetski afirmirani slikar, koji je studirao u Parizu, a slikao je alegorijske i povijesne kompozicije i portrete te je izradio svečani zastor Hrvatskog narodnog kazališta u Zagrebu »Hrvatski narodni preporod«, zvao se:",
    answer: "Vlaho Bukovac",
    options: [
      "Vlaho Bukovac",
      "Ivan Meštrović",
      "Oton Iveković",
      "Josip Račić",
    ],
  },
  {
    numb: 70,
    question:
      "»Tko pjeva zlo ne misli«, antologijsku »ljubavnu komediju s pjevanjem«, na temelju »Dnevnika malog Perice« Vjekoslava Majera, režirao je:",
    answer: "Krešo Golik",
    options: ["Krešo Golik", "Branko Bauer", "Zoran Tadić", "Antun Vrdoljak"],
  },
  {
    numb: 71,
    question:
      "Vođa seljačke bune 1573. godine na području današnje sjeverozapadne Hrvatske bio je:",
    answer: "Matija Gubec",
    options: ["Matija Gubec", "Ivan Gundulić", "Franjo Tahi", "Marko Marulić"],
  },
  {
    numb: 72,
    question: "U Republici Hrvatskoj u uporabi je __________ i __________.",
    answer: "HRVATSKI jezik i LATINIČNO pismo",
    options: [
      "HRVATSKI jezik i LATINIČNO pismo",
      "SRPSKI jezik i ĆIRILICA",
      "ENGLESKI jezik i LATINIČNO pismo",
      "HRVATSKI jezik i GLAGOLJICA",
    ],
  },
  {
    numb: 73,
    question:
      "Novčana jedinica u uporabi u Republici Hrvatskoj je EURO , čiji stoti dio je CENT.",
    answer: "EURO , čiji stoti dio je CENT",
    options: [
      "EURO , čiji stoti dio je CENT",
      "KUNA , čiji stoti dio je LIPA",
      "DINAR , čiji stoti dio je PARA",
      "DOLAR , čiji stoti dio je CENT",
    ],
  },
  {
    numb: 74,
    question:
      "Najpoznatija hrvatska skijašica, osvajačica 4 zlatne i 2 srebrne olimpijske medalje u alpskom skijanju, zove se:",
    answer: "Janica Kostelić",
    options: [
      "Janica Kostelić",
      "Ivica Kostelić",
      "Ana Jelušić",
      "Nika Fleiss",
    ],
  },
  {
    numb: 75,
    question:
      "Ukupno 14 otoka i otočića čine nacionalni park u Jadranskom moru, zapadno od istarske obale, bogat po raznovrsnoj flori i fauni:",
    answer: "NP Brijuni",
    options: ["NP Brijuni", "NP Kornati", "NP Mljet", "NP Krka"],
  },
  {
    numb: 76,
    question: "Hrvatski tenisač, pobjednik Wimbledona 2001. godine je:",
    answer: "Goran Ivanišević",
    options: [
      "Goran Ivanišević",
      "Marin Čilić",
      "Ivan Ljubičić",
      "Borna Ćorić",
    ],
  },
  {
    numb: 77,
    question:
      "Najznačajnija endemična biljka hrvatske flore, zakonom zaštićena, zove se velebitska:",
    answer: "Degenija",
    options: ["Degenija", "Orhideja", "Runolist", "Planinska ruža"],
  },
  {
    numb: 78,
    question:
      "Tko je izvršio oružanu agresiju na Republiku Hrvatsku 1990. godine, sukladno Deklaraciji o Domovinskom ratu?",
    answer: "Srbi, Crna Gora i JNA",
    options: [
      "Srbi, Crna Gora i JNA",
      "Italija i Austrija",
      "Mađarska i Slovenija",
      "Nijedna od navedenih",
    ],
  },
  {
    numb: 79,
    question:
      "Svjetski poznat izumitelj, fizičar i elektrotehničar rođen 1856. godine u Smiljanu kod Gospića, a umro 1943. godine u New Yorku, po kome je nazvana mjerna jedinica magnetskog polja je:",
    answer: "Nikola Tesla",
    options: [
      "Nikola Tesla",
      "Ivan Vučetić",
      "Ruđer Bošković",
      "Franjo Hanaman",
    ],
  },
  {
    numb: 80,
    question:
      "Prva hrvatska žrtva u Domovinskom ratu, hrvatski redarstvenik poginuo 1991. godine na Plitvicama zvao se:",
    answer: "Josip Jović",
    options: [
      "Josip Jović",
      "Marko Perković",
      "Ante Gotovina",
      "Mladen Markač",
    ],
  },
  {
    numb: 81,
    question:
      "Godine 1999., zbog izrazite raznolikosti krških fenomena, živog svijeta i iznimnih prirodnih ljepota na relativno malom prostoru, nacionalnim parkom proglašen je dio jedne planine. To je:",
    answer: "Sjeverni Velebit",
    options: ["Sjeverni Velebit", "Dinara", "Biokovo", "Risnjak"],
  },
  {
    numb: 82,
    question:
      "Jedan od najznačajnijih hrvatskih književnika, autor brojnih romana, ciklusa drama o Glembajevima i Balada Petrice Kerempuha, je:",
    answer: "Miroslav Krleža",
    options: ["Miroslav Krleža", "August Šenoa", "Marin Držić", "Ivo Andrić"],
  },
  {
    numb: 83,
    question:
      "Hrvatski ban, po čijem je imenu nazvan glavni trg u Gradu Zagrebu, zvao se:",
    answer: "Josip Jelačić",
    options: [
      "Josip Jelačić",
      "Petar Zrinski",
      "Ivan Mažuranić",
      "Ante Starčević",
    ],
  },
  {
    numb: 84,
    question:
      "Republika Hrvatska je članica zajednice europskih država koja se naziva:",
    answer: "Europska unija",
    options: ["Europska unija", "Schengenska zona", "Vijeće Europe", "NATO"],
  },
  {
    numb: 85,
    question:
      "Ukrasni odjevni predmet, nosi se oko vrata, koji su nosili hrvatski vojnici u Tridesetogodišnjem ratu, nakon čega se njegovo korištenje proširilo većim dijelom Europe, je:",
    answer: "Kravata",
    options: ["Kravata", "Šal", "Marama", "Ovratnik"],
  },
  {
    numb: 86,
    question: "Eufrazijeva bazilika poznata je znamenitost grada u Istri:",
    answer: "Poreč",
    options: ["Poreč", "Rovinj", "Pula", "Umag"],
  },
  {
    numb: 87,
    question: "Vjekoslav Šutej bio je poznati hrvatski:",
    answer: "Dirigent",
    options: ["Dirigent", "Skladatelj", "Glazbenik", "Kantautor"],
  },
  {
    numb: 88,
    question:
      "Tekst himne Republike Hrvatske »Lijepa naša domovino« napisao je ANTUN, a uglazbio JOSIP RUNJANIN.",
    answer: "Antun Mihanović, Josip Runjanin",
    options: [
      "Antun Mihanović, Josip Runjanin",
      "Ivan Zajc, Vatroslav Lisinski",
      "Petar Preradović, Ivan Gundulić",
      "Stanko Vraz, Franjo Kuhač",
    ],
  },
  {
    numb: 89,
    question:
      "Za predsjednika Republike Hrvatske ne može se biti biran više od:",
    answer: "2 puta",
    options: ["2 puta", "3 puta", "4 puta", "Ne postoji ograničenje"],
  },
  {
    numb: 90,
    question: "Koliko zastupnika može imati Hrvatski sabor?",
    answer: "Najmanje 100, najviše 160",
    options: [
      "Najmanje 100, najviše 160",
      "Najmanje 80, najviše 200",
      "Najmanje 120, najviše 140",
      "Najmanje 90, najviše 170",
    ],
  },
  {
    numb: 91,
    question:
      "Koja je tvrđava simbol hrvatske državnosti i pobjede u Domovinskom ratu?",
    answer: "Kninska",
    options: ["Kninska", "Medvedgrad", "Dubovačka", "Trakošćan"],
  },
  {
    numb: 92,
    question:
      "Bitka protiv Osmanlija, u kojoj su poginuli mnogi pripadnici hrvatskog plemstva, zbila se 1493. godine u Lici, na:",
    answer: "Krbavskom polju",
    options: [
      "Krbavskom polju",
      "Vukovarskom polju",
      "Cetinskom polju",
      "Koranskom polju",
    ],
  },
  {
    numb: 93,
    question:
      "Zagrebački muzej, čiji se fundus temelji na donaciji privatne zbirke umjetnina poznatog kolekcionara, zove se:",
    answer: "Muzej Mimara",
    options: [
      "Muzej Mimara",
      "Arheološki muzej",
      "Moderna galerija",
      "Etnografski muzej",
    ],
  },
  {
    numb: 94,
    question:
      "Fabijan Šovagović, Boris Dvornik i Ivo Gregurević bili su poznati hrvatski:",
    answer: "Glumci",
    options: ["Glumci", "Skladatelji", "Redatelji", "Pisci"],
  },
  {
    numb: 95,
    question:
      "Svjetski poznati izvozni proizvod hrvatske prehrambene industrije je začin:",
    answer: "Vegeta",
    options: ["Vegeta", "Paprika", "Origano", "Ružmarin"],
  },
  {
    numb: 96,
    question:
      "Kako se zove najveći grad u Slavoniji na rijeci Dravi, čija je povijesna jezgra Tvrđa?",
    answer: "Osijek",
    options: ["Osijek", "Slavonski Brod", "Vinkovci", "Vukovar"],
  },
  {
    numb: 97,
    question:
      "Hrvatska viteška igra koja se održava svake godine u prvoj nedjelji mjeseca kolovoza u Sinju, na godišnjicu pobjede nad turskim osvajačima 14. kolovoza 1715. godine, zove se:",
    answer: "Sinjska alka",
    options: [
      "Sinjska alka",
      "Velika alka",
      "Sinjski vitezi",
      "Turčinova pobjeda",
    ],
  },
  {
    numb: 98,
    question:
      "Najbolji igrač svijeta za 2018. godinu u izboru Međunarodne nogometne federacije (FIFA) i France Footballa je hrvatski nogometaš:",
    answer: "Luka Modrić",
    options: ["Luka Modrić", "Ivan Rakitić", "Mario Mandžukić", "Ante Rebić"],
  },
  {
    numb: 99,
    question:
      "Poznatu slikarsku školu hrvatske naive osnovao je, u podravskom selu Hlebine, slikar:",
    answer: "Krsto Hegedušić",
    options: ["Josip Račić", "Ivan Rabuzin", "Krsto Hegedušić", "Ljubo Babić"],
  },
  {
    numb: 100,
    question:
      "Hrvatski redatelj, scenarist, animator, crtač i karikaturist, koji je 1962. godine dobio Oscara za crtani film »Surogat« zvao se:",
    answer: "Dušan Vukotić",
    options: [
      "Dušan Vukotić",
      "Vladimir Tadej",
      "Nikola Tanhofer",
      "Branko Bauer",
    ],
  },
  {
    numb: 101,
    question:
      "»Tigrovi«, »Gromovi«, »Kune«, »Pauci«, »Pume«, »Sokolovi«, »Orlovi« i »Vukovi« nazivi su hrvatskih vojnih postrojbi iz Domovinskog rata:",
    answer: "gardijskih brigada",
    options: [
      "mornaričke pješadije",
      "vojne policije",
      "zrakoplovnih eskadrila",
      "gardijskih brigada",
    ],
  },
  {
    numb: 102,
    question: "Datum međunarodnog priznanja Republike Hrvatske je:",
    answer: "15. siječnja 1992. godine",
    options: [
      "30. svibnja 1990. godine",
      "25. lipnja 1991. godine",
      "8. listopada 1991. godine",
      "15. siječnja 1992. godine",
    ],
  },
  {
    numb: 103,
    question:
      "Koje su se godine održali prvi demokratski izbori u Republici Hrvatskoj?",
    answer: "1990. godine",
    options: ["1990. godine", "1991. godine", "1989. godine", "1992. godine"],
  },
  {
    numb: 104,
    question:
      "Prvo kazalište na području Hrvatske otvoreno je početkom 17. stoljeća u:",
    answer: "Hvaru",
    options: ["Zagrebu", "Hvaru", "Dubrovniku", "Varaždinu"],
  },
  {
    numb: 105,
    question:
      "Poznata hrvatska skladateljica plemićkog podrijetla, čiji je otac bio hrvatski ban te čiji se obiteljski dvorac nalazi u Našicama je:",
    answer: "Dora Pejačević",
    options: [
      "Dora Pejačević",
      "Ivana Lang",
      "Milka Trnina",
      "Zinka Kunc-Milanov",
    ],
  },
  {
    numb: 106,
    question:
      "Najviša kulturna i znanstvena institucija u Republici Hrvatskoj je:",
    answer: "Hrvatska akademija znanosti i umjetnosti",
    options: [
      "Hrvatska akademija znanosti i umjetnosti",
      "Hrvatski sabor",
      "Ministarstvo kulture",
      "Sveučilište u Zagrebu",
    ],
  },
  {
    numb: 107,
    question:
      "Kojeg je sveca Hrvatski državni sabor svojom odlukom iz 1687. godine proglasio zaštitnikom Hrvatske, a čije je nacionalno svetište u Karlovcu?",
    answer: "sv. Josipa",
    options: ["sv. Antuna", "sv. Josipa", "sv. Nikolu", "sv. Franju"],
  },
  {
    numb: 108,
    question:
      "Tradicionalne hrvatske smotre folklora i običaja koje se održavaju u Slavoniji su đakovački ___________________ i vinkovačke ____________.",
    answer: "đakovački vezovi i vinkovačke jeseni",
    options: [
      "đakovački vezovi i vinkovačke jeseni",
      "đakovačke ljetne igre i vinkovački običaji",
      "đakovačke noći i vinkovački dani",
      "đakovačke priredbe i vinkovačke svečanosti",
    ],
  },
  {
    numb: 109,
    question:
      "Poznate hrvatske umjetnice, Milka Trnina i Zinka Kunc-Milanov, bile su:",
    answer: "operne pjevačice",
    options: ["glumice", "skladateljice", "operne pjevačice", "književnice"],
  },
  {
    numb: 110,
    question:
      "Viktor Kovačić, Stjepan Planić i Drago Ibler bili su poznati hrvatski:",
    answer: "arhitekti",
    options: ["arhitekti", "književnici", "slikari", "glazbenici"],
  },
];

const example = [
  {
    gender: [],
    nouns_of_professions_and_nationalities: [],
    verb_biti: [],
    yes_no_questions: [],
    conjunctions: [],
    possessive_pronominal_adjectives: [],
    demonstrative_pronominal_adjectives: [],
    word_order: [],
  },
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _library_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library.js */ "./public/library.js");
/* harmony import */ var _classes_Quiz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Quiz.js */ "./public/classes/Quiz.js");



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
    const quiz = new _classes_Quiz_js__WEBPACK_IMPORTED_MODULE_1__["default"](_library_js__WEBPACK_IMPORTED_MODULE_0__.chapter_1_questions, quizData);
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
    const categories = Object.keys(_library_js__WEBPACK_IMPORTED_MODULE_0__.chapter_1_questions[0]);

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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map