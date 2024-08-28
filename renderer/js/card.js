const cardSwitcher = document.getElementById("toggleUseMail")
const cardWrapper = document.querySelector(".card-wrapper")

// change cards to match the toggle
function toggleCards() {
	if (cardSwitcher.checked) {
		cardWrapper.style.transform = "translateX(-320px)"
	} else {
		cardWrapper.style.transform = "translateX(0)"
	}
}

cardSwitcher.addEventListener("change", toggleCards)
