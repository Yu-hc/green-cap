const {BrowserWindow, app} = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

// Importing BrowserWindow from Main Process using Electron remote
// const BrowserWindow = electron.remote.BrowserWindow;



function changeColor(newColor) {
	const elem = document.getElementById("para");
	elem.style.color = newColor;
}
const test = async() =>{
	console.log(5);
};
test();


// const main = async () => {
//   await pie.initialize(app);
//   const browser = await pie.connect(app, puppeteer);
 
//   const window = new BrowserWindow();
//   const url = "https://www.google.com/";
//   await window.loadURL(url);
 
//   const page = await pie.getPage(browser, window);
//   console.log(page.url());
//   window.destroy();
// };

// main();