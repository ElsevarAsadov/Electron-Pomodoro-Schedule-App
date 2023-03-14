const fileBtn = document.getElementById("file");
const roundTime = document.getElementById("round-time");

fileBtn.addEventListener("click", () => {
  connectionToMain.connect("dialog");
});

roundTime.addEventListener('input', (event) => {
  const newValue = event.target.value;
  console.log(`Input value changed to ${newValue}`);
  connectionToMain.sendMsg(parseInt(newValue))
});

