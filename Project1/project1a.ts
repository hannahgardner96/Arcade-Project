// Create a light up simon says game that displays 4 buttons that light up and play a sound. Computer plays random sequence starting w length of 1 and growing with each round. User replays sequence by clicking buttons in correct order. If correct, computer goes onto next round, increasing length of sequence by one. Score determined by length of sequence correctly mimicked. 

// ===== GAME FLOW ===== //
// 1. User clicks initialize demo
// 2. Simon demonstrates sequence of lights
// 3. Values of sequence are stored
// 4. User mimicks sequence of lights
// 5. Value of sequence is stored
// 6. Simon value is compared to player value
// 7. If === then, proceed to next round
    // 7a. Each round, increase length of sequence by 1
// 8. if !== then alert player to loss and display final score

// ===== TS/JS GOALS ===== //

//  ***** BIG FUNCTION COMPOSED OF SMALLER FUNCTIONS ***** //
// 1. User clicks initialize demo && 2. Simon demonstrates sequence of lights && 3. Values of sequence are stored && 7a. Each round, increase length of sequence by 1
    // DONE let goalSequence[] = empty array to build sequence 
    // DONE let simonButtons = array of div ids: green, red, yellow, blue (probably save sivs to global variables as reference)
    // DONE event listener on initialize simon demo to trigger demo (1.)
    // DONE push (7a.) a random index from simonButtons into goalSequence (2.)
    // DONE use goalSequence in a loop/other function to change and return the style of the divs as if they are lighting up
    // DONE alert player that it is their turn
    // until player makes move, they cannot click start again

//  ***** BIG FUNCTION COMPOSED OF SMALLER FUNCTIONS ***** //
//  4. User mimicks sequence of lights && 5. Value of sequence is stored && // 7. If === then, proceed to next round && 8. if !== then alert player to loss and display final score
    // let playerSequence[] = empty array to build player sequence
    // let playerClicks = 0 as number of clicks in turn
    // let playerScore = 0
    // event listeners on buttons (forEach loop for each button ID?) (4.)
    // Onclick start conditional that does different things depending on length.
    // onclick, if playerClicks < goalSequence.length
        // DONE onclick, increase playerClicks by 1 (5.)
        // DONE onclick style is changed and returned as if button is lighting up
        // DONE onclick variable is added to playerSequence (5.)
        // if playerSequence[playerClicks-1] === goalSequence[playerClicks-1], play happy sound (7. (ish))
        // 1/2 DONE (need sound not alert) if playerSequence[playerClicks-1] !== goalSequence[playerClicks-1], play angry sound (7. (ish))
        // trigger alert that player has lost and display score
    // onclick, if playerClicks === goalSequence.length
        // DONE increase score
        // DONE end turn (5.)
        // DONE alert to click button to move onto next round
        // next round = click of initialize demo button (7.)

//  *** CURRENT ISSUE flashLight flashes all the indices of an array at the same time. Look into recursive timeouts.
// DONE *** CURRENT ISSUE not triggering else block in playerCopies()
// *** CURRENT ISSUE after a player clicks a button, it alerts them immediately whether they were correct/incorrect rather than waiting until after their light flashes.
// *** CURRENT ISSUE not able to run compareSequences() for second round
// ^^ both async js issues

// interface SimonButton {
//     id: string;
//     colorOff: string;
//     colorOn: string;
// } // idea for interface from Nate. Create interface so that I don't need a giant conditional block and can adjust it no matter how many buttons/divs there are.

// ===== VARIABLES ===== //
// ***** variables pulled from html ***** //
// import swal from "sweetalert"
const greenButton = document.getElementById("green")! // "!" tells TS that I am certain that this element exists. Typically TS will return HTMLElement or null but by putting this here I am assuring it that it is an HTML element. "non-null assertion"
const redButton = document.getElementById("red")!
const yellowButton = document.getElementById("yellow")!
const blueButton = document.getElementById("blue")!
const startButton = document.querySelector("button")!
const simonResultsH4 = document.getElementById("simon-results")!
const playerResultsH4 = document.getElementById("player-results")!
const scoreH4 = document.getElementById("score-value")!

// ***** variables defined in TS ***** //
const simonButtons: HTMLElement[] = [greenButton, redButton, yellowButton, blueButton]
let goalSequence: HTMLElement[] = [] // used https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript to address type error in setGoalSequence function coming from the output's (this array's) type not being defined
let playerSequence: HTMLElement[] = []
let clicks: number = 0
let score: number = 0
    scoreH4.innerText = `${score}`


// ===== FUNCTIONS ===== //

