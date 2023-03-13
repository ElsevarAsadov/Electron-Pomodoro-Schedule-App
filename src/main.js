/* This is main proccess modoule which electron window is created
here and every window events are controlled.*/

const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");

class App {
  constructor() {
    /*aplication is designed for 800x600 screen resoulution
    // if you change then posibly see some visual problems.*/
    this.window_w = 800;
    this.window_h = 600;
    //when app is ready to run then show gui
    app.whenReady().then(() => {
      //removing menu bar from application menu
      Menu.setApplicationMenu(null);
      //creating window
      this._createWindow();
      //setting window icon
      this.win.setIcon("assets/favicon.png");
      //loads html
      this._loadGui();

      //devtool for debugging.
      this.win.webContents.openDevTools();
    });
  }

  _createWindow() {
    //main proccess window
    this.win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: this.window_w,
      height: this.window_h,
      resizable: false,
      fullscreenable: false,
      title: "Pomodoro App",
    });

    //connection with renderer process.
    ipcMain.on("openSettings", (event, msg) => {
      //'open' idicates setting window should be opened
      if (msg === "open") {
        //getting parent window
        const parentWindow = BrowserWindow.fromWebContents(event.sender);
        //parent window sizes to open setting window in the center
        const parentWindowBounds = parentWindow.getBounds();

        const { width, height } = parentWindowBounds;

        //settigs window sizes
        const childWindowWidth = 300;
        const childWindowHeight = 300;

        const x = parentWindowBounds.x + width / 2 - childWindowWidth / 2;
        const y = parentWindowBounds.y + height / 2 - childWindowHeight / 2;

        //settings window properties
        this.win2 = new BrowserWindow({
          webPreferences: {
            preload: path.join(__dirname, "preload.js"),
          },
          width: 300,
          height: 300,
          resizable: false,
          fullscreen: false,
          frame: false,
          parent: BrowserWindow.fromWebContents(event.sender),
          x,
          y,
        });

        //loading settings window gui
        this.win2.loadFile("src/settings.html");
        this.win2.webContents.openDevTools();
        //when setting window is opened main proccess window cannot be moveable
        this.win.setMovable(false);
      }
      if (msg === "close") {
        //settings window closing...
        this.win2.close();
        this.win.setMovable(true);
      }

      if (msg === "dialog") {
        //showing file dialog to select sound effect
        this._fileDialog();
      }
    });
  }

  //loades main proceess window gui
  _loadGui() {
    this.win.loadFile("src/app.html");
  }

  //checks main proccess window closing events
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

  _fileDialog() {
    //if custom sound file is entered
    dialog
      .showOpenDialog(this.win2, {
        filters: [
            { name: 'Sound', extensions: ["mp3"] }
          ],
        properties: ['openFile']
    }
      )
      .then((result) => {
        this.win.webContents.send('setPath', result.filePaths[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//application directly run when instance is created.
application = new App();
