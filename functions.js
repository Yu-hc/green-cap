const electron = require('electron')

// Importing BrowserWindow from Main Process using Electron remote
// const BrowserWindow = electron.remote.BrowserWindow;

function changeColor(newColor) {
	const elem = document.getElementById("para");
	elem.style.color = newColor;
}

//  function test(){
//        const elem = document.getElementById("para");
// 	elem.style.color = 'red';
// };