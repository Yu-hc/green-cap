const inputWebmailUser = document.getElementById("inputWebmailUser")
const inputWebmailPsswd = document.getElementById("inputWebmailPsswd")
const inputFormUrl = document.getElementById("inputFormUrl")
const inputDiscussGroup1 = document.getElementById("inputDiscussGroup1")
const inputDiscussGroup2 = document.getElementById("inputDiscussGroup2")


const toggleRandomSuggestion = document.getElementById("toggleRandomSuggestion")
const toggleRandomCheck = document.getElementById("toggleRandomCheck")
const toggleShowCrawler = document.getElementById("toggleShowCrawler")
const toggleUseMail = document.getElementById("toggleUseMail")

const buttonLaunch = document.getElementById("buttonLaunch")
const buttonReset = document.getElementById("reset-btn")

const totalPlanets = 5
let currentPlanet = 0
let totalPages = 0
let currentPage = 0

// send webmail user to index
inputWebmailUser.addEventListener("change", () => {
	ipcRenderer.send("input-webmailUser", inputWebmailUser.value)
})

// send webmail password to index
inputWebmailPsswd.addEventListener("change", () => {
	ipcRenderer.send("input-webmailPsswd", inputWebmailPsswd.value)
})

// send form url to index
inputFormUrl.addEventListener("change", () => {
	ipcRenderer.send("input-formUrl", inputFormUrl.value)
})

// send discuss group to index
inputDiscussGroup1.addEventListener("change", () => {
	ipcRenderer.send("input-discussGroup", inputDiscussGroup1.value)
	inputDiscussGroup2.value = inputDiscussGroup1.value
})
inputDiscussGroup2.addEventListener("change", () => {
	ipcRenderer.send("input-discussGroup", inputDiscussGroup2.value)
	inputDiscussGroup1.value = inputDiscussGroup2.value
})

// send settings: random suggestion to index
toggleRandomSuggestion.addEventListener("change", () => {
	ipcRenderer.send("toggle-randomSuggestion", toggleRandomSuggestion.checked)
})

// send settings: random check to index
toggleRandomCheck.addEventListener("change", () => {
	ipcRenderer.send("toggle-randomCheck", toggleRandomCheck.checked)
})

// send settings: show crawler to index
toggleShowCrawler.addEventListener("change", () => {
	ipcRenderer.send("toggle-showCrawler", toggleShowCrawler.checked)
})

// send toggle: use mail to index
toggleUseMail.addEventListener("change", () => {
	ipcRenderer.send("toggle-useMail", !toggleUseMail.checked)
	console.log(!toggleUseMail.checked)
})

// send launch signal to index
buttonLaunch.addEventListener("click", () => {
	ipcRenderer.send("button-launch")
	progress()
})

// send reset settings signal to index
buttonReset.addEventListener("click", () => {
	ipcRenderer.send("button-reset")
})

// receive and set configs to frontend
window.data.loadDatas((datas) => {
	inputWebmailUser.value = datas.string_webmailUser
	inputWebmailPsswd.value = datas.string_webmailPsswd
	inputFormUrl.value = datas.formUrl
	inputDiscussGroup1.value = datas.discussGroup
	inputDiscussGroup2.value = datas.discussGroup
	toggleRandomSuggestion.checked = datas.randomSuggestion
	toggleRandomCheck.checked = datas.randomCheck
	toggleShowCrawler.checked = datas.showCrawler
	toggleUseMail.checked = !datas.useMail
	toggleCards()
})

// receive and load log messages to launch button console
ipcRenderer.on("messages", (event, messages) => {
	ready_log(messages)
	if(messages == 'done :)')
		progress()
})

// receive total pages from backend
ipcRenderer.on("progress-totalPages", (event, total_pages) => {
	totalPages = total_pages
})


ipcRenderer.on("progress-currentPage", (event, current_page) => {
	currentPage = current_page + 1
	ready_log(`filling page ${currentPage}/${totalPages}`)
	
	while (currentPage / totalPages >= currentPlanet / (totalPlanets)) {
		currentPlanet++
		progress()
		if(currentPlanet == totalPlanets)
			break;
	}
})
