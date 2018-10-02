function clickButton(event) {
  $(".item").click(function(event) {
    let thingClicked = this.innerHTML
    console.log("0. this is: ", this)
    console.log("0. you clicked: ", thingClicked)

// creating the player
    let playerOne = getPlayerOne()
    if (playerOne === "X") {
// playerOne (X) is always yellow
      $(this).addClass("yellow")
      $(this).html("X")
    }
    let computer = getComputer()
    if (getComputer === "O") {
// playerOne (X) is always yellow
      $(this).addClass("blue")
      $(this).html("O")
    }

// this function call playGame after every click, to check for the winner and turn
    playGame()
  });
};
clickButton(event);


// for this game, player one goes first
function checkTurn() {
  let currentTurn
  let blueCircle = getBlueCircle()
  console.log('checkTurn, blueCircle: ', blueCircle);
  let yellowEx = getYellowEx()
  console.log('checkTurn, yellowEx: ', yellowEx);
  let playerOneTurn = !yellowEx || blueCircle > yellowEx || yellowEx && blueCircle == yellowEx

  let computerTurn = blueCircle < getYellowEx
  if (playerOneTurn) {
    console.log("checkTurn: it is playerOne's turn")

    let notBlueOrYellow = document.querySelectorAll("td.item:not(.yellow)")
    $(notBlueOrYellow).removeClass('unclickable')
    $("#computerTurn").removeClass('yellow blackText')
    $("#yourTurn").addClass('yellow blackText')
    currentTurn = "playerOneTurn"
    return currentTurn
  }
  if (computerTurn) {
    console.log("checkTurn: it is computer's turn")

// this is the start of computer's turn
  let allItems = document.querySelectorAll("td.item")
// this needs to be removed on playersOne's turn
  $(allItems).addClass("unclickable")
  $("#yourTurn").removeClass("yellow blackText")
  $("#computerTurn").addClass("yellow blackText")

// the time it's going to take the computer to respond to the user (1 second)
  setTimeout(computerTakeTurn, 1000)
  currentTurn = "computerTurn"
  return currentTurn
  };
};


function computerTakeTurn() {
  let computer = getComputer()
  console.log('computerTakeTurn: computer is: ', computer);

  // see what items don't have blue or red
  let notYellowOrBlue = document.querySelectorAll("div.item:not(.blue):not(.red)")
  console.log('computerTakeTurn: notYellowOrBlue: ', notBlueOrYellow);

  // choose one at random
  let randomItem = notYellowOrBlue[Math.floor(Math.random() * notBlueOrYellow.length)]
  console.log('computerTakeTurn: randomItem is: ', randomItem)

  // addClass yellow to that random item and show computer choose it
  $(randomItem).addClass("yellow unclickable")
  $(randomItem).html(computer)
  console.log('computerTakeTurn: computer clicked: ', randomItem)

  //after computer takes turn, call playGame...
  playGame() // this causes an infinite loop...
};


