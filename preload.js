const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("logic", {
  pomodoro_logic: () => pomodoroTimer(),
});

function pomodoroTimer() {
  let sec = 0;
  let min = 0;
  let hour = 0;
  let status = "pause";

  if (status == "start") {
    const timerId = setInterval(() => {
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (min === 60) {
        hour++;
        min = 0;
      }
      const secStr = sec.toString().padStart(2, "0");
      const minStr = min.toString().padStart(2, "0");
      const hourStr = hour.toString().padStart(2, "0");

      ipcRenderer.send("pomodoro_update", {
        hour: hourStr,
        min: minStr,
        sec: secStr,
      });
    }, 1000);
  }
}