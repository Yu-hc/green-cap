const path = require("node:path")
const { BrowserWindow, app, ipcMain, Notification } = require("electron")
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core")
const fs = require("fs")

const isDev = process.env.NODE_ENV !== "production"

// args for web crawler
let string_webmailUser = "b11401090"
let string_webmailPsswd = "Ethan0416"
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
let webMailUrl = "https://wmail1.cc.ntu.edu.tw/rc/index.php"
const redcapSender = "redcap@ntuh.gov.tw"
const string_redcapTitle1 = "課程教學效果調查表"
const string_redcapTitle2 = "請於期限內填寫完成，謝謝您"
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
const selectorPath_username = "#rcmloginuser"
const selectorPath_password = "#rcmloginpwd"
const selectorPath_login = "#rcmloginsubmit"
const selectorPath_sender =
	"td.subject > span.fromto.skip-on-drag > span > span"
const selectorPath_title = "td.subject > span.subject > a > span"
const selectorPath_mail = "table > tbody > tr"
const selectorPath_formUrl = "#message-htmlpart1 > div > p:nth-child(2) > a"
const selectorPath_nextPageWebmail = "#rcmbtn116"

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
const load_args = async () => {
	let exist = fs.existsSync("data/data.json")
	if (exist) {
		let sData = fs.readFileSync("data/data.json")
		let datas = JSON.parse(sData)
		mainWindow.webContents.send("load-datas", datas)
		console.log(datas)
	}
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
	load_args()
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

const scrape = async () => {
	save_args()

	const browser = await pie.connect(app, puppeteer)
	const window = new BrowserWindow({
		show: showCrawler,
		parent: mainWindow,
	})
	const page = await pie.getPage(browser, window)

	await window.loadURL(webMailUrl)

	// login to webmail
	await page.type(selectorPath_username, string_webmailUser)
	await page.type(selectorPath_password, string_webmailPsswd)
	await page.click(selectorPath_login)

	await delay(arg_pauseBeforeAction * 2)

	// get messages this page
	// const totalMessages = await page.$eval(
	// 	"#rcmcountdisplay",
	// 	(el) => el.innerHTML
	// )
	// let int_messagesCount =
	// 	Number(totalMessages.split(" ")[3]) -
	// 	Number(totalMessages.split(" ")[1]) +
	// 	1

	let gotMail = 0
	for (let int_currentPage = 1; int_currentPage < 6; int_currentPage++) {
		if (gotMail) break

		await page.click(selectorPath_nextPageWebmail)

		await delay(arg_pauseBeforeAction * 2)
		let element_senders = await page.$$(selectorPath_sender)
		let element_titles = await page.$$(selectorPath_title)
		let element_mails = await page.$$(selectorPath_mail)
		let array_sender = []
		let index = 0
		for (let element_sender of element_senders) {
			let sender = await page.evaluate(
				(el) => el.innerHTML,
				element_sender
			)
			if (sender == redcapSender) {
				let out = await page.evaluate(
					(el) => el.innerHTML,
					element_titles[index]
				)
				let sel =
					"table > tbody > tr:nth-child(" + String(index + 1) + ")"
				if (
					out.includes(string_redcapTitle1) &&
					out.includes(string_redcapTitle2)
				) {
					await page.waitForSelector(sel)
					await page.click(sel)
					await delay(arg_pauseBeforeAction * 5)
					let iframeElementHandle = await page.$("iframe")
					let iframe = await iframeElementHandle.contentFrame()
					let href = await iframe.$eval(
						selectorPath_formUrl,
						(el) => el.href
					)
					console.log(href)
					gotMail = 1
					// TODO: uncomment the line below to get the formUrl
					// formurl = href
				}
			}
			index++
			array_sender.push(String(sender))
		}
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
	mainWindow.webContents.on("did-finish-load", () => {
		load_args()
	})
	mainWindow.once("ready-to-show", () => {
		mainWindow.show()
	})
}

pie.initialize(app).then(() => {
	app.whenReady().then(() => {
		loadRandomComments(),
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
	console.log("s")
	main()
})

ipcMain.on("button-scrapeMail", (event, arg) => {
	console.log("clicked scrape")
	scrape()
})
