/* This module is front-end renderer
every user events peforms here and in some situation 
some events is sent to the main process which is the app window
in electron.*/



// Elements
const timer = document.getElementById("timer");
const round = document.getElementById("round");
const settingsBtn = document.getElementById("options");
const resetBtn = document.querySelector("#reset");
const startPauseBtn = document.querySelector("#start-pause");

// Application class
class Application {
  constructor() {
    //audio player class
    this.audio = new Audio("../sound/alarm.mp3");
    //initial timer properties
    this.round = 1;
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.status = "start";

    //settings window status
    this.win2_status = "close";

    //seetings window listener
    window.addEventListener("click", (event) => {
      //if settings button clicked
      console.log(event.target.id);
      if ((event.target.id === "options") & (this.win2_status === "close")) {
        //opening window
        window.connectionToMain.connect("open");
        this.win2_status = "open";
      }
      //if something clicked except settings btn.
      else if (this.win2_status === "open") {
        //sending msg to main proccess
        window.connectionToMain.connect("close");
        this.win2_status = "close";
      }
    });
  }
  //this function increases one second every call
  tick() {
    //checking if time is up
    this.check_time();
    
    //increasing second
    ++this.sec;

    if (this.sec === 60) {
      ++this.min;
      this.sec = 0;
    }
    if (this.min === 60) {
      ++this.hour;
      this.min = 0;
    }

    //creates proper timer format - ("hh:mm:ss")
    const secStr = this.sec.toString().padStart(2, "0");
    const minStr = this.min.toString().padStart(2, "0");
    const hourStr = this.hour.toString().padStart(2, "0");

    //changes timer values in the html
    timer.innerText = `${hourStr}:${minStr}:${secStr}`;
  }

  //checks if time is up or not.
  check_time() {
    if (this.min === 20) {
      ++this.round;
      clearInterval(this.interval);
      this.status = "start";
      startPauseBtn.innerText = "START";
      this.audio.play();
      round.innerText = "ROUND #" + this.round;
      startPauseBtn.style.display = "none";
    }
  }


  run() {
    startPauseBtn.addEventListener("click", () => {
      //if btn is clicked then starts tick.
      if (this.status === "start") {
        this.interval = setInterval(this.tick.bind(this), 1);
        this.status = "stop";
        startPauseBtn.innerText = "PAUSE";
        //clears timer if time is up or reset
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

  //reset every timer property
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
    startPauseBtn.style.display = "block";
  }
}


const app = new Application();

//tick
app.run();
