'use strict'

//? ---- Secret number definition ----
let secretNumber = Math.trunc(Math.random() * 10) + 1

//? ---- fields and body declaration ----
let lives = 3
const wonBackgroundColor = 'bg-grass-400'
const lostBackgroundColor = 'bg-cerise-700'
const resultMessage = document.querySelector('#message')
const body = document.querySelector('body')
const hiddenNumber = document.querySelector('#number')
const remainingLives = document.querySelector('#lives')
const guessInput = document.querySelector('#guess')
const checkBtn = document.querySelector('#check-btn')
const heart = document.querySelector('#heart')
const winnerMessageIcon = document.createElement('i')
const loserMessageIcon = document.createElement('i')
const tooHighMessage = document.createElement('i')
const tooLowMessage = document.createElement('i')
const invalidNumber = document.createElement('i')
const heartIcon = document.createElement('i')

//* ---- Event listeners ----

// ---- Click event (Play Again button) ----
document.querySelector('#again-btn').addEventListener('click', () => {
	resetGame()
})

// ---- Click event (check button) ----
document.querySelector('#check-btn').addEventListener('click', () => {
	checkGuessAttempt()
	clearInput('#guess')
})

// ---- Enter key down (guess input) ----
document.querySelector('#guess').addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		checkGuessAttempt()
		clearInput('#guess')
	}
})

//* ---- Functions ----

function checkGuessAttempt() {

	// get the hidden number value
	const guessNumber = Number(document.querySelector('#guess').value)

	// ---- All possible scenarios ----

	// when user doesn't set a number 
	if (!guessNumber || guessNumber < 1 || guessNumber > 10 || isNaN(guessNumber)) {
		resultMessage.textContent = 'Invalid number!'
		createResultIcon(invalidNumber, 'fas', 'fa-times-circle', 'text-red-600', 'ml-1', 'text-xl', resultMessage)

		// when user guess the correct number
	} else if (guessNumber === secretNumber) {
		displayGameResult('Correct number. You won!', wonBackgroundColor)
		createResultIcon(winnerMessageIcon, 'fas', 'fa-trophy', 'text-yellow-400', 'ml-1', 'text-xl', resultMessage)
		// when user guess is wrong
	} else if (guessNumber !== secretNumber) {
		if (guessNumber > secretNumber) {
			displayWrongGuessCase('Too high!')
			createResultIcon(tooHighMessage, 'fas', 'fa-sort-numeric-up-alt', 'text-blue-300', 'ml-1', 'text-xl', resultMessage)
		} else {
			displayWrongGuessCase('Too low!')
			createResultIcon(tooLowMessage, 'fas', 'fa-sort-numeric-down', 'text-blue-300', 'ml-1', 'text-xl', resultMessage)
		}
	}

	// Lost the game when lives is below 1
	if (lives < 1) {
		displayGameResult('Incorrect number. You lost!', lostBackgroundColor)
		createResultIcon(loserMessageIcon, 'fas', 'fa-frown', 'text-yellow-400', 'ml-1', 'text-xl', resultMessage)
		heart.classList.remove('fas')
		heart.classList.remove('fa-heart')
		createResultIcon(heartIcon, 'fas', 'fa-heart-broken', 'text-cerise-900', 'ml-2', 'text-xl', remainingLives)
	}
}

/**
 * @param {string} inputClass 
 * Clear the given class to an empty value
 */
function clearInput(inputClass) {
	document.querySelector(inputClass).value = ''
}

function clearResultColorClass() {
	if (body.classList.contains(wonBackgroundColor)) {
		body.classList.remove(wonBackgroundColor)
	} else if (body.classList.contains(lostBackgroundColor)) {
		body.classList.remove(lostBackgroundColor)
	}
}

function resetGame() {
	remainingLives.textContent = '3'
	resultMessage.textContent = 'Start guessing...'
	hiddenNumber.textContent = '?'
	guessInput.value = ''
	guessInput.removeAttribute('disabled')
	lives = 3
	secretNumber = Math.trunc(Math.random() * 10) + 1
	checkBtn.removeAttribute('disabled')
	checkBtn.classList.remove('bg-gray-400')
	clearResultColorClass()
	checkBtn.classList.remove('cursor-not-allowed')
	checkBtn.classList.add('bg-white')
	checkBtn.classList.add('hover:bg-navy-900')
	checkBtn.classList.add('hover:animate-pulse')
	checkBtn.classList.add('hover:text-white')
	heart.classList.add('fas')
	heart.classList.add('fa-heart')
}

/**
 * 
 * @param {String} message 
 * @param {String} className 
 */
function displayGameResult(message, className) {
	hiddenNumber.textContent = secretNumber
	resultMessage.textContent = message
	body.classList.add(className)
	guessInput.setAttribute('disabled', 'disabled')
	checkBtn.setAttribute('disabled', 'disabled')
	checkBtn.classList.remove('bg-white')
	checkBtn.classList.add('bg-gray-400')
	checkBtn.classList.add('cursor-not-allowed')
	checkBtn.classList.remove('hover:bg-navy-900')
	checkBtn.classList.remove('hover:animate-pulse')
	checkBtn.classList.remove('hover:text-white')
}

/**
 * 
 * @param {string} message 
 * set a message when the guess attempt is incorrect
 */
function displayWrongGuessCase(message) {
	resultMessage.textContent = message
	lives--
	remainingLives.textContent = lives
}

/**
 * 
 * @param {string} element 
 * @param {string} iconAcronym 
 * @param {string} iconName 
 * @param {string} iconColor 
 * @param {string} margin 
 * @param {string} size 
 * @param {string} parent 
 */
function createResultIcon(element, iconAcronym, iconName, iconColor, margin, size, parent) {
	element.classList.add(iconAcronym)
	element.classList.add(iconName)
	element.classList.add(iconColor)
	element.classList.add(margin)
	element.classList.add(size)
	parent.appendChild(element)
}