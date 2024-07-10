const path = require("node:path")
const { BrowserWindow, app, ipcMain, Notification } = require("electron")
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core")
const fs = require("fs")

const isDev = process.env.NODE_ENV !== "production"

// args for web crawler
let string_webmailUser = ""
let string_webmailPsswd = ""
let showCrawler = true
let formUrl =
	"https://docs.google.com/forms/d/e/1FAIpQLSeVkvrtuFoeKN3Wl1NWovOiA0uNGKZyCe538bpDbq9mP_mKUw/viewform?usp=sf_link"
let discussGroup = 0
let discussTopic = ""
let int_evaluationScore = 2
let string_suggestion = ""
let randomSuggestion = false
let randomCheck = false
let stringArray_RandomSuggestion

let arg_pauseBeforeAction = 500

const selectorPath_pages =
	"div.RH5hzf.RLS9Fe > div > div.Dq4amc > div > div.N0gd6 > div.cBGGJ.OIC90c"
const selectorPath_evaluation =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div"
const selectorPath_evaluationButton1 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const selectorPath_evaluationButton2 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const selectorPath_suggestion =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(5) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input"
const selectorPath_nextPage1 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span"
const selectorPath_nextPage2 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div:nth-child(2) > span"
const selectorPath_selectGroup =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.vQES8d > div > div:nth-child(1) > div.ry3kXd"
const selectorPath_group =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div.MocG8c.HZ3kWc.mhLiyf.OIC90c.LMgvRb.KKjvXb"
const selectorPath_discussTopic =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input"

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

let mainWindow

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}
function createNotification(){
	new Notification({
	title: NOTIFICATION_TITLE,
	body: NOTIFICATION_BODY
     }).show()
}

function getEvaluationScore() {
	if (!randomCheck) return int_evaluationScore
	return Math.floor(Math.random() * 5) + 1
}
function getSuggestion() {
	if (!randomSuggestion) return string_suggestion
	return stringArray_RandomSuggestion[
		Math.floor(Math.random() * stringArray_RandomSuggestion.length)
	]
}

const loadRandomComments = async () => {
	let $ = fs.readFileSync("./randomSuggestion.txt", "utf-8")
	stringArray_RandomSuggestion = $.split("\n")
}

function save_args() {
	let datas = {
		string_webmailUser,
		string_webmailPsswd,
		showCrawler,
		formUrl,
		discussGroup,
		discussTopic,
		int_evaluationScore,
		string_suggestion,
		randomSuggestion,
		randomCheck,
	}
	let sData = JSON.stringify(datas)
	fs.writeFileSync("data/data.json", sData)
	console.log("Data Saved")
}

const main = async () => {
	save_args()
	createNotification()
	const browser = await pie.connect(app, puppeteer)
	const window = new BrowserWindow({
		show: showCrawler,
		parent: mainWindow,
	})
	const page = await pie.getPage(browser, window)

	await window.loadURL(formUrl)
	// await window.loadFile(formUrl)
	// TODO: set timout for loadurl , handle error
	const innerHtml_pages = await page.$eval(
		selectorPath_pages,
		(el) => el.innerHTML
	)
	const int_totalPages = Number(innerHtml_pages[innerHtml_pages.length - 2])
	for (let int_page = 0; int_page < int_totalPages; int_page++) {
		/*
		fill in the score and suqqestions
		*/
		await delay(1000)
		if (int_page == 0) {
			await page.type(selectorPath_discussTopic, discussTopic)
			// go to next page
			await page.click(selectorPath_nextPage1)
		} else {
			// go to next page
			for (let div = 0; div < 3; div++) {
				await page.click(
					selectorPath_evaluation +
						":nth-child(" +
						String(div + 2) +
						")" +
						" > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(" +
						String(getEvaluationScore() + 1) +
						")"
				)
				await delay(arg_pauseBeforeAction)
			}
			await page.type(selectorPath_suggestion, getSuggestion())
			await delay(arg_pauseBeforeAction)
			await page.click(selectorPath_nextPage2)
		}
	}
	await delay(arg_pauseBeforeAction)
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
		loadRandomComments()
		createWindow()
		
		app.on("activate", () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow()
			}
		}).then()
		
	}),
		app.on("window-all-closed", () => {
			if (process.platform == "darwin") {
				app.quit()
			}
		})
})

ipcMain.on("input-webmailUser", (event, user) => {
	string_webmailUser = String(user)
})

ipcMain.on("input-webmailPsswd", (event, psswd) => {
	string_webmailPsswd = String(psswd)
})

ipcMain.on("input-formUrl", (event, url) => {
	formUrl = String(url)
})

ipcMain.on("input-discussGroup", (event, discussgroup) => {
	discussGroup = discussgroup
})

ipcMain.on("input-randomSuggestion", (event, randomsuggestion) => {
	randomSuggestion = randomsuggestion
})

ipcMain.on("input-randomCheck", (event, randomcheck) => {
	randomCheck = randomcheck
})

ipcMain.on("button-startFilling", (event, arg) => {
	main()
})





