const buttonText = document.getElementById("button-text")
let lastLine = document.getElementById("header_")
const header = document.getElementById("header")
const header_ = document.getElementById("header_")
let logCache = []
let eventCounter = 0
let logAnimationDone = 0

// remove the 'launch' text from button
function buttonAnimate() {
	buttonText.style.animation = "text-shrink 0.4s steps(6,end) forwards"
	
}
// reverse the log window back to button
function buttonEnd(){
	// remove all logs in log window
	let logDivs = document.getElementsByClassName('log')
	for(let i = 0 ; i < logDivs.length; i++){
		logDivs[i].style.display = 'none'
	}
	// remove header
	header.style.animation = "header-appear-rev 1s forwards"
       header.addEventListener('animationend', ()=>{
              header.classList.remove("show-header")
              header_.classList.remove("show-header")
		// shrink button
              buttonLaunch.style.animation = "button-expand-rev 1s forwards"
              buttonLaunch.classList.remove('animating')
		// show 'Close' in launch button
              buttonLaunch.addEventListener('animationend', ()=>{
			buttonText.innerText = 'Close'
                     buttonText.style.display = 'block'
                     buttonText.style.width = '0'
                     buttonText.style.animation  = 'text-shrink-rev 0.4s steps(6,end) forwards 1s'
              }, {once: true})
              buttonLaunch.addEventListener('click', ()=>{
                     closeWindow()
              }, {once: true})
       }, {once: true})
}
buttonText.addEventListener(
	"animationend",
	() => {
		buttonLaunch.classList.toggle("animating")
		buttonText.style.display = "none"
	},
	{ once: true }
)

// animate launch button to console 
buttonLaunch.addEventListener("animationend", () => {
	eventCounter++
	if (eventCounter == 2) {
		header.classList.add("show-header")
		header_.classList.add("show-header")
		header.style.animation = "header-appear 1s forwards"
	}
})

// animate all undone log animations
header.addEventListener("animationend", () => {
	logAnimationDone = 1
	while (logCache.length != 0) {
		add_log(logCache.shift())
	}
}, {once: true})

// put log into logCache, animate if header is ready
function ready_log(log) {
	logCache.push(log)
	if (logAnimationDone == 1) {
		while (logCache.length != 0) {
			add_log(logCache.shift())
		}
	}
}

// animate log
function add_log(log) {
	const newDiv = document.createElement("div")
	newDiv.classList.add("edge")
	const newContent = document.createElement("span")
	newContent.classList.add("nobr")
	newContent.classList.add("log")
	newContent.innerHTML = String(log)
	newDiv.appendChild(newContent)

	lastLine.after(newDiv)
	let steps = log.length
	let time = steps / 16

	newContent.style.animation = `typing ${time}s steps(${steps}, end)`
	// scroll to the bottom
	buttonLaunch.scrollTop = buttonLaunch.scrollHeight

	lastLine = newDiv
}

