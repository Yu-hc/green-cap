// const buttonLaunch = document.getElementById("buttonLaunch")
const buttonText = document.getElementById("button-text")
let lastLine = document.getElementById("header_")
const header = document.getElementById("header")
const header_ = document.getElementById("header_")
// const move = document.getElementById("test-progress")
// const tl = document.getElementById("test-log")
let logCache = []
let eventCounter = 0
let logAnimationDone = 0

function buttonAnimate() {
	buttonText.style.animation = "text-shrink 0.4s steps(6,end) forwards"
}
// move.addEventListener("click", buttonAnimate)
buttonText.addEventListener(
	"animationend",
	() => {
		buttonLaunch.classList.toggle("animating")
		buttonText.style.display = "none"
	},
	{ once: true }
)
buttonLaunch.addEventListener("animationend", () => {
	eventCounter++
	if (eventCounter == 2) {
		header.classList.add("show-header")
		header_.classList.add("show-header")
		header.style.animation = "header-appear 1s forwards"
	}
})
header.addEventListener("animationend", () => {
	logAnimationDone = 1
	while (logCache.length != 0) {
		add_log(logCache.shift())
	}
})
function ready_log(log) {
	logCache.push(log)
	if (logAnimationDone == 1) {
		while (logCache.length != 0) {
			add_log(logCache.shift())
		}
	}
}
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

