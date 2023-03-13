
const btn = document.getElementById("file");

setTimeout(()=>{
  btn.addEventListener("click", () => {
    window.connectionToMain.connect("dialog")
  }),
  1000
}
);