function setPlayerOne() {
  // on change function works to run when a change event occurs
  $("#playerForm input").on("change", function() {

    let playerOne = $("input[name='radio']:checked", "#playerForm").val() // .val() get the value from the form element such as input
    console.log(`player selected: ${playerOne}`)

    // ???
    $("#playerForm").addClass("displayNone")
    $("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`)
    $("#gameInfo").removeClass("displayNone")
    $("#resetButton").removeClass("displayNone")
    $("#gameGrid").removeClass("displayNone")

  });
};
setPlayerOne()


function getPlayerOne() {
  if (document.getElementById("playerOneSpan") != null) {
    let playerOne = document.getElementById("playerOneSpan").innerHTML
      console.log('getPlayerOne, playerOne is: ', playerOne)
  }
  return getPlayerOne()
};


function getComputer() {
  let playerOne = getPlayerOne()
  if (playerOne === "X") {
    let computer = "O"
  }
  return getComputer()
};


function resetOnClick(event) {
  $("#resetButton").click(function(event) {
    console.log("resetOnclick: resetting game...")

    $("#playerForm").removeClass("displayNone")
    //console.log("reset: removing displayNone from playerForm")

    document.getElementById("playerForm").reset()
    //console.log("reset: resetting playerForm")
    //console.log("reset: replacing playerOne,gameResult,congratsOrSorry w/ empty")

    $("#playerOne, #gameResult, #congratsOrSorry").html("")
    //console.log("reset: adding class displayNone")

    $("#gameInfo, #gameGrid, #congratsOrSorry").addClass("displayNone")
    //console.log("reset: remove classes blue red gray unclickable")

    $(".item").removeClass("blue yellow unclickable")
    $(".item").html("X/O")
  });
};
resetOnClick()


function reset() {
  console.log("reset: resetting game, for new game...")
  $("#gameInfo").removeClass("displayNone")
  $("#gameResult, #congratsOrSorry").addClass("displayNone")
  $(".item").removeClass("blue yellow unclickable")
  $(".item").html("X/O")
}


function getYellow() {
  let yellowCount = $('#gameGrid .yellow').length
  return yellowCount
}


function getBlue() {
  let blueCount = $('#gameGrid .blue').length
  return blueCount
}


function checkForWinner() {
  console.log("checking for winner...")
  let winner
//playerOne is always yellow
  let playerOne = getPlayerOne()
  let computer = (playerOne === "X") ? "O" : "X"


// there are 8 winningCombos: three rows, three columns, two diagonals
// this is not DRY, its telling all the possible winning combos from X
  let yellowWin1 = $("#one.yellow, #two.yellow, #three.yellow").length === 3
  let yellowWin2 = $("#four.yellow, #five.yellow, #six.yellow").length === 3
  let yellowWin3 = $("#seven.yellow, #eight.yellow, #nine.yellow").length === 3
  let yellowWin4 = $("#one.yellow, #four.yellow, #seven.yellow").length === 3
  let yellowWin5 = $("#two.yellow, #five.yellow, #eight.yellow").length === 3
  let yellowWin6 = $("#three.yellow, #six.yellow, #nine.yellow").length === 3
  let yellowWin7 = $("#one.yellow, #five.yellow, #nine.yellow").length === 3
  let yellowWin8 = $("#seven.yellow, #five.yellow, #three.yellow").length === 3

  // this is not DRY, its telling all the possible winning combos from O
  let blueWin1 = $("#one.blue, #two.blue, #three.blue").length === 3
  let blueWin2 = $("#four.blue, #five.blue, #six.blue").length === 3
  let blueWin3 = $("#seven.blue, #eight.blue, #nine.blue").length === 3
  let blueWin4 = $("#one.blue, #four.blue, #seven.blue").length === 3
  let blueWin5 = $("#two.blue, #five.blue, #eight.blue").length === 3
  let blueWin6 = $("#three.blue, #six.blue, #nine.blue").length === 3
  let blueWin7 = $("#one.blue, #five.blue, #nine.blue").length === 3
  let blueWin8 = $("#seven.blue, #five.blue, #three.blue").length === 3


// let winningCombos = [x]
// note: playerOne is always yellow
  let yellowWins = (yellowWin1 || yellowWin2 || yellowWin3 || yellowWin4 || yellowWin5 || yellowWin6 || yellowWin7 || yellowWin8)

  let blueWins = (blueWin1 || blueWin2 || blueWin3 || blueWin4 || blueWin5 || blueWin6 || blueWin7 || blueWin8)


let blueCount = getBlue()
//console.log('redCount is: ', redCount)

let yellowCount = getYellow()
//console.log('blueCount is: ', blueCount)

// this is when the computer and user have a tie in the end of the game
let fullGrid = blueCount + yellowCount
  console.log('fullGrid is: ', fullGrid)
    let draw = (fullGrid === 9) && (!yellowWins) && (!blueWins)


if (yellowWins) {
//playerOne is always yellow
    winner = yellowWins
    console.log(`${playerOne} wins!`)
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`)
    $("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  }

if (blueWins) {
//red is computer
    winner = blueWins
    console.log(`${computer} wins!`)
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`)
    $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  }

if (draw) {
// both the computer and user have a tie
    winner = draw
    console.log("It's a draw! Better luck next time...")
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`)
    $("#congratsOrSorry").html("<span>Game ended in a draw.</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  } else {
    console.log('game on...')
  }
};


function deleteReminingItems() {
  let notYellowOrBlue = document.querySelectorAll("div.item:not(.yellow):not(.blue)")
  $(notYellowOrBlue).addClass("unclickable")
  return
}


function playGame() {
  console.log('play game!')
  let winner = checkForWinner()
  if (!winner) {
    console.log('no winner yet!')

  } if (winner) {
    console.log('game over, resetting game.')
// call reset after 5 seconds...
    setTimeout(reset, 5000)
  }
}
playGame()


// Resourses:
// https://github.com/mrkaluzny/tic-tac-toe/blob/master/script.js
// http://perfecttictactoe.herokuapp.com/
// https://levelup.gitconnected.com/building-a-tic-tac-toe-game-app-with-javascript-5916e58071fb
// http://www.thatsoftwaredude.com/content/6189/coding-tic-tac-toe-in-javascript
