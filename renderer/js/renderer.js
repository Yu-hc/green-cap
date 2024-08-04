const inputWebmailUser = document.getElementById("inputWebmailUser")
const inputWebmailPsswd = document.getElementById("inputWebmailPsswd")
const inputFormUrl = document.getElementById("inputFormUrl")
const inputDiscussGroup = document.getElementById("inputDiscussGroup")

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

inputWebmailUser.addEventListener("change", () => {
	ipcRenderer.send("input-webmailUser", inputWebmailUser.value)
})

inputWebmailPsswd.addEventListener("change", () => {
	ipcRenderer.send("input-webmailPsswd", inputWebmailPsswd.value)
})

inputFormUrl.addEventListener("change", () => {
	ipcRenderer.send("input-formUrl", inputFormUrl.value)
})

inputDiscussGroup.addEventListener("change", () => {
	ipcRenderer.send("input-discussGroup", inputDiscussGroup.value)
})

toggleRandomSuggestion.addEventListener("change", () => {
	ipcRenderer.send("toggle-randomSuggestion", toggleRandomSuggestion.checked)
})
toggleRandomCheck.addEventListener("change", () => {
	ipcRenderer.send("toggle-randomCheck", toggleRandomCheck.checked)
})
toggleShowCrawler.addEventListener("change", () => {
	ipcRenderer.send("toggle-showCrawler", toggleShowCrawler.checked)
})
toggleUseMail.addEventListener("change", () => {
	ipcRenderer.send("toggle-useMail", !toggleUseMail.checked)
	console.log(!toggleUseMail.checked)
})

buttonLaunch.addEventListener("click", () => {
	ipcRenderer.send("button-launch")
	progress()
})

buttonReset.addEventListener("click", () => {
	ipcRenderer.send("button-reset")
})

window.data.loadDatas((datas) => {
	inputWebmailUser.value = datas.string_webmailUser
	inputWebmailPsswd.value = datas.string_webmailPsswd
	inputFormUrl.value = datas.formUrl
	inputDiscussGroup.value = datas.discussGroup
	toggleRandomSuggestion.checked = datas.randomSuggestion
	toggleRandomCheck.checked = datas.randomCheck
	toggleShowCrawler.checked = datas.showCrawler
	toggleUseMail.checked = !datas.useMail
	toggleCards()
})
ipcRenderer.on("messages", (event, messages) => {
	ready_log(messages)
})

ipcRenderer.on("progress-totalPages", (event, total_pages) => {
	totalPages = total_pages
})

ipcRenderer.on("progress-currentPage", (event, current_page) => {
	currentPage = current_page + 1
	ready_log(`filling page ${currentPage}/${totalPages}`)
	// totalPlanets +1 for the rocket leave animation
	while (currentPage / totalPages >= currentPlanet / (totalPlanets + 1)) {
		currentPlanet++
		progress()
	}
})
