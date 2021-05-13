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

const checkPlayerPresence = (div: HTMLDivElement) => {
    const circleToCheck: HTMLDivElement[] = Array.from(div.children) as HTMLDivElement[]
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
        if (clicks%2 !== 0){
            setTimeout(() => alert("Player 1 is the winner!"), 250)
        } else if (clicks%2 === 0){
            setTimeout(() => alert("Player 2 is the winner!"), 250)
        }
    }
}

const makeRowPresenceArray = () => { // consulted someone with experience who suggested making an array of arrays like a grid and using that to check the win conditions
    let rows = [] // parent array to store child arrays that represent each row
    columnDivs.forEach(() => { // adds empty array that will represent a row of spaces at equal indices
        rows.push([])
    })
    let rowLength = Array.from(columnDivs[0].children).length // stores the length of a row
    columnDivs.forEach(column => { 
        let squares = Array.from(column.children) as HTMLDivElement[] // for each column, creates an array of children squares
        for (let i = 0; i < rowLength; i++) { // takes the square at each index, checks who is there, and adds that return to different indexed rows
            let presence = checkPlayerPresence(squares[i])    
            rows[i].push(presence)
        }
    })
    return rows
}

const checkHorizontalWin = (arr: any[]) => {
    arr.forEach(array => {
        for (let i = 0; i < arr[0].length; i++) {
            if (array[i+3] !== undefined && array[i+2] !== undefined && array[i+1] !== undefined && array[i] === "player1" && array[i+1] === "player1" && array[i+2] === "player1" && array[i+3] === "player1") {
                setTimeout(() => alert("Player 1 is the winner!"), 250)
            } else if (array[i+3] !== undefined && array[i+2] !== undefined && array[i+1] !== undefined && array[i] === "player2" && array[i+1] === "player2" && array[i+2] === "player2" && array[i+3] === "player2"){
                setTimeout(() => alert("Player 2 is the winner!"), 250)
            }
        }
    })
}

const checkDiagonalWin = (arr: any[]) => {
    arr.forEach(array => {
        for (let i = arr[0].length; i >= 0; i--) {
            if (arr[i+3] && arr[i+2] && arr[i+1] && arr[i+3][i+3] !== undefined && arr[i+2][i+2] !== undefined && arr[i+1][i+1] !== undefined && arr[i+3][i+3] === "player1" && arr[i+2][i+2] === "player1" && arr[i+1][i+1] === "player1" && array[i] === "player1") {
                setTimeout(() => alert("Player 1 is the winner!"), 250)
            } else if (arr[i+3] && arr[i+2] && arr[i+1] && arr[i+3][i+3] !== undefined && arr[i+2][i+2] !== undefined && arr[i+1][i+1] !== undefined && arr[i+3][i+3] === "player2" && arr[i+2][i+2] === "player2" && arr[i+1][i+1] === "player2" && array[i] === "player2") {
                setTimeout(() => alert("Player 2 is the winner!"), 250)
            }
        }
    })
}

const checkWin = (column: HTMLDivElement[], div: HTMLDivElement[]) => {
    checkVerticalWin(column, div)
    const rows = makeRowPresenceArray()
    checkHorizontalWin(rows)
    checkDiagonalWin(rows)
}

// ===== EVENT LISTENERS ===== //
const columnListener = (e) => {
    increaseClicks()
    const currentColumn = storeColumn(e)
    const availableSpaces = currentColumn.filter(checkAvailability)
    const selectedCircle = availableSpaces[0].children[0] as HTMLDivElement
    if (clicks%2 !== 0) { // it is player 1's turn is the clicks are odd
        selectedCircle.style.backgroundColor = player1Color
        checkWin(currentColumn, availableSpaces[0])
        declareTurn("Player 2")
    } else { // it is player 2's turn if the clicks are even
        selectedCircle.style.backgroundColor = player2Color
        checkWin(currentColumn, availableSpaces[0])
        declareTurn("Player 1")
    }
}

columnDivs.forEach(column => {
    column.addEventListener("click", columnListener)
})