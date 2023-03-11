const information = document.getElementById("timer");
//initial timer text
information.innerText = "00:00:00";

const audioPlayer = new Audio("alarm.mp3");
status = "start";

function button_handler() {
  const addButton = document.querySelector("#add-btn");
  const taskInput = document.querySelector("#task-input");
  const tasksContainer = document.querySelector(".tasks");

  addButton.addEventListener("click", () => {
    const taskName = taskInput.value;
    if (taskName.trim() !== "") {
      const newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.innerHTML = `
      <div class="task"><p>${taskName}</p></div>
      `;
      tasksContainer.appendChild(newTask);
      taskInput.value = "";
    }
  });
}

function pomodoroTimer() {
  let sec = 0;
  let min = 0;
  let hour = 0;

  if (status === "start") {
    const timerId = setInterval(() => {
      sec ++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (min === 60) {
        hour++;
        min = 0;
      }

      if(min === 20){
        audioPlayer.play()
        status = "pause"
        clearInterval(timerId)
      }
      const secStr = sec.toString().padStart(2, "0");
      const minStr = min.toString().padStart(2, "0");
      const hourStr = hour.toString().padStart(2, "0");

      information.innerText = `${secStr}:${minStr}:${hourStr}`
    }, 1);
  }
}

pomodoroTimer();
button_handler();
