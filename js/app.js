// start the game with an object called start
// two properties: playGame & board
// their two values: true and Array which has a null value that represents the absence of the 9 numbers
let start = {
  playGame: true,
  board: Array(9).fill(null)
}


// start the function of
let main = (event) => {
// start variable called newIndex that calls the event target and starts accesing the dataset of newIndex (in this case, the Array with the 9 elements in it)
  let rule = event.target.dataset.newIndex
// call the function to start the game between user and computer
    userPlay(rule)
// call the function to start picking random numbers from the Array(the board)
      computerPlay(start.board)
}

// defining play as a function
let userPlay = (rule) => {
  if (calculateWinner(start.board) || start.board[rule]) return;
  start.board[rule] = start.playGame ? '0' : 'X' //choice of the user if X or O

// change the player
  start.playGame = !start.playGame
    render(start.board)
}

// function for the computer to add random X or O from the Array
let computerPlay = (boardConfig) => {
  let playAt = Math.floor(Math.random() * 9)
  if ( boardConfig[playAt] === null )
    return userPlay(playAt)
  return computerPlay(boardConfig)
}


let render = (arr) => {
  let $ = s => document.querySelector(s)
  let $$ = s => document.querySelectorAll(s)
  let playerName = start.playGame ? '0' : 'X'; //choice of the user if X or O


  $$('#box').forEach( (element, rule) => element.innerHTML = arr[rule] || '' )
  $('#status').innerHTML = `Player ${playerName} should play!`

  // finally give up if someone won
  if (calculateWinner(start.board))  {
    $('#status').innerHTML = `player ${calculateWinner(start.board)} Won!`
    $('#reset').classList.add('primary')
  }
}

// the variable lines hold the different convinations of arrays that the Math.random
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

// stating a for loop that goes through each of the lines (inside the array) and returns one element from each at each click in the box
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// heck event listners
document.querySelectorAll('#box')
.forEach(element => { element.addEventListener('click', main) })



// selecting the new class made by jQuery
document.querySelector('#reset')
// add a click function to remove everything from the board when the reset button is clicked by the user on the game
.addEventListener('click', (event) => {
  render(Array(9).fill(null))
  start.board.fill(null)
  event.target.classList.remove('primary')
});

// used querySelector for selected class in HTML
let modal = document.querySelector('.choice')
// click function for the user when clicking O
document.querySelector('#playAs0')
.addEventListener('click',(e) => {
  modal.classList.add('none')
});

// click function for the user when clicking X
document.querySelector('#playAsX')
  .addEventListener('click',(e) => {
    modal.classList.add('none')
    start.playGame = !start.playGame
});
