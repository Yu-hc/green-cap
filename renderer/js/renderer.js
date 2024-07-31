const inputWebmailUser = document.getElementById("inputWebmailUser")
const inputWebmailPsswd= document.getElementById("inputWebmailPsswd")
const inputFormUrl = document.getElementById("inputFormUrl")
const inputDiscussGroup = document.getElementById("inputDiscussGroup")

const toggleRandomSuggestion = document.getElementById("toggleRandomSuggestion")
const toggleRandomCheck = document.getElementById("toggleRandomCheck")
const toggleShowCrawler = document.getElementById("toggleShowCrawler")
const toggleUseMail = document.getElementById("toggleUseMail")

const buttonLaunch = document.getElementById("buttonLaunch")
const buttonReset = document.getElementById('reset-btn')



const cardSwitcher = document.getElementById('toggleUseMail');
const cardWrapper = document.querySelector('.card-wrapper');

function toggleCards() {
	if (cardSwitcher.checked) {
		cardWrapper.style.transform = 'translateX(-320px)';
	} else {
		cardWrapper.style.transform = 'translateX(0)';
	}
}

cardSwitcher.addEventListener('change', toggleCards);
   
   

inputWebmailUser.addEventListener('change', () =>{
	ipcRenderer.send("input-webmailUser", inputWebmailUser.value)
})

inputWebmailPsswd.addEventListener('change', () =>{
	ipcRenderer.send("input-webmailPsswd", inputWebmailPsswd.value)
})

inputFormUrl.addEventListener('change', () =>{
	ipcRenderer.send("input-formUrl", inputFormUrl.value)
})

inputDiscussGroup.addEventListener('change', () =>{
	ipcRenderer.send("input-discussGroup", inputDiscussGroup.value)
})


toggleRandomSuggestion.addEventListener('change', () =>{
	ipcRenderer.send("toggle-randomSuggestion", toggleRandomSuggestion.checked)
})
toggleRandomCheck.addEventListener('change', () =>{
	ipcRenderer.send("toggle-randomCheck", toggleRandomCheck.checked)
})
toggleShowCrawler.addEventListener('change', () =>{
	ipcRenderer.send("toggle-showCrawler", toggleShowCrawler.checked)
})
toggleUseMail.addEventListener('change', () =>{
	ipcRenderer.send("toggle-useMail", !toggleUseMail.checked)
	console.log(!toggleUseMail.checked)
})


buttonLaunch.addEventListener('click', () => {
	ipcRenderer.send("button-launch")
})

buttonReset.addEventListener('click', ()=>{
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
