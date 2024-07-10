const inputWebmailUser = document.getElementById("inputWebmailUser")
const inputWebmailPsswd= document.getElementById("inputWebmailPsswd")
const inputFormUrl = document.getElementById("inputFormUrl")
const inputDiscussGroup = document.getElementById("inputDiscussGroup")
const inputRandomSuggestion = document.getElementById("inputRandomSuggestion")
const inputRandomCheck = document.getElementById("inputRandomCheck")
const buttonStartFilling = document.getElementById("buttonStartFilling")




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

inputRandomSuggestion.addEventListener('change', () =>{
	ipcRenderer.send("input-randomSuggestion", inputRandomSuggestion.checked)
})

inputRandomCheck.addEventListener('change', () =>{
	ipcRenderer.send("input-randomCheck", inputRandomCheck.checked)
})

buttonStartFilling.addEventListener('click', () => {
	console.log("clicked start filling")
	ipcRenderer.send("button-startFilling")
})
// ipcRenderer.on('crawler-closed', () => {
// 	console.log("crawler-closed")
// })
