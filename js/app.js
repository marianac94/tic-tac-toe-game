function clickButton(e){
  $(".item").click(function(e) {
    let thingClicked = this.innerHTML
    console.log("0. this is: ", this)
    console.log("0. you clicked: " thingClicked)

// creating the player
    let playerOne = getPlayerOne()
        if (playerOne === "X") {
          //playerOne (X) is always yellow
          $(this).addClass("yellow")
          $(this).html("X")
        } if (playerOne === "X") {
            //playerOne (X) is always yellow
            $(this).addClass("yellow")
            $(this).html("X")
        }
// this function call playGame after every click, to check for the winner and turn
    playGame()
  });
};
clickButton(e);

// for this game, player one goes first
function checkTurn(){
  let currentTurn
  let blueCircle = getBlueCircle()
  console.log('checkTurn, blueCircle: ', blueCircle);
  let yellowEx = getYellowEx()
  console.log('checkTurn, yellowEx: ', yellowEx);
  let playerOneTurn = !yellowEx || blueCircle > yellowEx || yellowEx && blueCircle == yellowEx

  let computerTurn = blueCircle < getYellowEx
    if(playerOneTurn) {
      console.log("checkTurn: it is playerOne's turn")

    let notBlueOrYellow = document.querySelectorAll("td.item:not(.yellow)")
    $(notBlueOrYellow).removeClass('unclickable')
    $("#computerTurn").removeClass('yellow blackText')
    $("#yourTurn").addClass('yellow blackText')
    currentTurn = "playerOneTurn"
    return currentTurn
  } if(computerTurn) {
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
  }
}
