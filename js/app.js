// 1 step = start the game with an object called start with two properties: playGame & board. Their two values: true and Array which has a fill(null) method that fills all the elements of an array from a start index to an end
let start = {
  playGame: true,
  board: Array(9).fill(null)
}


// 2 step = start variable called rule that calls the event target and starts accesing the dataset of rule (in this case, the Array with the 9 elements in it, call the function to start the game between user and computer, call the function to start picking random numbers from the Array(the board)
let main = (e) => {
  let rule = e.target.dataset.rule
userPlay(rule)
computerPlay(start.board)
}


// 3 step = the question "Who starts?" and user choose X or O
let modal = document.querySelector('.modal-wrapper')
document.querySelector('#playAs0')
.addEventListener('click', (e) => {
  modal.classList.add('none') //?
});

document.querySelector('#playAsX')
  .addEventListener('click', (e) => {
    modal.classList.add('none') //?
    start.playGame = !start.playGame
});


// 4 step = taking a random number from the array to show when user or computer clicks on the "box" in
let computerPlay = (boardConfig) => {
  let playAt = Math.floor(Math.random() * 9)
  if(boardConfig[playAt] === null)
    return userPlay(playAt)
      return computerPlay(boardConfig)
}
let render = (arr) => {
  let $ = one => document.querySelector(one)
  let $$ = all => document.querySelectorAll(all)
  let playerName = start.playGame ? '0' : 'X';

$$('#box').forEach((element, rule) => element.innerHTML = arr[rule] || '')
  $('#status').innerHTML = `Player ${playerName} should play!`

if (calculateWinner(start.board))  {
    $('#status').innerHTML = `player ${calculateWinner(start.board)} Won!`
    $('#reset').classList.add('primary')
  }
}

let userPlay = (rule) => {
  if (calculateWinner(start.board) || start.board[rule]) return;
  start.board[rule] = start.playGame ? '0' : 'X'

  start.playGame = !start.playGame
    render(start.board)
}

let calculateWinner = (squares) => {
  let lines = [
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
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// 6 step = this is the main function when user click "box" the selected element appears at the right place
document.querySelectorAll('.box')
.forEach(element => { element.addEventListener('click', main) })


// 7 step = the user click on "reset" for the game to star over again
document.querySelector('#reset')
.addEventListener('click', (e) => {
  render(Array(9).fill(null))
  start.board.fill(null)
  event.target.classList.remove('primary')
});
