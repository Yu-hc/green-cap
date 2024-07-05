// Importing BrowserWindow from Main Process using Electron remote

// const { ipcRenderer } = require("electron")

// const BrowserWindow = electron.remote.BrowserWindow;
const redButton = document.getElementById("red")
const blueButton = document.getElementById("blue")
const inputBox = document.getElementById("formUrl")

function changeColor(newColor) {
	const elem = document.getElementById("para")
	elem.style.color = newColor
}
const test = async () => {
	console.log(5)
}
test()

const main2 = async () => {
	const browser = await pie.connect(app, puppeteer)

	const window = new BrowserWindow()
	const url = "https://www.google.com/"
	await window.loadURL(url)

	const page = await pie.getPage(browser, window)
	console.log(page.url())
	window.destroy()
}


redButton.addEventListener("click", () => {
	console.log("clicked red")
	ipcRenderer.send("clicked-button", "red")
})

blueButton.addEventListener("click", () => {
	console.log("clicked blue")
})

ipcRenderer.on('crawler-closed', () => {
	console.log("crawler-closed")
})



inputBox.addEventListener('change', () =>{
	ipcRenderer.send("input-url", inputBox.value)
})