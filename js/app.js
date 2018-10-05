// made object with two properties (fill method is for filling elements from the array when called)
const start = {
  playGame: true,
  board: Array(9).fill(null),
}


// var rule that makes the target event fo through all the data-index from the table in HTML
const main = (e) => {
  const rule = e.target.dataset.index
    console.log(rule);
      console.log(e.currentTarget);

  play(rule)
    playForMe(start.board)
}


const play = (rule) => {
  if (calculateWinner(start.board) || start.board[rule]) return ;

// what the user choose to play with:
  start.board[rule] = start.playGame ? '0' : 'X'
    console.log(start.board, start.playGame, calculateWinner(start.board))

  start.playGame = !start.playGame
    render(start.board)
}

// taking a random number from the array to show when user or computer clicks on the "box"
const playForMe = (boardConfig) => {
  const playAt = Math.floor(Math.random() * 9)
  if(boardConfig[playAt] === null)
    return play(playAt)
      return playForMe(boardConfig)
}


const render = (array) => {
  const $ = one => document.querySelector(one)
  const $$ = one => document.querySelectorAll(one)
  const playerName = start.playGame ? '0' : 'X';

// selecting all box elements from the table in html
$$('box').forEach((element, rule) => element.innerHTML = array[rule] || '')

// the box that is telling who is next (this is displayed on the screen)
$('#status').innerHTML = `Player ${playerName} is next`

// starting if statment on who won and when to reset the game (this is displayed on the screen)
if (calculateWinner(start.board))  {
    $('#status').innerHTML = `Player ${calculateWinner(start.board)} Won!`
    $('#reset').classList.add('primary')
  }
}


// adding the score for each game winner (X and O)
// let score = 0;
//
// function scoreIncrement(elem) {
//     if(!$(elem).data('scored')){
//        score++;
//        $("#score").html(score);
//        $("#finalScore").html(score);
//        $(elem).data('scored', true);
//     }
// }
// var score = 0;
//
// $('#finalScore').text(score);
// function foundMatchingBlocks(event, params) {
//       target.classList.remove();
//       score += 1;
//       $('#finalScore').text(score);
// }


// array with all possible answers for computer to add when user clicks
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


// depending on the if statement is the level of difficulty that is given to the user
for (let i = 0; i < possibleAnswers.length; i++) {
  const [a, b, c] = possibleAnswers[i];
  if (miniBoxes[a] && miniBoxes[a] === miniBoxes[b] && miniBoxes[b] === miniBoxes[c]) {
      return miniBoxes[a];
    }
  }
  return null;
}


// when user click each "box" to select where to add his X or O
document.querySelectorAll('.box')
.forEach(element => {
  element.addEventListener('click', main)
});


// the user click on "reset" for the game to star over again
// removing all data that was filled from the array
document.querySelector('#reset')
.addEventListener('click', (e) => {
  render(Array(9).fill(null))
  start.board.fill(null)
  e.target.classList.remove('primary') // <- primary is the ID name from the class #remove (made at the top)
});


// the question "Who starts?" and user choose X or O
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


// added some cool sounds when clicking and entering the page, feel free to help and add more cool stuff like this!

// sound when the user decides if X or O at the beginning
let beep = new Audio();
  beep.src = "sounds/singleClick.mp3";

// sound when clicking on boxes
let beep2 = new Audio();
  beep2.src = "sounds/soundBox.mp3";
