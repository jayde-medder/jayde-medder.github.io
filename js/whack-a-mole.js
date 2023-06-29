//declare cells
const cells = document.getElementsByTagName('td')
console.log(cells)

//game state
let gameIsOver = false

//add counter
let counter = 0

//timer variables
let timeLeft = 30
let timerId = null

//last cell index, to keep track of previous cell mole appeared in
let lastCellIndex = -1

//get random number
function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//function to update counter display
function updateCounterDisplay() {
  const counterElement = document.getElementById('counter')
  counterElement.textContent = 'Moles Whacked: ' + counter
}

//function to update timer display
function updateTimerDisplay() {
  const timerElement = document.getElementById('timer')
  timerElement.textContent = 'Time left: ' + timeLeft + 's'
}

//function to make mole randomly appear in a cell
function displayNewMole() {
  //does not display new mole if game is over
  if (gameIsOver) {
    return
  }

  //get a random index for mole placement that is not the same as previous
  let randomIndex
  do {
    randomIndex = getRandomNumber(0, 24)
  } while (randomIndex === lastCellIndex)
  lastCellIndex = randomIndex

  //create img element
  const moleImage = document.createElement('img')
  moleImage.src = '../images/sakura.png'
  moleImage.id = 'mole'

  //place mole
  cells[randomIndex].appendChild(moleImage)

  //timer callback function to remove mole a display new one after 2000 milliseconds
  setTimeout(() => {
    if (moleImage.parentNode) {
      moleImage.parentNode.removeChild(moleImage)
      displayNewMole()
    }
  }, 2000)
}

//mole whacked removes moles, increments count, displays new mole
function moleWhacked(event) {
  const clickedMole = event.target
  if (clickedMole.id === 'mole') {
    clickedMole.parentNode.removeChild(clickedMole)
    counter++
    updateCounterDisplay()
    displayNewMole()
  }
}

//starts game timer. counts down from initial timeLeft 30 in second increments
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--
    updateTimerDisplay()
    if (timeLeft === 0) {
      endGame()
    }
  }, 1000)
}

//end game function. no more moles can be whacked. show alert
function endGame() {
  clearInterval(timerId)
  document.removeEventListener('click', moleWhacked)
  alert('Time is up! You whacked ' + counter + ' moles.')
  gameIsOver = true
}

//function to remove mole image from all cells
function removeMoleImages() {
  const moleImages = document.querySelectorAll('#mole')
  moleImages.forEach((moleImage) => {
    if (moleImage.parentNode) {
      moleImage.parentNode.removeChild(moleImage)
    }
  })
}

//reset the game
function resetGame() {
  gameIsOver = false
  document.addEventListener('click', moleWhacked)
  counter = 0
  timeLeft = 30
  updateCounterDisplay()
  updateTimerDisplay()
  clearInterval(timerId)
  removeMoleImages()
  startTimer()
  displayNewMole()
}

// Event listener for reset button click
const resetButton = document.getElementById('startButton')
resetButton.addEventListener('click', resetGame)
