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
})

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

