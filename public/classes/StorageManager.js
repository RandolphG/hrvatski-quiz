export class StorageManager {
  constructor() {
    this.storageKey = "quizData";
  }

  getQuizData() {
    return (
      JSON.parse(localStorage.getItem(this.storageKey)) || {
        testCounts: {},
        stats: {
          totalTime: 0,
          totalQuestions: 0,
          totalErrors: 0,
        },
        score: {},
      }
    );
  }

  saveQuizData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  updateStats(category, totalTime, totalQuestions, errorTotal, percentage) {
    const quizData = this.getQuizData();

    // Update global stats
    quizData.stats.totalTime += totalTime;
    quizData.stats.totalQuestions += totalQuestions;
    quizData.stats.totalErrors += errorTotal;

    // Update category-specific stats
    if (!quizData.score[category]) {
      quizData.score[category] = { played: 0, error: 0, score: 0 };
    }
    quizData.score[category].played++;
    quizData.score[category].error = errorTotal;
    quizData.score[category].score = percentage;

    this.saveQuizData(quizData);
  }
}
