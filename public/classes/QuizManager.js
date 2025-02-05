import { TimerManager } from "./TimeManager.js";
import { QuestionManager } from "./QuestionManager.js";
import { ScoreManager } from "./ScoreManager.js";
import { UIManager } from "./UIManager.js";
import { StorageManager } from "./StorageManager.js";
import { ChartManager } from "./ChartManager.js";

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
    this.chartManager = null;
    /*this.chartData = this.chartData = [
      {
        date: "2023-01-25",
        account: 1,
        ethaccount: 5,
        evm: 2,
        multisig: 2,
      },
      {
        date: "2023-01-26",
        account: 2,
        ethaccount: 0,
        evm: 2,
        multisig: 0,
      },
      {
        date: "2023-01-27",
        account: 3,
        placeholder: 5,
        ethaccount: 5,
        evm: 3,
        multisig: 2,
        storageminer: 4,
        other: 0,
      },
      {
        date: "2023-01-28",
        account: 652,
        placeholder: 6,
        ethaccount: 4,
        evm: 0,
        multisig: 2,
        storageminer: 8,
        other: 0,
      },
      {
        date: "2023-01-29",
        account: 655,
        placeholder: 8,
        ethaccount: 0,
        evm: 0,
        multisig: 2,
        storageminer: 8,
        other: 0,
      },
      {
        date: "2023-01-30",
        account: 587,
        placeholder: 4,
        ethaccount: 3,
        evm: 0,
        multisig: 2,
        storageminer: 7,
        other: 1,
      },
      {
        date: "2023-01-31",
        account: 534,
        placeholder: 0,
        ethaccount: 5,
        evm: 0,
        multisig: 1,
        storageminer: 1,
        other: 1,
      },
      {
        date: "2023-02-01",
        account: 549,
        placeholder: 2,
        ethaccount: 2,
        evm: 0,
        multisig: 1,
        storageminer: 8,
        other: 1,
      },
      {
        date: "2023-02-02",
        account: 648,
        placeholder: 2,
        ethaccount: 1,
        evm: 3,
        multisig: 1,
        storageminer: 0,
        other: 1,
      },
      {
        date: "2023-02-03",
        account: 514,
        placeholder: 6,
        ethaccount: 0,
        evm: 2,
        multisig: 1,
        storageminer: 1,
        other: 0,
      },
      {
        date: "2023-02-04",
        account: 500,
        placeholder: 10,
        ethaccount: 4,
        evm: 1,
        multisig: 2,
        storageminer: 0,
        other: 0,
      },
      {
        date: "2023-02-05",
        account: 636,
        placeholder: 7,
        ethaccount: 1,
        evm: 2,
        multisig: 2,
        storageminer: 6,
        other: 1,
      },
      {
        date: "2023-02-06",
        account: 561,
        placeholder: 5,
        ethaccount: 3,
        evm: 0,
        multisig: 2,
        storageminer: 4,
        other: 1,
      },
      {
        date: "2023-02-07",
        account: 635,
        placeholder: 7,
        ethaccount: 2,
        evm: 2,
        multisig: 2,
        storageminer: 7,
        other: 1,
      },
      {
        date: "2023-02-08",
        account: 582,
        placeholder: 10,
        ethaccount: 4,
        evm: 2,
        multisig: 0,
        storageminer: 5,
        other: 1,
      },
      {
        date: "2023-02-09",
        account: 693,
        placeholder: 4,
        ethaccount: 1,
        evm: 0,
        multisig: 1,
        storageminer: 7,
        other: 0,
      },
      {
        date: "2023-02-10",
        account: 542,
        placeholder: 0,
        ethaccount: 1,
        evm: 0,
        multisig: 0,
        storageminer: 8,
        other: 1,
      },
      {
        date: "2023-02-11",
        account: 559,
        placeholder: 10,
        ethaccount: 1,
        evm: 0,
        multisig: 1,
        storageminer: 6,
        other: 0,
      },
      {
        date: "2023-02-12",
        account: 523,
        placeholder: 1,
        ethaccount: 1,
        evm: 2,
        multisig: 1,
        storageminer: 5,
        other: 1,
      },
      {
        date: "2023-02-13",
        account: 626,
        placeholder: 9,
        ethaccount: 5,
        evm: 3,
        multisig: 2,
        storageminer: 3,
        other: 0,
      },
      {
        date: "2023-02-14",
        account: 634,
        placeholder: 9,
        ethaccount: 0,
        evm: 3,
        multisig: 1,
        storageminer: 1,
        other: 0,
      },
      {
        date: "2023-02-15",
        account: 692,
        placeholder: 2,
        ethaccount: 3,
        evm: 0,
        multisig: 2,
        storageminer: 8,
        other: 1,
      },
      {
        date: "2023-02-16",
        account: 532,
        placeholder: 7,
        ethaccount: 3,
        evm: 2,
        multisig: 2,
        storageminer: 6,
        other: 0,
      },
      {
        date: "2023-02-17",
        account: 573,
        placeholder: 10,
        ethaccount: 1,
        evm: 2,
        multisig: 2,
        storageminer: 8,
        other: 1,
      },
      {
        date: "2023-02-18",
        account: 524,
        placeholder: 1,
        ethaccount: 3,
        evm: 0,
        multisig: 1,
        storageminer: 2,
        other: 1,
      },
      {
        date: "2023-02-19",
        account: 504,
        placeholder: 7,
        ethaccount: 2,
        evm: 2,
        multisig: 1,
        storageminer: 6,
        other: 0,
      },
      {
        date: "2023-02-20",
        account: 523,
        placeholder: 3,
        ethaccount: 5,
        evm: 3,
        multisig: 1,
        storageminer: 3,
        other: 1,
      },
      {
        date: "2023-02-21",
        account: 688,
        placeholder: 5,
        ethaccount: 0,
        evm: 1,
        multisig: 2,
        storageminer: 6,
        other: 0,
      },
      {
        date: "2023-02-22",
        account: 558,
        placeholder: 6,
        ethaccount: 3,
        evm: 2,
        multisig: 2,
        storageminer: 5,
        other: 0,
      },
      {
        date: "2023-02-23",
        account: 579,
        placeholder: 5,
        ethaccount: 5,
        evm: 0,
        multisig: 2,
        storageminer: 0,
        other: 1,
      },
    ];*/
    this.chartData = {
      title: {
        text: "User Stats",
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },

      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      yAxis: {
        type: "value",
        name: "Addresses",
      },

      xAxis: {
        type: "category",
        data: [
          "2023-01-25",
          "2023-01-26",
          "2023-01-27",
          "2023-01-28",
          "2023-01-29",
          "2023-01-30",
          "2023-01-31",
          "2023-02-01",
          "2023-02-02",
          "2023-02-03",
          "2023-02-04",
          "2023-02-05",
          "2023-02-06",
          "2023-02-07",
          "2023-02-08",
          "2023-02-09",
          "2023-02-10",
          "2023-02-11",
          "2023-02-12",
          "2023-02-13",
          "2023-02-14",
          "2023-02-15",
          "2023-02-16",
          "2023-02-17",
          "2023-02-18",
          "2023-02-19",
          "2023-02-20",
          "2023-02-21",
          "2023-02-22",
          "2023-02-23",
          "2023-02-24",
          "2023-02-25",
          "2023-02-26",
          "2023-02-27",
          "2023-02-28",
          "2023-03-01",
          "2023-03-02",
          "2023-03-03",
          "2023-03-04",
          "2023-03-05",
          "2023-03-06",
          "2023-03-07",
          "2023-03-08",
          "2023-03-09",
          "2023-03-10",
          "2023-03-11",
          "2023-03-12",
          "2023-03-13",
          "2023-03-14",
          "2023-03-15",
          "2023-03-16",
          "2023-03-17",
          "2023-03-18",
          "2023-03-19",
          "2023-03-20",
          "2023-03-21",
          "2023-03-22",
          "2023-03-23",
          "2023-03-24",
          "2023-03-25",
          "2023-03-26",
          "2023-03-27",
          "2023-03-28",
          "2023-03-29",
          "2023-03-30",
          "2023-03-31",
          "2023-04-01",
          "2023-04-02",
          "2023-04-03",
          "2023-04-04",
          "2023-04-05",
          "2023-04-06",
          "2023-04-07",
          "2023-04-08",
          "2023-04-09",
          "2023-04-10",
          "2023-04-11",
          "2023-04-12",
          "2023-04-13",
          "2023-04-14",
          "2023-04-15",
          "2023-04-16",
          "2023-04-17",
          "2023-04-18",
          "2023-04-19",
          "2023-04-20",
          "2023-04-21",
          "2023-04-22",
          "2023-04-23",
          "2023-04-24",
        ],
      },

      series: [
        {
          name: "account",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },

          emphasis: {
            focus: "series",
          },

          data: [
            604, 604, 590, 644, 742, 688, 733, 551, 694, 1069, 600, 558, 686,
            658, 735, 1036, 718, 633, 598, 770, 753, 755, 1038, 2181, 1285,
            2321, 1225, 1003, 1063, 988, 823, 814, 823, 795, 797, 1342, 836,
            871, 632, 556, 523, 491, 599, 764, 920, 883, 671, 1035, 937, 763,
            843, 744, 778, 696, 710, 749, 828, 752, 774, 609, 591, 826, 892,
            783, 727, 724, 547, 489, 652, 1429, 578, 752, 749, 525, 450, 725,
            708, 695, 779, 709, 591, 599, 588, 742, 761, 658, 633, 523, 512,
            141,
          ],
        },
        {
          name: "placeholder",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 734, 894, 862, 366, 156, 122, 171, 49, 225, 135, 145, 130, 61,
            65, 59, 77, 77, 105, 45, 63, 51, 49, 119, 7164, 186, 41, 41, 4056,
            45, 42, 38, 40, 39, 35, 73, 35, 52, 35, 63, 30, 31, 911,
          ],
        },
        {
          name: "ethaccount",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 4824, 4242, 2031, 893, 693, 465, 530, 581, 432, 638, 220,
            473, 342, 310, 302, 260, 165, 275, 216, 214, 199, 640, 1822, 507,
            7734, 394, 177, 96, 70, 64, 101, 105, 174, 85, 99, 63, 277, 62, 48,
            4067, 113,
          ],
        },
        {
          name: "evm",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 106, 175, 191, 72, 14, 15, 48, 23, 16, 26, 6, 3, 11, 28, 6, 2,
            24, 24, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 17, 23, 23, 5, 29, 12,
            5, 19, 3, 2, 12, 34, 1, 0,
          ],
        },
      ],
    };

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

    console.log(`QUIZ DATA -->`);
    console.log(quizData);

    // Update profile stats using UI manager
    this.uiManager.updateProfileStats(
      this.timerManager.formatTime(quizData.stats.totalTime),
      quizData.stats.totalQuestions,
      quizData.stats.totalErrors,
      Object.keys(quizData.testCounts).length,
      quizData.score,
    );

    // Format data for charts
    const formattedData = this.formatQuizDataForCharts(this.chartData);

    // Initialize chart if not already done
    if (!this.chartManager) {
      // If DOM is already loaded
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        this.chartManager = new ChartManager("absolute");
        this.chartManager.updateData(formattedData);
      } else {
        // If DOM isn't loaded yet
        document.addEventListener("DOMContentLoaded", () => {
          this.chartManager = new ChartManager("absolute");
          this.chartManager.updateData(formattedData);
        });
      }
    } else {
      // If chartManager already exists, just update the data
      this.chartManager.updateData(formattedData);
    }
  }

  hideProfile() {
    this.uiManager.profileBox.classList.remove("activeProfile");

    // Optionally dispose of charts when hiding profile
    if (this.chartManager) {
      this.chartManager.dispose();
      this.chartManager = null;
    }
  }

  formatQuizDataForCharts(quizData) {
    // Transform your quiz data into the format expected by the charts
    // This is an example - adjust according to your actual data structure
    console.log(`QUIZ DATA -->`, quizData);

    return Object.entries(quizData).map(([date, data]) => ({
      date,
      account: data.correctAnswers || 0,
      placeholder: data.skippedQuestions || 0,
      ethaccount: data.incorrectAnswers || 0,
      evm: 0,
      multisig: 0,
      storageminer: 0,
      other: 0,
      // Calculate ratios
      accountRatio: data.correctAnswers / data.totalQuestions || 0,
      placeholderRatio: data.skippedQuestions / data.totalQuestions || 0,
      ethaccountRatio: data.incorrectAnswers / data.totalQuestions || 0,
      evmRatio: 0,
      multisigRatio: 0,
      storageMinerRatio: 0,
      otherRatio: 0,
    }));
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
