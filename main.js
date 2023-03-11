const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

class App {
  constructor(width, height) {
    this.window_w = width;
    this.window_h = height;
    //when app is ready to run then show gui
    app.whenReady().then(() => {
      //removing menu bar from application menu
      Menu.setApplicationMenu(null);
      //creating window
      this._createWindow(width, height);

      //setting window icon
      this.win.setIcon("favicon.png");
      //loads html
      this._loadGui();

      //devtool for debugging.
      //this.win.webContents.openDevTools();
    });
  }
  _createWindow() {
    this.win = new BrowserWindow({
      width: this.window_w,
      height: this.window_h,
      resizable: false,
      fullscreenable: false,
    });
  }

  _loadGui() {
    this.win.loadFile("app.html");
  }

  _checkEvents() {
    //for windows and linux
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });

    //for mac

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  }
}

application = new App(800, 600);
