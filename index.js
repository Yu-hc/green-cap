const path = require("node:path")
const { BrowserWindow, app, ipcMain, Notification } = require("electron")
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core")
const fs = require("fs")
const sp = require("./data/constants/selectorPath")
const str = require("./data/constants/string")
const defaults = require("./data/constants/default")

const isDev = process.env.NODE_ENV == "production"

// args for web crawler
let string_webmailUser = ""
let string_webmailPsswd = ""
let showCrawler = false
let formUrl = ""
let discussGroup = 0
let discussTopic = ""
let int_evaluationScore = 1
let string_suggestion = ""
let randomSuggestion = false
let randomCheck = false
let stringArray_RandomSuggestion = str.randomSuggestion
let useMail = true

let arg_pauseBeforeAction = 500
let pathUserData = app.getPath("userData")

const NOTIFICATION_TITLE = "Basic Notification"
const NOTIFICATION_BODY = "Notification from the Main process"

let mainWindow

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}
function createNotification() {
	new Notification({
		title: NOTIFICATION_TITLE,
		body: NOTIFICATION_BODY,
	}).show()
}

function getEvaluationScore() {
	if (!randomCheck) return int_evaluationScore
	return Math.floor(Math.random() * 3) + 1
}
function getSuggestion() {
	if (!randomSuggestion) return string_suggestion
	return stringArray_RandomSuggestion[
		Math.floor(Math.random() * stringArray_RandomSuggestion.length)
	]
}

const load_args = async () => {
	let exist = fs.existsSync(path.join(pathUserData, "./data.json"))
	if (exist) {
		let sData = fs.readFileSync(path.join(pathUserData, "./data.json"))
		let datas = JSON.parse(sData)
		// load values to index.js
		string_webmailUser = datas.string_webmailUser
		string_webmailPsswd = datas.string_webmailPsswd
		showCrawler = datas.showCrawler
		formUrl = datas.formUrl
		discussGroup = datas.discussGroup
		discussTopic = datas.discussTopic
		int_evaluationScore = datas.int_evaluationScore
		string_suggestion = datas.string_suggestion
		randomSuggestion = datas.randomSuggestion
		randomCheck = datas.randomCheck
		useMail = datas.useMail
		// send datas to frontend
		mainWindow.webContents.send("load-datas", datas)
	}
}
const reset_args = async () => {
	let datas = {
		string_webmailUser: defaults.string_webmailUser,
		string_webmailPsswd: defaults.string_webmailPsswd,
		showCrawler: defaults.showCrawler,
		formUrl: defaults.formUrl,
		discussGroup: defaults.discussGroup,
		discussTopic: defaults.discussTopic,
		int_evaluationScore: defaults.int_evaluationScore,
		string_suggestion: defaults.int_evaluationScore,
		randomSuggestion: defaults.randomSuggestion,
		randomCheck: defaults.randomCheck,
		useMail: defaults.useMail,
	}
	// send datas to frontend
	mainWindow.webContents.send("load-datas", datas)
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
		useMail,
	}
	let sData = JSON.stringify(datas)
	fs.writeFileSync(path.join(pathUserData, "./data.json"), sData)
	// fs.writeFileSync(path.join(app.getPath('userData'), './data/data.json'), sData)
}

const main = async () => {
	save_args()
	const browser = await pie.connect(app, puppeteer)
	const window = new BrowserWindow({
		show: showCrawler,
		parent: mainWindow,
	})
	const page = await pie.getPage(browser, window)

	await window.loadURL(formUrl)
	// TODO: set timout for loadurl , handle error
	try {
		const innerHtml_pages = await page.$eval(sp.pages, (el) => el.innerHTML)
		let int_totalPages
		// if > 10 pages, length will > 11
		if (innerHtml_pages.length > 11) {
			int_totalPages =
				Number(innerHtml_pages[innerHtml_pages.length - 3]) +
				Number(innerHtml_pages[innerHtml_pages.length - 4]) * 10
		} else {
			int_totalPages = Number(innerHtml_pages[innerHtml_pages.length - 3])
		}
		mainWindow.webContents.send("progress-totalPages", int_totalPages)

		for (let int_page = 0; int_page < int_totalPages; int_page++) {
			/*
		fill in the score and suqqestion
		*/
			await delay(1000)
			// send the current page to frontend(log and progress bar)
			mainWindow.webContents.send("progress-currentPage", int_page)

			if (int_page == 0) {
				// await page.type(sp.discussTopic, discussTopic)
				// go to next page
				await page.click(sp.nextPage1)
			} else {
				// go to next page
				for (let div = 0; div < 4; div++) {
					await page.click(
						`xpath//html/body/div[10]/div[1]/div/form/div/table/tbody/tr[${String(
							div + 3
						)}]/td[2]/table/tbody/tr/td[${String(
							getEvaluationScore() + 2
						)}]/input`
					)
					await delay(arg_pauseBeforeAction)
				}
				await page.type(sp.suggestion, getSuggestion())
				await delay(arg_pauseBeforeAction)
				if (int_page != int_totalPages - 1)
					await page.click(sp.nextPage2)
			}
		}
		mainWindow.webContents.send("messages", "done :)")
		await delay(arg_pauseBeforeAction * 5)
	} catch (e) {
		mainWindow.webContents.send("messages", "failed :(")
	} finally {
		window.destroy()
	}
}

