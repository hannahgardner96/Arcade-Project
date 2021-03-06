// SIMON GAME
// Create a light up simon says game that displays 4 buttons that light up and play a sound. Computer plays random sequence starting w length of 1 and growing with each round. User replays sequence by clicking buttons in correct order. If correct, computer goes onto next round, increasing length of sequence by one. Score determined by length of sequence correctly mimicked. 

// ===== GAME FLOW ===== //
// Game setup 1.: modal pops up on refresh
// Game setup 2.: user selects one of 3 avatars
// Game setup 3: avatar is displayed next to their score 
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
    // DONE until player makes move, they cannot click start again

//  ***** BIG FUNCTION COMPOSED OF SMALLER FUNCTIONS ***** //
//  4. User mimicks sequence of lights && 5. Value of sequence is stored && // 7. If === then, proceed to next round && 8. if !== then alert player to loss and display final score
    // let playerSequence[] = empty array to build player sequence
    // let playerClicks = 0 as number of clicks in turn
    // let playerScore = 0
    // DONE event listeners on buttons (forEach loop for each button ID?) (4.)
    // DONE Onclick start conditional that does different things depending on length.
    // onclick, if playerClicks < goalSequence.length
        // DONE onclick, increase playerClicks by 1 (5.)
        // DONE onclick style is changed and returned as if button is lighting up
        // DONE onclick variable is added to playerSequence (5.)
        // 1/2 DONE (need sound, not alert) if playerSequence[playerClicks-1] === goalSequence[playerClicks-1], play happy sound (7. (ish))
        // 1/2 DONE (need sound not alert) if playerSequence[playerClicks-1] !== goalSequence[playerClicks-1], play angry sound (7. (ish))
        // DONE trigger alert that player has lost and display score
    // onclick, if playerClicks === goalSequence.length
        // DONE increase score
        // DONE end turn (5.)
        // DONE alert to click button to move onto next round
        // next round = click of initialize demo button (7.)

// *** CURRENT ISSUES *** //
// "select avatar" not visible when screen size changes

// DONE possible to click buttons before start
// DONEtrouble reading ID and comparing in compareSequences() but only sometimes???
// DONE no spaces in h2 appends
// DONE sometimes flash light in playerCopies() is only playing the last element of the array and sometimes it isn't
// DONE ONLY when puppy button is selected, start is automatically triggered
//  DONE flashLight flashes all the indices of an array at the same time. AND if the second index is the same color as the first, it just flashes once. Look into recursive timeouts.
// DONE not triggering else block in playerCopies()
// DONE after a player clicks a button, it alerts them immediately whether they were correct/incorrect rather than waiting until after their light flashes.
// DONE multiple alerts popping up as start button clicked multiple times
// DONE not able to run compareSequences() for second round
/// <reference path= "../../sweetalert2.d.ts" />
import type SwalDeclaration from "sweetalert2"
declare const Swal: typeof SwalDeclaration
// Swal.fire("Hello world")
// ===== INTERFACES ===== //
interface SimonButton {
    id: string,
    lightOff: string,
    lightOn: string,
} // idea for interface from someone w experience. Create interface so that I don't need a giant conditional block and can adjust it no matter how many buttons/divs there are. Referenced https://www.typescriptlang.org/docs/handbook/interfaces.html to create

interface AvatarButton {
    idButton: string,
    idAvatar: string,
    avatarInUse: string,
    avatarUnused: string,
}

// ===== VARIABLES ===== //
// ***** variables pulled from html ***** //
// import swal from "sweetalert"

//  ***** modal variables ***** //
const modal: HTMLDivElement = document.querySelector("#modal")

const puppyButton: AvatarButton = {
    idButton: "puppy-button",
    idAvatar: "puppy",
    avatarInUse: "block",
    avatarUnused: "none",
}

const rainbowButton: AvatarButton = {
    idButton: "rainbow-button",
    idAvatar: "rainbow",
    avatarInUse: "block",
    avatarUnused: "none",
}

const frenchFryButton: AvatarButton = {
    idButton: "french-fry-button",
    idAvatar: "french-fry",
    avatarInUse: "block",
    avatarUnused: "none",
}

