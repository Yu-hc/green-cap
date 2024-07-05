const { BrowserWindow, contextBridge, ipcRenderer , app } = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

contextBridge.exposeInMainWorld('pie', {
  initialize: (app) => pie.initialize(app),
  connect: (app, ...args) => pie.connect(app, ...args),
  getPage: () => pie.getPage(browser, window),

});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});






window.addEventListener('DOMContentLoaded', () => {
       const replaceText = (selector, text) => {
         const element = document.getElementById(selector)
         if (element) element.innerText = text
       }
     
       for (const dependency of ['chrome', 'node', 'electron']) {
         replaceText(`${dependency}-version`, process.versions[dependency])
       }
})

