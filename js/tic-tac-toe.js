console.log('Welcome to Tic-Tac-Toe! Enjoy!')

//declare array of squares on board
//cells type is actually a "NodeList" and cannot use built in array methods
//to use array methods use Array.from(cells)
let cells = document.getElementsByTagName('TD')

//reset button
const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', resetGame)

//Tally text elements
const xWinsElement = document.getElementById('xWins')
const oWinsElement = document.getElementById('oWins')

//tallies
let xWins = 0
let oWins = 0

//declare game is over boolean
let gameIsOver

//declare noughts turn boolean, this randomises which player starts
let noughtsTurn = Math.random() < 0.5

//function that puts markers on board. x or o
function cellClicked(e) {
  if (gameIsOver) {
    return
  }
  let myCell = e.target
  if (myCell.innerHTML == '') {
    myCell.innerHTML = noughtsTurn ? 'O' : 'X'
    checkForWin(noughtsTurn ? 'O' : 'X')
    checkForStalemate()
  }
}

//function to switch turns
function switchTurn() {
  noughtsTurn = !noughtsTurn
  updateSubtitle(noughtsTurn ? "O's Turn!" : "X's Turn!")
}

//function to update subtitle
function updateSubtitle(text) {
  document.getElementById('subtitle').textContent = text
}

//function to update win tally
function updateWinTally(symbol) {
  if (symbol === 'X') {
    xWins++
    xWinsElement.textContent = 'X Wins: ' + xWins
  } else {
    oWins++
    oWinsElement.textContent = 'O Wins: ' + oWins
  }
}

//function to check if game is won
function checkForWin(symbol) {
  //declare winning lines
  const winningLines = [
    [0, 1, 2], //top row
    [3, 4, 5], //second row
    [6, 7, 8], //bottom row
    [0, 3, 6], //first column
    [1, 4, 7], //second column
    [2, 5, 8], //third column
    [0, 4, 8], //diagonal 1
    [2, 4, 6], //diagonal 2
  ]

  //for each line of winningLines
  for (const line of winningLines) {
    const [a, b, c] = line
    if (
      cells[a].innerHTML === symbol &&
      cells[b].innerHTML === symbol &&
      cells[c].innerHTML === symbol
    ) {
      gameIsOver = true
      updateSubtitle('Player ' + symbol + ' wins')
      updateWinTally(symbol)
      return
    }
  }
  switchTurn()
}

function checkForStalemate() {
  //if all squares are full and nobody won, make subtitle "Stalemate!"
  let isStalemate = true
  //check if any empty cells. stalemate is false if there are
  for (const cell of cells) {
    if (cell.innerHTML === '') {
      isStalemate = false
      break
    }
  }
  if (isStalemate && !gameIsOver) {
    updateSubtitle('Stalemate!')
    gameIsOver = true
  }
}

function resetGame() {
  //clear the board
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ''
  }
  //reset game state
  gameIsOver = false
  noughtsTurn = Math.random() < 0.5
  updateSubtitle(noughtsTurn ? "O's Turn to start!" : "X's Turn to start!")
}

updateSubtitle(noughtsTurn ? "O's Turn to start!" : "X's Turn to start!")

//for each cell the event handler cellClicked is called
//cellClicked doesn't require a parameter because the browser automatically
//provides the event object an argument
for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
}
