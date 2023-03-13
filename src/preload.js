/* This module is a layer between 'main.js' (server side) and
'renderer.js' client side.This is because Electron doesnt allow
to send message to the server side directly due to security reason.*/


const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('connectionToMain', {
    //'connect is function name to call
    connect: (msg) => ipcRenderer.send('openSettings', msg)
})

contextBridge.exposeInMainWorld('mainWindow', {
    getPath: (info) => ipcRenderer.on('setPath', info)
  })