const scrape = async () => {
	save_args()
	// initialize page
	const browser = await pie.connect(app, puppeteer)
	const window = new BrowserWindow({
		show: showCrawler,
		parent: mainWindow,
	})
	const page = await pie.getPage(browser, window)
	await window.loadURL(str.webMailUrl)

	// login to webmail
	await page.type(sp.username, string_webmailUser)
	await page.type(sp.password, string_webmailPsswd)
	await page.click(sp.login)
	await delay(arg_pauseBeforeAction * 2)

	// TODO try for
	// Check if user and password is correct
	try {
		await page.click(sp.login)
		mainWindow.webContents.send("messages", "wrong user password")
		console.log("wrong password")
		window.destroy()
		mainWindow.webContents.send("crawler-closed")
		return
	} catch (e) {}

	mainWindow.webContents.send("messages", "scraping mail...")

	let gotMail = false
	// TODO: error for can't find form
	// scrape and set formUrl
	for (let currentPage = 1; currentPage < 30; currentPage++) {
		if (gotMail) break

		await delay(arg_pauseBeforeAction * 2)
		let element_senders = await page.$$(sp.sender)
		let element_titles = await page.$$(sp.title)
		let array_sender = []
		let index = 0
		for (let element_sender of element_senders) {
			let sender = await page.evaluate(
				(el) => el.innerHTML,
				element_sender
			)
			// check sender
			if (sender == str.redcapSender) {
				let out = await page.evaluate(
					(el) => el.innerHTML,
					element_titles[index]
				)
				let sel =
					"table > tbody > tr:nth-child(" + String(index + 1) + ")"
				// check title of the mail and set formUrl
				if (
					out.includes(str.redcapTitle1) &&
					out.includes(str.redcapTitle2)
				) {
					await page.waitForSelector(sel)
					await page.click(sel)
					await delay(arg_pauseBeforeAction * 5)
					let iframeElementHandle = await page.$("iframe")
					let iframe = await iframeElementHandle.contentFrame()
					let href = await iframe.$eval(sp.formUrl, (el) => el.href)
					gotMail = true
					formUrl = href
				}
			}
			index++
			array_sender.push(String(sender))
		}
		await page.click(sp.nextPageWebmail)
	}
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
			frame: false,
		},
		show: false,
		env: {
			DISPLAY: ":10.0",
		},
	})

	// open dev tools
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
	mainWindow.setMenuBarVisibility(false)
	mainWindow.webContents.on("did-finish-load", () => {
		load_args()
	})
	mainWindow.once("ready-to-show", () => {
		mainWindow.show()
	})
}

pie.initialize(app).then(() => {
	app.whenReady().then(() => {
		createWindow(),
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

ipcMain.on("input-webmailUser", (event, user) => {
	string_webmailUser = String(user)
	save_args()
})

ipcMain.on("input-webmailPsswd", (event, psswd) => {
	string_webmailPsswd = String(psswd)
	save_args()
})

ipcMain.on("input-formUrl", (event, url) => {
	formUrl = String(url)
	save_args()
})

ipcMain.on("input-discussGroup", (event, discussgroup) => {
	discussGroup = discussgroup
	save_args()
})

ipcMain.on("toggle-randomSuggestion", (event, randomsuggestion) => {
	randomSuggestion = randomsuggestion
	save_args()
})

ipcMain.on("toggle-randomCheck", (event, randomcheck) => {
	randomCheck = randomcheck
	save_args()
})
ipcMain.on("toggle-showCrawler", (event, showcrawler) => {
	showCrawler = showcrawler
	save_args()
})
ipcMain.on("toggle-useMail", (event, usemail) => {
	useMail = usemail
	save_args()
})

ipcMain.on("button-launch", (event, arg) => {
	if (useMail) {
		scrape().then(() => main())
		return
	}
	main()
})
ipcMain.on("button-reset", () => {
	reset_args()
})
