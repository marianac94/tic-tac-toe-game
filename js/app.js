// this click function is for clicking the box with items in each individual box
function clickButton(event) {
  $(".item").on("click", function(event) {
    let thingClicked = this.innerHTML
      console.log("works")

    let playerOne = getPlayerOne()
    if (playerOne === "O") {
      $(this).addClass("yellow")
      $(this).html("O")
    }
    if (playerOne === "O") {
    $(this).addClass("yellow")
    $(this).html("O")
  }
// call playGame after every click, to check for winner & whose turn
    playGame()
  })
}
// this function is for making all clickable events happen'
clickButton(event)


function checkWhoseTurn() { // <-- in this game, the playerOne goes first
  let currentTurn

  let blueCount = getBlueCount()
    console.log('checkWhoseTurn, blueCount: ', blueCount)

  let yellowCount = getYellowCount()
    console.log('checkWhoseTurn, yellowCount: ', yellowCount)

  let playerOneTurn = !yellowCount || blueCount > yellowCount || yellowCount && blueCount == yellowCount
  let computerTurn = blueCount < yellowCount

  if (playerOneTurn) {
    console.log("checkWhoseTurn: it is playerOne's turn")

  let notYellowOrBlue = document.querySelectorAll("div.item:not(.blue):not(.red)")
    $(notYellowOrBlue).removeClass('unclickable')
    $("#compTurn").removeClass('yellow blackText')
    $("#yourTurn").addClass('yellow blackText')
    currentTurn = "playerOneTurn"
  return currentTurn
  }
  if (computerTurn) {
    console.log("checkWhoseTurn: it is computer's turn")
    //at the start of computer's turn...
    let allItems = document.querySelectorAll("div.item")
    $(allItems).addClass('unclickable') //need to remove this on playerOne's turn
    $("#yourTurn").removeClass('yellow blackText')
    $("#compTurn").addClass('yellow blackText')
    setTimeout(computerTakeTurn, 1000) //call after 1 second...
    currentTurn = "computerTurn"
    return currentTurn
  }
}


function computerTakeTurn() {
  let computer = getComputer()
  console.log('computerTakeTurn: computer is: ', computer)
  //see what items don't have blue or red
  let notYellowOrBlue = document.querySelectorAll("div.item:not(.blue):not(.red)")
  console.log('computerTakeTurn: notBlueOrRed: ', notBlueOrRed)
  //choose one at random
  let randomItem = notYellowOrBlue[Math.floor(Math.random() * notYellowOrBlue.length)]
  console.log('computerTakeTurn: randomItem is: ', randomItem)
  //addClass red to that random item and show computer chose it
  $(randomItem).addClass("blue unclickable")
  $(randomItem).html(computer)
  console.log('computerTakeTurn: computer clicked: ', randomItem)
  //after computer takes turn, call playGame...
  playGame() //---------------this may cause infinite loop...
  //return randomItem //need to return something?
}


