"use strict";
// ===== GAME FLOW ===== //
// 1. player 1 clicks a row and a tile appears at the bottom of the row
// 2. player 1's turn ends and player 2's turn begins
// 3. player 2 clicks a row and a tile appears at the bottom
// 4. player 2's turn ends and player 1's turn begins
// 5. this continues until player 1 or player 2 have four tiles connected
// ===== JS/TS GOALS ===== //
// player1Color = #F06292
// player2Color = #4DD0E1
// clicks = 1
// array of squares.child (circles in squares) for each column
// DONE add event listener to each column
// DONE onclick, increment clicks 
// DONE if circles[0] background = #BA68C8, change background color, else increment index and check again
// DONE if clicks%2 !== 0, style.background = player1Color
// if (win === false)
// #declare-turn.innerText = "Player 2, select a row and place your tile."
// DONE if clicks%2 === 0, style.background = player2Color
// if (win === false)
// #declare-turn.innerText = "Player 1, select a row and place your tile."
// ===== VARIABLES ===== //
const player1Color = "#F06292";
const player2Color = "#4DD0E1";
let clicks = 0;
// * column arrays * //
const columnDivs = Array.from(document.querySelectorAll(".column"));
const column1Squares = Array.from(document.getElementById("column1").childNodes);
const column2Squares = Array.from(document.getElementById("column2").childNodes);
const column3Squares = Array.from(document.getElementById("column3").childNodes);
const column4Squares = Array.from(document.getElementById("column4").childNodes);
const column5Squares = Array.from(document.getElementById("column5").childNodes);
const column6Squares = Array.from(document.getElementById("column6").childNodes);
const column7Squares = Array.from(document.getElementById("column7").childNodes);
// ===== FUNCTIONS ===== //
const increaseClicks = () => {
    clicks = clicks + 1;
};
const storeColumn = (e) => {
    const currentColumn = Array.from(document.getElementById(`${e.currentTarget.id}`).children);
    return currentColumn;
};
const checkAvailability = (square) => {
    const circleToCheck = Array.from(square.children); // this creates a singleton array of the circle
    return (window.getComputedStyle(circleToCheck[0]).backgroundColor === "rgb(186, 104, 200)");
};
const declareTurn = (nextPlayer) => {
    const declareTurnH3 = document.getElementById("declare-turn");
    declareTurnH3.innerText = `${nextPlayer}, select a row and place your tile.`;
};
// ===== EVENT LISTENERS ===== //
const columnListener = (e) => {
    increaseClicks();
    const currentColumn = storeColumn(e);
    const availableSpaces = currentColumn.filter(checkAvailability);
    const selectedCircle = availableSpaces[0].children[0];
    if (clicks % 2 !== 0) {
        selectedCircle.style.backgroundColor = player1Color;
        declareTurn("Player 2");
    }
    else {
        selectedCircle.style.backgroundColor = player2Color;
        declareTurn("Player 1");
    }
};
columnDivs.forEach(column => {
    column.addEventListener("click", columnListener);
});
