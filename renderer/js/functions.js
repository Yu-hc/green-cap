// Importing BrowserWindow from Main Process using Electron remote

// const { ipcRenderer } = require("electron")

// const BrowserWindow = electron.remote.BrowserWindow;
const buttonRed = document.getElementById("buttonRed")
const buttonBlue = document.getElementById("buttonBlue")
const inputFormUrl = document.getElementById("inputFormUrl")
const inputDiscussGroup = document.getElementById("inputDiscussGroup")

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


buttonRed.addEventListener("click", () => {
	console.log("clicked red")
	ipcRenderer.send("clicked-button", "red")
})

buttonBlue.addEventListener("click", () => {
	console.log("clicked blue")
})

ipcRenderer.on('crawler-closed', () => {
	console.log("crawler-closed")
})



inputFormUrl.addEventListener('change', () =>{
	ipcRenderer.send("input-formUrl", inputFormUrl.value)
})

inputDiscussGroup.addEventListener('change', () =>{
	ipcRenderer.send("input-discussGroup", inputDiscussGroup.value)
})