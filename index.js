const path = require("node:path")
const { BrowserWindow, app, ipcMain } = require("electron")
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core")

const isDev = process.env.NODE_ENV !== "production"

// args for web crawler
let showCrawler = true
let formUrl

let mainWindow

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}

const main = async () => {
	const browser = await pie.connect(app, puppeteer)

	const window = new BrowserWindow({
		show: showCrawler,
		// parent: mainWindow,
	})
	const page = await pie.getPage(browser, window)

	// await page.click('#o-content > div > main > section > section.o-section.o-news-list > div > div.o-section__more > a')

	// block  css and js
	// await page.setRequestInterception(true)
	// page.on('request',  (req) => {
	//         if(req.resourceType() == "stylesheet" || req.resourceType() == "font" || req.resourceType() == "image"){
	//             req.abort();
	//         }
	//         else {
	//             req.continue();
	//         }
	// })

	await window.loadURL(formUrl)
    // TODO: set timout for loadurl , handle error
	await delay(2000)
	console.log(page.url())
	window.destroy()

	mainWindow.webContents.send("crawler-closed")
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: isDev ? 1300 : 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
		show: false,
	})

	// open dev tools
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
	mainWindow.once("ready-to-show", () => {
		mainWindow.show()
	})
}

pie.initialize(app).then(() => {
	app.whenReady().then(() => {
		createWindow()
		app.on("activate", () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow()
			}
		})
	}),
		app.on("window-all-closed", () => {
			if (process.platform == "darwin") {
				app.quit()
			}
		})
})

ipcMain.on("clicked-button", (event, arg) => {
	main()
})

ipcMain.on("input-url", (event, url) => {
	console.log(url)
	formUrl = String(url)
	console.log(formUrl)
})
