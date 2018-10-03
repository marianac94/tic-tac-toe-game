// 1 step = start the game with an object called start with two properties: playGame & board. Their two values: true and Array which has a fill(null) method that fills all the elements of an array from a start index to an end
const start = {
  playGame: true,
  board: Array(9).fill(null),
}


// 2 step = start variable called rule that calls the event target and starts accesing the dataset of rule (in this case, the Array with the 9 elements in it, call the function to start the game between user and computer, call the function to start picking random numbers from the Array(the board)
const rule = (e) => {
  const rule = e.target.dataset.rule

  play(rule)
    playForMe(start.board)
}


// Making the variable play with the function rule work, the if statement step should be skiped is box is already filled or someone have won
const play = (rule) => {
  if (calculateWinner(start.board) || start.board[rule]) return ;

// what the user choose to play with:
  start.board[rule] = start.playGame ? '0' : 'X'

  console.log(start.board, start.playGame, calculateWinner(start.board))

  start.playGame = !start.playGame
    render(start.board)
}

// 4 step = taking a random number from the array to show when user or computer clicks on the "box" in
const playForMe = (boardConfig) => {
  const playAt = Math.floor(Math.random() * 9)
  if(boardConfig[playAt] === null)
    return play(playAt)
      return playForMe(boardConfig)
}

const render = (array) => {
  const $ = one => document.querySelector(one)
  const $$ = all => document.querySelectorAll(all)
  const playerName = start.playGame ? '0' : 'X';

$$('#hole').forEach((element, rule) => element.innerHTML = array[rule] || '')
  $('#status').innerHTML = `Player ${playerName} should play!`

if (calculateWinner(start.board))  {
    $('#status').innerHTML = `player ${calculateWinner(start.board)} Won!`
    $('#reset').classList.add('primary')
  }
}

const calculateWinner = (miniBoxes) => {
  const possibleAnswers = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


// 5 step = stating a for loop that goes through each of the lines (inside the array) and returns one element from each at each click in the box
for (let i = 0; i < possibleAnswers.length; i++) {
  const [a, b, c] = possibleAnswers[i];
  if (miniBoxes[a] && miniBoxes[a] === miniBoxes[b] && miniBoxes[a] === miniBoxes[c]) {
      return miniBoxes[a];
    }
  }
  return null;
}


// 6 step = this is the main function when user click "box" the selected element appears at the right place
document.querySelectorAll('#hole')
.forEach(element => {
  element.addEventListener('click', rule)
});


// 7 step = the user click on "reset" for the game to star over again
document.querySelector('#reset')
.addEventListener('click', (e) => {
  render(Array(9).fill(null))
  start.board.fill(null)
  e.target.classList.remove('primary')
});


// 3 step = the question "Who starts?" and user choose X or O
const modal = document.querySelector('.modal-wrapper')


document.querySelector('#playAs0')
  .addEventListener('click', (e) => {
    modal.classList.add("none")
})

document.querySelector('#playAsX')
  .addEventListener('click', (e) => {
    modal.classList.add("none")
start.playGame = !start.playGame
})
