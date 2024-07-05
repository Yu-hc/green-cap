const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const isDev = process.env.NODE_ENV !== 'production';

function createWindow () {
       const win = new BrowserWindow({
              width: isDev ? 1300 : 800 ,
              height: 600,
              webPreferences: {
                     contextIsolation : true,
                     nodeIntegration : true,
                     preload: path.join(__dirname, 'preload.js'),
              }
       })

       // open dev tools
       if(isDev){
              win.webContents.openDevTools();
       }
       win.loadFile(path.join(__dirname, './renderer/index.html'))
}

app.whenReady().then(() => {
       createWindow()

       app.on('activate', () => {
              if (BrowserWindow.getAllWindows().length === 0) {
                     createWindow()
              }
       })
})

app.on('window-all-closed', () => {
       if (process.platform == 'darwin') {
              app.quit()
       }
})


// import {BrowserWindow, app} from "electron";
// import pie from "puppeteer-in-electron";
// import puppeteer from "puppeteer-core";

// const main = async () => {
//   const browser = await pie.connect(app, puppeteer);

//   const window = new BrowserWindow();
//   const url = "https://example.com/";
//   await window.loadURL(url);

//   const page = await pie.getPage(browser, window);
//   console.log(page.url());
//   window.destroy();
// };

// main();




