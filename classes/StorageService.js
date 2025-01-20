export class StorageService {
  constructor(defaultData) {
    this.defaultData = defaultData;
  }

  getQuizData() {
    const storedData = localStorage.getItem("quizData");
    return storedData ? JSON.parse(storedData) : this.defaultData;
  }

  saveQuizData(data) {
    localStorage.setItem("quizData", JSON.stringify(data));
  }
}
