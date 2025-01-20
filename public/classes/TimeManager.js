export class TimerManager {
  constructor() {
    this.counter = null;
    this.counterLine = null;
    this.totalTimeInterval = null;
    this.timeValue = 30;
    this.widthValue = 0;
    this.totalTime = 0;
  }

  startTimer(timeCount, timeText, onTimeout) {
    let time = this.timeValue;
    this.counter = setInterval(() => {
      timeCount.textContent = time;
      time--;
      if (time < 9) {
        timeCount.textContent = "0" + timeCount.textContent;
      }
      if (time < 0) {
        onTimeout();
      }
    }, 1000);
  }

  startTimerLine(timeLine) {
    let time = this.widthValue;
    this.counterLine = setInterval(() => {
      time++;
      timeLine.style.width = time + "px";
      if (time > 549) {
        clearInterval(this.counterLine);
      }
    }, 57);
  }

  startTotalTimeCounter(updateCallback) {
    console.log(`TOTAL TIME: ${this.totalTime}`);
    this.totalTimeInterval = setInterval(() => {
      this.totalTime++;
      updateCallback(this.formatTime(this.totalTime));
    }, 1000);
  }

  stopAllTimers() {
    clearInterval(this.counter);
    clearInterval(this.counterLine);
    clearInterval(this.totalTimeInterval);
  }

  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  reset() {
    this.timeValue = 30;
    this.widthValue = 0;
    this.totalTime = 0;
    this.stopAllTimers();
  }
}
