// Elements
const timer = document.getElementById("timer");
const round = document.getElementById("round");
const resetBtn = document.querySelector("#reset");
const startPauseBtn = document.querySelector("#start-pause");

// Application class
class Application {
  constructor() {
    this.audio = new Audio("../sound/alarm.mp3");
    this.round = 1;

    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.status = "start";
  }
  tick() {
    if (this.min === 20) {
      ++this.round;
      clearInterval(this.interval);
      this.status = "start";
      startPauseBtn.innerText = "START";
      this.audio.play();
      round.innerText = "ROUND #" + this.round;
      startPauseBtn.style.display = "none"
    } else {
      ++this.sec;
      if (this.sec === 60) {
        ++this.min;
        this.sec = 0;
      }
      if (this.min === 60) {
        ++this.hour;
        this.min = 0;
      }
    }
    const secStr = this.sec.toString().padStart(2, "0");
    const minStr = this.min.toString().padStart(2, "0");
    const hourStr = this.hour.toString().padStart(2, "0");
    timer.innerText = `${hourStr}:${minStr}:${secStr}`;
  }

  run() {
    startPauseBtn.addEventListener("click", () => {
      if (this.status === "start") {
        this.interval = setInterval(this.tick.bind(this), 1000);
        this.status = "stop";
        startPauseBtn.innerText = "PAUSE";
      } else if (this.status === "stop") {
        clearInterval(this.interval);
        this.status = "start";
        startPauseBtn.innerText = "START";
      }
    });

    resetBtn.addEventListener("click", () => {
      this.reset();
    });
  }

  reset() {
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    clearInterval(this.interval);
    this.status = "start";
    startPauseBtn.innerText = "START";
    timer.innerText = "00:00:00";
    this.audio.pause("alarm.mp3");
    this.audio.currentTime = 0;
    startPauseBtn.style.display = "block"
  }
}

// Starting logic
const app = new Application();

app.run();
