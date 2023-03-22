const fileBtn = document.getElementById("file");
const roundTime = document.getElementById("round-time");

fileBtn.addEventListener("click", () => {
  connectionToMain.connect("dialog");
});

roundTime.addEventListener("input", (event) => {
  const regex = /^[1-9][0-9]$/;
  if (!regex.test(roundTime.value)) {
    roundTime.value = roundTime.value.replace(/[^0-9]/g, "");
  }
  if (roundTime.value[0] == 0) {
    roundTime.value = roundTime.value.replace("0", "");
  } else {
    console.log(`Input value changed to ${roundTime.value}`);
    connectionToMain.sendMsg(roundTime.value);
  }
});
