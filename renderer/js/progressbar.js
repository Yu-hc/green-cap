const spanLaunch = document.getElementById("spanLaunch")
const spanCardAndCheckbox = document.getElementById("card-and-checkbox")

const shipContY = document.getElementById("ship-container-y")
const shipContX = document.getElementById("ship-container-x")

const planets = document.getElementsByClassName("planet")
const bgs = document.getElementsByClassName("bg")
const fires = document.getElementsByClassName("fire")
let state = -1
let prep = 0 // prep for the ready progress
let done = 0 // done for the latest progress

let background_queue = [0, 1, 2, 3, 4, 5]
// background cycle animation
const bgAnimation = (event) => {
	background_queue.shift()
	background_queue.push(event.currentTarget.I)
	bgs[event.currentTarget.I].style.animation =
		"bg-move 6s linear infinite forwards"
}
// animation initialization and progress state
function progress() {
	// console.log('aa')
	if (state == -1) {
		shipContX.style.animation = "fly 1.5s ease-in-out forwards"
		shipContY.style.animation =
			"oscillate 1s ease-in-out 1s infinite alternate"
		planets[0].style.animation = "earth-leave 1.5s ease-in 0.8s forwards"
		spanCardAndCheckbox.style.animation =
			"card-move 1.8s ease-in 0.8s forwards"
		for (let i = 0; i < 2; i++)
			fires[i].style.animation = "fire-start 2s ease-in-out"

		for (let i = 0; i < 6; i++)
			bgs[i].style.animation = `bg-move-i${i} ${i + 1}s linear 0.8s`

		buttonAnimate()
	}
	for (let i = 1; i < 6; i++) {
		if (prep >= i && done == i - 1) {
			let top_ = Math.floor(Math.random() * 200) + 125
			planets[i].style.top = String(top_) + "px"
			planets[i].style.animation = "planet-pass 2s linear 1s forwards"
			done = i
		}
	}
	// ship leave animation
	if (prep >= 6 && done == 5) {
		shipContX.style.left = "370px"
		shipContX.style.animation = "fly2 1.5s ease-in 1s forwards"
		done = 6
		for (let i = 0; i < 6; i++) {
			let j = background_queue[i]
			bgs[j].addEventListener(
				"animationiteration",
				() => {
					bgs[j].style.animation = `bg-stop-i${i} ${
						6 - i
					}s linear forwards`
				},
				{ once: true }
			)
		}
	}
	state++
}

// ship launch animation
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
		bgs[i].addEventListener(
			"animationend",
			bgAnimation,
			{ once: true },
			true
		)
		bgs[i].I = i
		// background_queue is the background present order
		bgs[i].addEventListener(
			"animationiteration",
			(event) => {
				background_queue.shift()
				background_queue.push(event.currentTarget.I)
				console.log(background_queue)
			},
			{ once: false },
			true
		)
	}
})()

// planet move animation
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

// fire animation
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

// planets' animation, start when the previous is started
planets[5].addEventListener(
	"animationstart",
	() => {
		if (state >= 5 + 1 && done == 5) {
			shipContX.style.left = "370px"
			shipContX.style.animation = "fly2 1.5s ease-in 1s forwards"
			for (let i = 0; i < 6; i++) {
				let j = background_queue[i]
				bgs[j].addEventListener(
					"animationiteration",
					() => {
						bgs[j].style.animation = `bg-stop-i${i} ${
							6 - i
						}s linear forwards`
					},
					{ once: true }
				)
			}
		} else {
			prep = 5 + 1
		}
	},
	{ once: true }
)