//  ***** game experience variables ***** //
const greenButton: SimonButton = {
    id: "green",
    lightOff: "#3b7a62",
    lightOn: "#00ff9d"
}

const redButton: SimonButton = {
    id: "red",
    lightOff: "#6d3232",
    lightOn: "#fd0000"
}

const yellowButton: SimonButton = {
    id: "yellow",
    lightOff: "#b8b849",
    lightOn: "#ffff00"
}

const blueButton: SimonButton = {
    id: "blue",
    lightOff: "#327d96",
    lightOn: "#00bfff"
}

const startButton = document.querySelector("#start-button")!
const simonResultsH4 = document.getElementById("simon-results")!
const playerResultsH4 = document.getElementById("player-results")!
const scoreH4 = document.getElementById("score-value")!

// ***** variables defined in TS ***** //
const avatarOptions: AvatarButton[] = [puppyButton, rainbowButton, frenchFryButton]
const simonButtons: SimonButton[] = [greenButton, redButton, yellowButton, blueButton]
let goalSequence: SimonButton[] = [] // used https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript to address type error in setGoalSequence function coming from the output's (this array's) type not being defined
let playerSequence: SimonButton[] = []
let clicks: number = 0
let score: number = 0
    scoreH4.innerText = `${score}`


// ===== FUNCTIONS ===== //

//  *** these function are used for both simon's demonstration and the player's move *** //
const getAvatarButtonElement = (button: AvatarButton) => { // accesses the HTML element from the AvatarButton interface
    return document.getElementById(button.idButton)! 
}

const setAvatar = (button: AvatarButton) => { // changes the display of the selected avatar to block
    document.getElementById(button.idAvatar).style.display = button.avatarInUse
}

const closeModal = () => { // closes the modal
    modal.style.display = "none"
}

const getSimonElement = (button: SimonButton) => { // suggestion from someone w experience to make dryer 
    return document.getElementById(button.id)! // "!" to say that this is a non-null assertion
}

// const timeout = (f, milliseconds) => new Promise(resolve => {
// }) // if I were creating a promise without ts, I would structure it like this. Below is the structure with ts.

const timeout = <output>(func: () => output, milliseconds: number) => new Promise<output>((resolve) => {
    setTimeout(() => {
        resolve(func())
    }, milliseconds)
}) // this function is a promise that takes a function and a number of milliseconds as a parameter, waits at least the amount of time in the seconds, and then executes the function and returns a promise (in the case of flashLights the return will be changing and unchanging the style which is technically a void output bc no value is returning, just manipulating HTML elements). This is effectively a timeout but it is a promise instead of a callback so you can use async/await to force the different promises to wait for each other.

// const sleep = (milliseconds: number) => new Promise(()=> { // simpler function to replace timeout() did not work but plan to tinker around with it
//     setTimeout(() => {}, milliseconds)
// })

const flashLights = async (buttons: SimonButton[]) => { // takes an array of HTML elements (buttons) as a parameter. It loops over each button and waits 500 milliseconds, changes its color, waits 500 milliseconds, and changes it back. The color change is dependent on a conditional block assessing which button was pressed.
    // buttons.forEach((button) => {
    for (const button of buttons) { // someone with experience suggested I use a for of loop rather than a for each loop to execute async functions so that the loop iterated over each individual element (staying in the scope of flashLights()) rather than applying a function to each element at the same time (creating a separate scope from flashLights()). I used https://medium.com/@nataliecardot/foreach-vs-for-of-vs-for-in-loops-472146fc1a1f as a resource to understand more. 
        await timeout(() => { // referenced https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await for theory and formatting also asked someone with experience about formatting
            getSimonElement(button).style.backgroundColor = button.lightOn
        }, 500)
        await timeout(() => {
            getSimonElement(button).style.backgroundColor = button.lightOff
        }, 500)
    }

}

// *** these functions compose Simon's demonstration *** //
const setGoalSequence = () => { // pushes an element from simonButtons at randomIndex to goalSequence
    const randomIndex = Math.floor(Math.random()*simonButtons.length)
    goalSequence.push(simonButtons[randomIndex]) // the random index element is added to the goalSequence AND remains on the simonButtons
    return goalSequence
}

