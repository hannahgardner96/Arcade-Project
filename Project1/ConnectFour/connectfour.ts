// ===== GAME FLOW ===== //
// 1. player 1 clicks a row and a tile appears at the bottom of the row
// 2. player 1's turn ends and player 2's turn begins
// 3. player 2 clicks a row and a tile appears at the bottom
// 4. player 2's turn ends and player 1's turn begins
// 5. this continues until player 1 or player 2 have four tiles connected

// ===== JS/TS GOALS ===== //
// player1Color = #F06292
// player2Color = #4DD0E1
// clicks = 0
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
const player1Color = "rgb(240, 98, 146)"
const player2Color = "rgb(77, 208, 225)"
let clicks = 0

// * column arrays * //
const columnDivs: HTMLDivElement[] = Array.from(document.querySelectorAll(".column")) as HTMLDivElement[]

const column1Squares: HTMLDivElement[] = Array.from(document.getElementById("column1").children) as HTMLDivElement[]

const column2Squares: HTMLDivElement[] = Array.from(document.getElementById("column2").children) as HTMLDivElement[]

const column3Squares: HTMLDivElement[] = Array.from(document.getElementById("column3").children) as HTMLDivElement[]

const column4Squares: HTMLDivElement[] = Array.from(document.getElementById("column4").children) as HTMLDivElement[]

const column5Squares: HTMLDivElement[] = Array.from(document.getElementById("column5").children) as HTMLDivElement[]

const column6Squares: HTMLDivElement[] = Array.from(document.getElementById("column6").children) as HTMLDivElement[]

const column7Squares: HTMLDivElement[] = Array.from(document.getElementById("column7").children) as HTMLDivElement[]


// ===== FUNCTIONS ===== //
const increaseClicks = () => {
    clicks = clicks + 1
}

const storeColumn = (e) => { // creates an array of squares within clicked column
    const currentColumn: HTMLDivElement[] = Array.from(document.getElementById(`${e.currentTarget.id}`).children) as HTMLDivElement[]
    return currentColumn
}

const checkAvailability = (square: HTMLDivElement) => { // checks the background of a circle within a square on the board
    const circleToCheck: HTMLDivElement[] = Array.from(square.children) as HTMLDivElement[] // this creates a singleton array of the circle
    return (window.getComputedStyle(circleToCheck[0]).backgroundColor === "rgb(186, 104, 200)")
}

const declareTurn = (nextPlayer: string) => {
    const declareTurnH3 = document.getElementById("declare-turn")
    declareTurnH3.innerText = `${nextPlayer}, select a row and place your tile.`
    if (nextPlayer === "Player 1") {
        declareTurnH3.style.color = player1Color
    } else {
        declareTurnH3.style.color = player2Color
    }
}

const declareColor = (parent: HTMLDivElement[], indexLocation: number) => {
        return window.getComputedStyle(parent[indexLocation].children[0]).backgroundColor
}

const checkPlayerPresence = (column: HTMLDivElement[], index: number) => {
    const circleToCheck: HTMLDivElement[] = Array.from(column[index].children) as HTMLDivElement[]
    let color = window.getComputedStyle(circleToCheck[0]).backgroundColor
    if (color === player1Color) {
        return "player1"
    } else if (color === player2Color) {
        return "player2"
    } else {
        return "empty"
    }
}

const checkVerticalWin = (column: HTMLDivElement[], div: HTMLDivElement[]) => {
    let index: number = column.indexOf(column.find(square => square === div)) // referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find as refresher 
    if (column[index-3] !== undefined && declareColor(column, index) === declareColor(column, index - 1) && declareColor(column, index - 1) === declareColor(column, index - 2) && declareColor(column, index - 2) === declareColor(column, index - 3)) {
        alert("vertical win condition works")
    }
}

// const checkWin = (e) => {
    
    // start with a function that takes a column and a row and tells you the player (AKA bgrnd color)

    // check if there are spaces 4 below, 4 to the right, 4 to the left
        // if not check if there are spaces 3 below
    // let index = the first index of the current column that is available
    // VERTICLE WIN if currentColumn[index].bgrnd === currentColumn[index-1].bgrnd && currentColumn[index-1].bgrnd === currentColumn[index-2].bgrnd && currentColumn[index-2].bgrnd === currentColumn[index-3].bgrnd && currentColumn[index-3].bgrnd === currentColumn[index-4].bgrnd => win!
    // HORIZONTAL WIN if currentColumn[index].bgrnd === currentColumn+1[index].bgrnd && currentColumn+1[index].bgrnd === currentColumn+2[index].bgrnd etc...
        // OR
        // if currentColumn[index].bgrnd === currentColumn-1[index].bgrnd && currentColumn-1[index].bgrnd === currentColumn-2[index].bgrnd etc...
        // OR
        // if currentColumn[index].bgrnd === currentColumn+1[index].bgrnd && currentColumn[index].bgrnd === currentColumn-1[index].bgrnd etc...
    // DIAGONAL WIN if currentColumn[index].bgrnd === currentColumn+1[index+1].bgrnd && currentColumn[index].bgrnd === currentColumn-1[index-1].bgrnd
// }

// ===== EVENT LISTENERS ===== //
const columnListener = (e) => {
    increaseClicks()
    const currentColumn = storeColumn(e)
    const availableSpaces = currentColumn.filter(checkAvailability)
    const selectedCircle = availableSpaces[0].children[0] as HTMLDivElement
    if (clicks%2 !== 0) { // it is player 1's turn is the clicks are odd
        selectedCircle.style.backgroundColor = player1Color
        // if (checkWin(currentColumn, availableSpaces[0])) {
        //     alert("Player 1 is the winner!")
        // } else {
            declareTurn("Player 2")
        // }
    } else { // it is player 2's turn if the clicks are even
        selectedCircle.style.backgroundColor = player2Color
    //     if (checkWin(e, div)) {
    //         alert("Player 1 is the winner!")
    //     } else {
            declareTurn("Player 1")
    }
    checkVerticalWin(currentColumn, availableSpaces[0])
}

columnDivs.forEach(column => {
    column.addEventListener("click", columnListener)
})

// console.log(checkPlayerPresence(column1Squares, 0))