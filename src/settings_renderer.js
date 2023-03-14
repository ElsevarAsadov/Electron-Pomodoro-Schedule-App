const fileBtn = document.getElementById("file");

fileBtn.addEventListener("click", () => {
  connectionToMain.connect("dialog");
});