const clearResults = () => { // resets the inner text of H4 to nothing at the start of each new round (clearing the results so the player cannot reference the pattern)
    simonResultsH4.innerText = ""
    playerResultsH4.innerText = ""
}

const simonSays = async () => { // main function for Simon's demo
    clearResults()
    const sequenceForRound = setGoalSequence() // Simon demonstrates the sequence of lights for the player to copy
    await flashLights(sequenceForRound) // parameter of sequence taken and used to change background of divs
    await timeout(() => {alert("Your turn! Simon says, 'Click the buttons exactly as I did!'")}, 250) // this adds the alert to the event queue so it waits to pop up until the other items have run
    startButton.removeEventListener("click", startButtonListener) // this references the function I am removing
    simonButtons.forEach(button => { // adding this event listener here ensures that the buttons cannot be clicked until after Simon has demo'd
        getSimonElement(button).addEventListener("click", playerCopies)
    })
}

// *** these functions compose the player's move *** //
const increaseClicks = () => {
    clicks = clicks + 1
}

const getPlayerClick = (e) => { // accesses the id of the HTMLElement clicked and .find()s the element with a matching id in the simonButtons array
    const currentClick = e.currentTarget as HTMLElement // consulted someone with experience as well as this article to understand implementation of "as" https://stackoverflow.com/questions/55781559/what-does-the-as-keyword-do
    return simonButtons.find(button => button.id === currentClick.id)
}

const pushClickToArray = async (e: MouseEvent) => { // saves the return of getPlayerClick() to a variable and uses it to push a value to playerSequence[]
    const currentClick = getPlayerClick(e)
    playerSequence.push(currentClick)
}

const increaseScore = () => {
    score = score + 1
    scoreH4.innerText = `${score}`
}

const resetRound = () => { // mpties playerSequence[] and sets clicks to zero so there are no duplicates as they are adjusted during the next round
    playerSequence = []
    clicks = 0
    startButton.addEventListener("click", startButtonListener) // this turns the start button event listener back on so the next round can begin
}

const compareSequences = () => { // compares the most recently pushed item of each array to ensure player accuracy
    return (playerSequence[clicks-1].id === goalSequence[clicks-1].id)
    }

const revealResults = () => { // shows results of round above score 
    simonResultsH4.innerText = `Simon clicked: ${goalSequence.map(button => button.id).join(" ")}`
    playerResultsH4.innerText =  `You clicked: ${playerSequence.map(button => button.id).join(" ")}` // I collaborated with someone with experience on how to structure this
}

const playerCopies = async (e: MouseEvent) => { // main function for player's move
    increaseClicks()
    await pushClickToArray(e) 
    await flashLights([playerSequence[playerSequence.length-1]])// identified an issue that each time player clicked, the whole array lit up. By putting entire parameter in an array, I was able to light up only one at a time.
    if (compareSequences() === false) {
            await timeout(() => {alert(`Oops! You pressed the wrong button. Simon wins! You earned ${score} points.`)}, 250)
    } else if (clicks === goalSequence.length) {
        await timeout(() => {alert("You did exactly what Simon said! Great job. Click start when you are ready for the next round.")}, 250)
        revealResults()
        increaseScore()
        resetRound()
        simonButtons.forEach(button => { // removing the event listener here stops the player from being able to light up buttons on click
            getSimonElement(button).removeEventListener("click", playerCopies)
        })
    }
    
}

// ===== EVENT LISTENERS ===== //
// had to fluidly add and remove event listeners throughout the game experience so there are additional adds and removes throughout other functions. This event listener starts the game

const startButtonListener = () => {
    simonSays()
} // had to save this to a variable in order to reference the function I;m listening to so I can remove it later

avatarOptions.forEach(button => {
    getAvatarButtonElement(button).onclick = (e) => {
        setAvatar(button)
        closeModal()
        startButton.addEventListener("click", startButtonListener) // this could not be in the format of "onclick" because "removeEventListener" could not target and remove onclick
        
    }
})