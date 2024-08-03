const move = document.getElementById("test-progress")
const spanLaunch = document.getElementById("spanLaunch")
const spanCardAndCheckbox = document.getElementById("card-and-checkbox")

const shipContY = document.getElementById("ship-container-y")
const shipContX = document.getElementById("ship-container-x")

const planets = document.getElementsByClassName("planet")
const bgs = document.getElementsByClassName("bg")
const fires = document.getElementsByClassName("fire")
let state = -1
let prep = 0
let done = 0

// TODO change move to scrape mail and ipc.on
function progress() {
	if (state == -1) {
		shipContX.style.animation = "fly 1.5s ease-in-out forwards"
		shipContY.style.animation =
			"oscillate 1s ease-in-out 1s infinite alternate"
		fires[0].style.animation = "fire-start 2s ease-in-out"
		fires[1].style.animation = "fire-start 2s ease-in-out"
		fires[2].style.animation = "fire-start 2s ease-in-out"
		planets[0].style.animation = "earth-leave 1.5s ease-in 0.8s forwards"
		spanCardAndCheckbox.style.animation =
			"card-move 1.8s ease-in 0.8s forwards"
		bgs[0].style.animation = "bg-move-i0 1s linear 0.8s"
		bgs[1].style.animation = "bg-move-i1 2s linear 0.8s"
		bgs[2].style.animation = "bg-move-i2 3s linear 0.8s"
		bgs[3].style.animation = "bg-move-i3 4s linear 0.8s"
		bgs[4].style.animation = "bg-move-i4 5s linear 0.8s"
		bgs[5].style.animation = "bg-move-i5 6s linear 0.8s"
	}
	for (let i = 1; i < 6; i++) {
		if (prep >= i && done == i - 1) {
			let top_ = Math.floor(Math.random() * 200) + 125
			planets[i].style.top = String(top_) + "px"
			planets[i].style.animation = "planet-pass 2s linear 1s forwards"
			done = i
		}
	}
	if (prep >= 6 && done == 5) {
		shipContX.style.left = "370px"
		shipContX.style.animation = "fly2 1.5s ease-in 1s forwards"
		done = 6
	}
	state++
}

move.addEventListener("click", progress)

shipContX.addEventListener("animationend", () => {
	if (state >= 1 && done < 1) {
		let top_ = Math.floor(Math.random() * 200) + 125
		planets[1].style.top = String(top_) + "px"
		planets[1].style.animation = "planet-pass 2s linear 1s forwards"
		done = 1
	} else {
		prep = 1
	}
})

let bgEventListener = (function () {
	for (let i = 0; i < 6; i++) {
		bgs[i].addEventListener("animationend", () => {
			bgs[i].style.animation = "bg-move 6s linear infinite"
		})
	}
})()
// bgEventListener();

let planetEventListener = (function () {
	for (let i = 1; i < 5; i++) {
		planets[i].addEventListener("animationstart", () => {
			if (state >= i + 1 && done == i) {
				let top_ = Math.floor(Math.random() * 200) + 125
				planets[i + 1].style.top = String(top_) + "px"
				planets[i + 1].style.animation =
					"planet-pass 2s linear 1s forwards"
				done = i + 1
			} else {
				prep = i + 1
			}
		})
	}
})()

let fireOscillateEventListener = (function () {
	for (let i = 0; i < 3; i++) {
		fires[i].addEventListener(
			"animationend",
			() => {
				fires[i].style.animation =
					"fire-f1 0.3s ease-in-out infinite alternate"
			},
			{ once: true }
		)
	}
})()

planets[5].addEventListener(
	"animationstart",
	() => {
		if (state >= 5 + 1 && done == 5) {
			shipContX.style.left = "370px"
			shipContX.style.animation = "fly2 1.5s ease-in 1s forwards"
		} else {
			prep = 5 + 1
		}
	},
	{ once: true }
)