function setPlayerOne() {
  $("#playerForm input").on("change", function() {
    let playerOne = $("input[name='radio']:checked", "#playerForm").val()
    console.log(`player selected: ${playerOne}`)
    $("#playerForm").addClass("displayNone")
    $("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`)
    $("#gameInfo").removeClass("displayNone")
    $("#resetButton").removeClass("displayNone")
    $("#gameGrid").removeClass("displayNone")
  })
}
setPlayerOne()


function getPlayerOne() {
  if (document.getElementById("playerOneSpan") != null) {
    let playerOne = document.getElementById("playerOneSpan").innerHTML
      console.log('getPlayerOne, playerOne is: ', playerOne)
    return playerOne
  }
}


function getComputer() {
  let playerOne = getPlayerOne()
    if (playerOne === "X") {
  let computer = "O"
    } else {
  let computer = "X"
  }
  return computer
}


function hardResetOnclick(event) {
  $("#resetButton").click(function(event) {
    console.log("hardResetOnclick: resetting game...")
    $("#playerForm").removeClass("displayNone")
    //console.log("reset: removing displayNone from playerForm")
    document.getElementById("playerForm").reset()
    //console.log("reset: resetting playerForm")
    //console.log("reset: replacing playerOne,gameResult,congratsOrSorry w/ empty")
    $("#playerOne, #gameResult, #congratsOrSorry").html("")
    //console.log("reset: adding class displayNone")
    $("#gameInfo, #gameGrid, #congratsOrSorry").addClass("displayNone")
    //console.log("reset: remove classes blue red gray unclickable")
    $(".item").removeClass("blue red gray unclickable")
    $(".item").html("X/O")
  })
}
hardResetOnclick()


function reset() {
  console.log("reset: resetting game, for new game...")
  $("#gameInfo").removeClass("displayNone")
  $("#gameResult, #congratsOrSorry").addClass("displayNone")
  $(".item").removeClass("blue red gray unclickable")
  $(".item").html("X/O")
}

function getBlueCount() {
  let blueCount = $('#gameGrid .blue').length
  return blueCount
}

function getYellowCount() {
  let yellowCount = $('#gameGrid .yellow').length
  return yellowCount
}

function checkForWinner() {
  console.log("checking for winner...")
  let winner
  let playerOne = getPlayerOne() //playerOne is always blue!
  //console.log('checkForWinner, playerOne is: ', playerOne)

  let computer = (playerOne === "X") ? "O" : "X"

  //there are 8 winningCombos:
  //three rows, three columns, two diagonals
  //refactor below.... this is not DRY!
  let yellowWin1 = $("#one.yellow, #two.yellow, #three.yellow").length === 3
  let yellowWin2 = $("#four.yellow, #five.yellow, #six.yellow").length === 3
  let yellowWin3 = $("#seven.yellow, #eight.yellow, #nine.yellow").length === 3
  let yellowWin4 = $("#one.yellow, #four.yellow, #seven.yellow").length === 3
  let yellowWin5 = $("#two.yellow, #five.yellow, #eight.yellow").length === 3
  let yellowWin6 = $("#three.yellow, #six.yellow, #nine.yellow").length === 3
  let yellowWin7 = $("#one.yellow, #five.yellow, #nine.yellow").length === 3
  let yellowWin8 = $("#seven.yellow, #five.yellow, #three.yellow").length === 3

  let blueWin1 = $("#one.blue, #two.blue, #three.blue").length === 3
  let blueWin2 = $("#four.blue, #five.blue, #six.blue").length === 3
  let blueWin3 = $("#seven.blue, #eight.blue, #nine.blue").length === 3
  let blueWin4 = $("#one.blue, #four.blue, #seven.blue").length === 3
  let blueWin5 = $("#two.blue, #five.blue, #eight.blue").length === 3
  let blueWin6 = $("#three.blue, #six.blue, #nine.blue").length === 3
  let blueWin7 = $("#one.blue, #five.blue, #nine.blue").length === 3
  let blueWin8 = $("#seven.blue, #five.blue, #three.blue").length === 3

  //var winningCombos = [x]
  //refactor below too... not DRY at all!!!
  //note: playerOne is always blue
  let yellowWins = (yellowWin1 || yellowWin2 || yellowWin3 || yellowWin4 || yellowWin5 || yellowWin6 || yellowWin7 || yellowWin8)

  let blueWins = (blueWin1 || blueWin2 || blueWin3 || blueWin4 || blueWin5 || blueWin6 || blueWin7 || blueWin8)

  let blueCount = getBlueCount()
  //console.log('redCount is: ', redCount)
  let yellowCount = getYellowCount()
  //console.log('blueCount is: ', blueCount)
  let fullGrid = blueCount + yellowCount
  console.log('fullGrid is: ', fullGrid)

  let draw = (fullGrid === 9) && (!yellowWins) && (!blueWins)

  if (yellowWins) { //playerOne is always yellow
    winner = blueWins
    console.log(`${playerOne} wins!`)
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`)
    $("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  }
  if (blueWins) { //blue is computer
    winner = redWins
    console.log(`${computer} wins!`)
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`)
    $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  }
  if (draw) {
    winner = draw
    console.log('Draw game!')
    $("#gameResult, #congratsOrSorry").removeClass("displayNone")
    $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`)
    $("#congratsOrSorry").html("<span>Game ended in a draw.</span>")
    $("#gameInfo").addClass("displayNone")
    disableRemainingItems()
    return winner
  } else {
    console.log('game on...')
  }
}


function disableRemainingItems() {
  var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
  $(notBlueOrRed).addClass("gray")
  $(notBlueOrRed).html("¯\\_(ツ)_/¯")
  $(notBlueOrRed).addClass("unclickable")
  return
}


function playGame() {
  console.log('play game!')
  var winner = checkForWinner()
  if (!winner) {
    console.log('no winner yet...')
    checkWhoseTurn()
  }
  if (winner) {
    console.log('game over, resetting game')
    setTimeout(reset, 8000) //call reset after 8 seconds...
  }
}
playGame()


//
// // for this game, player one goes first and the function is to see which one's turn is in this round
// function checkWhoseTurn() {
//   let currentTurn
//   let yellowEx = getYellowEx()
//   console.log('checkTurn, yellowEx: ', yellowEx);
//   let blueCircle = getBlueCircle()
//   console.log('checkTurn, blueCircle: ', blueCircle);
//
//   let playerOneTurn = !yellowEx || blueCircle > yellowEx || yellowEx && blueCircle == yellowEx
// // not yellow || blue grater than yellow || yellow and blue are equal as yellow
//
//   let computerTurn = blueCircle < getYellowEx
//
// // player turn to add yellow X or O
//   if (playerOneTurn) {
//     console.log("checkTurn: it is playerOne's turn")
//
//     let notBlueOrYellow = document.querySelectorAll("td:not(.yellow)")
//     $(notBlueOrYellow).removeClass('unclickable')
//     $("#computerTurn").removeClass('yellow blackText')
//     $("#yourTurn").addClass('yellow blackText')
//
//     currentTurn = "playerOneTurn"
//     return currentTurn
//   }
// }
//
// function getPlayerOne(){
//   if(document.getElementById("playerOne") != null){
//     let playerOne = document.getElementById("playerOne").innerHTML
//       console.log("getPlayerOne, playerOne is: ", playerOne)
//         return playerOne
//   }
// }
// getPlayerOne()
//
//
//
// function playGame() {
//   console.log('play game!')
//   var winner = checkForWinner()
//   if (!winner) {
//     console.log('no winner yet')
//       checkWhoseTurn()
//   }
//   if (winner) {
//     console.log('game over, resetting game')
// //call reset after 3 seconds
//       setTimeout(reset, 3000)
//   }
// }
// playGame()
//
// // for this game, player one goes first and the function is to see which one's turn is in this round
// function checkWhoseTurn() {
//   let currentTurn
//   let blueCircle = getBlueCircle()
//   console.log('checkTurn, blueCircle: ', blueCircle);
//   let yellowEx = getYellowEx()
//   console.log('checkTurn, yellowEx: ', yellowEx);
//
// // variable for ????????????????????
//   let playerOneTurn = !yellowEx || blueCircle > yellowEx || yellowEx && blueCircle == yellowEx
// // not yellow || blue grater than yellow || yellow and blue are equal as yellow
//
//   let computerTurn = blueCircle < getYellowEx
//
// // player turn to add yellow X or O
//   if (playerOneTurn) {
//     console.log("checkTurn: it is playerOne's turn")
//
//     let notBlueOrYellow = document.querySelectorAll("td.item:not(.yellow)")
//     $(notBlueOrYellow).removeClass('unclickable')
//     $("#computerTurn").removeClass('yellow blackText')
//     $("#yourTurn").addClass('yellow blackText')
//
//     currentTurn = "playerOneTurn"
//     return currentTurn
// }
// // computer turn to add blue X or O
//   if (computerTurn) {
//     console.log("checkTurn: it is computer's turn")
//
//     let allItems = document.querySelectorAll("td.item")
//     $(allItems).addClass("unclickable")
//     $("#yourTurn").removeClass("yellow blackText")
//     $("#computerTurn").addClass("yellow blackText")
//
// // the time it's going to take the computer to respond to the user (1 second)
//     setTimeout(computerTakeTurn, 1000)
//
//     currentTurn = "computerTurn"
//     return currentTurn
//   }
// };
//
//
// function computerTakeTurn() {
//   let computer = getComputer()
//   console.log('computerTakeTurn: computer is: ', computer);
//
//   // see what items don't have blue or yellow
//   let notYellowOrBlue = document.querySelectorAll("div.item:not(.blue):not(.yellow)")
//   console.log('computerTakeTurn: notYellowOrBlue: ', notBlueOrYellow);
//
//   // choose one at random
//   let randomItem = notYellowOrBlue[Math.floor(Math.random() * notBlueOrYellow.length)]
//   console.log('computerTakeTurn: randomItem is: ', randomItem)
//
//   // addClass yellow to that random item and show computer choose it
//   $(randomItem).addClass("yellow unclickable")
//   $(randomItem).html(computer)
//   console.log('computerTakeTurn: computer clicked: ', randomItem)
// };
//
//
// function setPlayerOne() {
//   // on change function works to run when a change event occurs
//   $("#playerForm input").on("change", function() {
//
//     let playerOne = $("input[name='radio']:checked", "#playerForm").val() // .val() get the value from the form element such as input
//     console.log(`player selected: ${playerOne}`)
//
// // ???
//     $("#playerForm").addClass("displayNone")
//     $("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`)
//     $("#gameInfo").removeClass("displayNone")
//     $("#resetButton").removeClass("displayNone")
//     $("#gameGrid").removeClass("displayNone")
//
//   });
// };
// setPlayerOne()
//
// // ...................................................................
// // function getPlayerOne() {
// //   if (document.getElementById("playerOneSpan") != null) {
// //     let playerOne = document.getElementById("playerOneSpan").innerHTML
// //       console.log('getPlayerOne, playerOne is: ', playerOne)
//   // }
//   // return getPlayerOne()
// // };
// // ...................................................................
//
//
// function getComputer() {
//   let playerOne = getPlayerOne()
//   if (playerOne === "X") {
//     let computer = "O"
//   }
//   return getComputer()
// };
//
//
// function resetOnClick(event) {
//   $("#resetButton").click(function(event) {
//     console.log("resetOnclick: resetting game...")
//
//     $("#playerForm").removeClass("displayNone")
//
//     document.getElementById("playerForm").reset()
//
//     $("#playerOne, #gameResult, #congratsOrSorry").html("")
//     //console.log("reset: adding class displayNone")
//
//     $("#gameInfo, #gameGrid, #congratsOrSorry").addClass("displayNone")
//     //console.log("reset: remove classes blue red gray unclickable")
//
//     $(".item").removeClass("blue yellow unclickable")
//     $(".item").html("X/O")
//   });
// };
// resetOnClick()
//
//
// function reset() {
//   console.log("reset: resetting game, for new game...")
//   $("#gameInfo").removeClass("displayNone")
//   $("#gameResult, #congratsOrSorry").addClass("displayNone")
//   $(".item").removeClass("blue yellow unclickable")
//   $(".item").html("X/O")
// }
//
//
// function getYellowEx() {
//   let yellowCount = $('#gameGrid .yellow').length
//   return yellowCount
// }
//
//
// function getBlueCircle() {
//   let blueCount = $('#gameGrid .blue').length
//   return blueCount
// }
//
//
// function checkForWinner() {
//   console.log("checking for winner...")
//   let winner
// //playerOne is always yellow
//   let playerOne = getPlayerOne()
//   let computer = (playerOne === "X") ? "O" : "X"
//
//
// // there are 8 winningCombos: three rows, three columns, two diagonals
// // this is not DRY, its telling all the possible winning combos from X
//   let yellowWin1 = $("#one.yellow, #two.yellow, #three.yellow").length === 3
//   let yellowWin2 = $("#four.yellow, #five.yellow, #six.yellow").length === 3
//   let yellowWin3 = $("#seven.yellow, #eight.yellow, #nine.yellow").length === 3
//   let yellowWin4 = $("#one.yellow, #four.yellow, #seven.yellow").length === 3
//   let yellowWin5 = $("#two.yellow, #five.yellow, #eight.yellow").length === 3
//   let yellowWin6 = $("#three.yellow, #six.yellow, #nine.yellow").length === 3
//   let yellowWin7 = $("#one.yellow, #five.yellow, #nine.yellow").length === 3
//   let yellowWin8 = $("#seven.yellow, #five.yellow, #three.yellow").length === 3
//
//   // this is not DRY, its telling all the possible winning combos from O
//   let blueWin1 = $("#one.blue, #two.blue, #three.blue").length === 3
//   let blueWin2 = $("#four.blue, #five.blue, #six.blue").length === 3
//   let blueWin3 = $("#seven.blue, #eight.blue, #nine.blue").length === 3
//   let blueWin4 = $("#one.blue, #four.blue, #seven.blue").length === 3
//   let blueWin5 = $("#two.blue, #five.blue, #eight.blue").length === 3
//   let blueWin6 = $("#three.blue, #six.blue, #nine.blue").length === 3
//   let blueWin7 = $("#one.blue, #five.blue, #nine.blue").length === 3
//   let blueWin8 = $("#seven.blue, #five.blue, #three.blue").length === 3
//
// // let winningCombos = [x]
// // note: playerOne is always yellow
//   let yellowWins = (yellowWin1 || yellowWin2 || yellowWin3 || yellowWin4 || yellowWin5 || yellowWin6 || yellowWin7 || yellowWin8)
//
//   let blueWins = (blueWin1 || blueWin2 || blueWin3 || blueWin4 || blueWin5 || blueWin6 || blueWin7 || blueWin8)
//
//
// let blueCount = getBlueCircle()
// //console.log('redCount is: ', redCount)
//
// let yellowCount = getYellowEx()
// //console.log('blueCount is: ', blueCount)
//
// // this is when the computer and user have a tie in the end of the game
// let fullGrid = blueCount + yellowCount
//   console.log('fullGrid is: ', fullGrid)
//     let draw = (fullGrid === 9) && (!yellowWins) && (!blueWins)
//
//
// if (yellowWins) {
// //playerOne is always yellow
//     winner = yellowWins
//     console.log(`${playerOne} wins!`)
//     $("#gameResult, #congratsOrSorry").removeClass("displayNone")
//     $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`)
//     $("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>")
//     $("#gameInfo").addClass("displayNone")
//     disableRemainingItems()
//     return winner
//   }
//
// if (blueWins) {
// //red is computer
//     winner = blueWins
//     console.log(`${computer} wins!`)
//     $("#gameResult, #congratsOrSorry").removeClass("displayNone")
//     $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`)
//     $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>")
//     $("#gameInfo").addClass("displayNone")
//     disableRemainingItems()
//     return winner
//   }
//
// if (draw) {
// // both the computer and user have a tie
//     winner = draw
//     console.log("It's a draw! Better luck next time...")
//     $("#gameResult, #congratsOrSorry").removeClass("displayNone")
//     $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`)
//     $("#congratsOrSorry").html("<span>Game ended in a draw.</span>")
//     $("#gameInfo").addClass("displayNone")
//     disableRemainingItems()
//     return winner
//   } else {
//     console.log('game on...')
//   }
// };
//
//
// function deleteReminingItems() {
//   let notYellowOrBlue = document.querySelectorAll("div.item:not(.yellow):not(.blue)")
//   $(notYellowOrBlue).addClass("unclickable")
//   return
// }
//
//
// function playGame() {
//   console.log('play game!')
//   let winner = checkForWinner()
//   if (!winner) {
//     console.log('no winner yet!')
// return checkForWinner;
//   } if (winner) {
//     console.log('game over, resetting game.')
// // call reset after 5 seconds...
//     setTimeout(reset, 5000)
//   }
// }
// // this function call the playGame after every click
// // this is to check for the winner and turn
// playGame()
//
//
// // Resourses:
// // https://github.com/mrkaluzny/tic-tac-toe/blob/master/script.js
// // http://perfecttictactoe.herokuapp.com/
// // https://levelup.gitconnected.com/building-a-tic-tac-toe-game-app-with-javascript-5916e58071fb
// // http://www.thatsoftwaredude.com/content/6189/coding-tic-tac-toe-in-javascript
