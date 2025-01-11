let chapter_1_chapter_1_questions = [
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
    question: "What is the gender of the Croatian word 'pìtanje' (question)?",
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
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.timeValue = 30;
    this.queCount = 0;
    this.queNumb = 1;
    this.userScore = 0;
    this.errorTotal = 0; // New property to track errors
    this.percentage = 0; // New property to track percentage
    this.totalTime = 0; // New property to track total time
    this.widthValue = 0;
    this.counter = null;
    this.counterLine = null;

    this.startBtn = document.querySelector(".start_btn button");
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

    this.init();
  }

  init() {
    this.startBtn.onclick = () => this.showInfoBox();
    this.exitBtn.onclick = () => this.hideInfoBox();
    this.continueBtn.onclick = () => this.startQuiz();
    this.nextBtn.onclick = () => this.nextQuestion();

    this.resultBox.querySelector(".buttons .restart").onclick = () =>
      this.restartQuiz();
    this.resultBox.querySelector(".buttons .quit").onclick = () =>
      window.location.reload();
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

    let queTag = `<span>${question.numb} ${question.question}</span>`;
    let optionTag = question.options
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
    this.bottomQueCounter.innerHTML = `<span><p>${index}</p> of <p>${this.questions.length}</p> Questions | Errors: <p>${this.errorTotal}</p></span>`;
  }

  getTickIcon() {
    return '<div class="icon tick"><i class="fas fa-check"></i></div>';
  }

  getCrossIcon() {
    return '<div class="icon cross"><i class="fas fa-times"></i></div>';
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

    // Stop total time counter when quiz ends
    this.stopTotalTimeCounter();

    // Calculate percentage
    this.percentage = ((this.userScore / this.questions.length) * 100).toFixed(
      2,
    );

    const scoreText = this.resultBox.querySelector(".score_text");
    let scoreTag = "";

    if (this.userScore > 3) {
      scoreTag = `<span>and congrats! 🎉 You got <p>${this.userScore}</p> out of <p>${this.questions.length}</p></span>`;
    } else if (this.userScore > 1) {
      scoreTag = `<span>and nice 😎 You got <p>${this.userScore}</p> out of <p>${this.questions.length}</p></span>`;
    } else {
      scoreTag = `<span>and sorry 😐 You got only <p>${this.userScore}</p> out of <p>${this.questions.length}</p></span>`;
    }

    scoreText.innerHTML = scoreTag;

    // Add percentage to result box
    const percentageTag = `<div class="percentage">Score: ${this.percentage}%</div>`;
    this.resultBox.insertAdjacentHTML("beforeend", percentageTag);
  }

  startTimer(time) {
    this.counter = setInterval(() => {
      this.timeCount.textContent = time;
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

// Initialize Quiz
const quiz = new Quiz(chapter_1_chapter_1_questions);
