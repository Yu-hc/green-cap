const settingsButton = document.getElementById("settings-button")
const settingsIcon = document.getElementById("settings-icon")
const settingsPage = document.getElementById("settings-page")
const settingsConfigs = document.getElementsByClassName("settings-config")

settingsButton.addEventListener("click", () => {
	settingsIcon.style.animation = "rotate-settings 1s ease-in-out"
	settingsButton.addEventListener("animationend", () => {
		settingsIcon.style.animation = ""
	})
	settingsPage.toggleAttribute("open")

	let arraySettingsConfigs = Array.prototype.slice.call(settingsConfigs)

	for (let i = 0; i < settingsConfigs.length; i++) {
		settingsConfigs[i].toggleAttribute("open")
	}
})