//  *** this function is used for both simon's demonstration and the player's move *** //
const flashLights = (buttons: HTMLElement[]/*, index: number = 0*/, func: Function) => { // this function takes an array of HTML elements (buttons) as a parameter. It loops over each button and waits 500 milliseconds, changes its color, waits 500 milliseconds, and changes it back. The color change is dependent on a conditional block assessing which button was pressed.
    // if(index === buttons.length) {
    //     return
    // }
    buttons.forEach((button) => {
        if (button === greenButton) {
            setTimeout(() => { // I began looking through this resource https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous and consulted someone with experience coding to frmat the asynchronus timeouts
                button.style.backgroundColor = "#00ff9d"
                setTimeout(() => {
                    button.style.backgroundColor = "#3b7a62"
                    // flashLights(buttons, index + 1)
                    setTimeout(func, 0) // this will call the function entered as a parameter. Consulted someone w experience.
                }, 500)
            }, 500)
            
        } else if (button === redButton) {
            setTimeout(() => {
                button.style.backgroundColor = "#fd0000"
                setTimeout(() => {
                    button.style.backgroundColor = "#6d3232"
                    setTimeout(func, 0) // this function is an alert and alerts pop up immediately regardless of timeouts set. By setting this function's calling to a timeout of 0, it adds it to the cue and forces it to be called after the background change is timed out.
                }, 500)
            }, 500)
        } else if (button === yellowButton) {
            setTimeout(() => {
                button.style.backgroundColor = "#ffff00"
                setTimeout(() => {
                    button.style.backgroundColor = "#b8b849"
                    setTimeout(func, 0)
                }, 500)
            }, 500)
        } else if (button === blueButton) {
            setTimeout(() => {
                button.style.backgroundColor = "#00bfff"
                setTimeout(() => {
                    button.style.backgroundColor = "#327d96"
                    setTimeout(func, 0)
                }, 500)
            }, 500)
        }
    })
}

// *** these functions compose Simon's demonstration *** //
const setGoalSequence = () => { // this function pushes an element from simonButtons at randomIndex to goalSequence
    const randomIndex = Math.floor(Math.random()*simonButtons.length)
    goalSequence.push(simonButtons[randomIndex]) // the random index element is added to the goalSequence AND remains on the simonButtons
    return goalSequence
}

const simonSays = () => {
    const sequenceForRound = setGoalSequence() // Simon demonstrates the sequence of lights for the player to copy
    flashLights(sequenceForRound,() => {alert("Your turn! Simon says, 'Click the buttons exactly as I did!'")}) // parameter of sequence taken and used to change background of divs. Parameter of function taken that sends an alert after flashing.
}

// *** these functions compose the player's move *** //
const increaseClicks = () => {
    clicks = clicks + 1
}

// feels like this could be dryer 
const pushClickToArray = (e: MouseEvent) => {
    const currentClick: HTMLElement =  e.currentTarget!
    if (currentClick.id === "green") { // says id does not exist but it successfully console logs
        playerSequence.push(greenButton)
    } else if (currentClick.id === "red") {
        playerSequence.push(redButton)
    } else if (currentClick.id === "yellow") {
        playerSequence.push(yellowButton)
    } else if (currentClick.id === "blue") {
        playerSequence.push(blueButton)
    }
}

const increaseScore = () => {
    score = score + 1
}

const resetPlayerSequence = () => {
    playerSequence = []
}

const compareSequences = () => {
    return (playerSequence[clicks-1].id === goalSequence[clicks-1].id)
    }

const playerCopies = (e: MouseEvent) => {
    if (clicks < goalSequence.length) {
        increaseClicks()
        pushClickToArray(e)
        flashLights(playerSequence, () => {}) // this functions requires a parameter of a function but in the context its being called here, it does not need an alert. I consulted someone w experience to put an empty function here.
        if (compareSequences() === false) {
            alert(`Oops! You pressed the wrong button. Simon wins! You earned ${score} points.`)
        }else {
            alert("You did exactly what Simon said! Great job. Click start when you are ready for the next round.")
            increaseScore()
            resetPlayerSequence()
        }
    } 
}

// ===== EVENT LISTENERS ===== //
startButton.onclick = () => {
    simonSays()
}

// Could these be more dry? Attempted with foreach loop but got type error "buttons.forEach is not a function"
greenButton.onclick = (e) => {
        playerCopies(e)
}

redButton.onclick = (e) => {
        playerCopies(e)
}

yellowButton.onclick = (e) => {
    playerCopies(e)
}

blueButton.onclick = (e) => {
    playerCopies(e)
}

// swal("hello world")