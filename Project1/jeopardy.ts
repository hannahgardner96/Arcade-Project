// ===== GAME FLOW ===== //
// 1. player selects a question from a category and the card flips over. 
// 2. player enters answer into input box.
// 3. if the answer is correct, the innerText (a number) from the front of the card is added to their score
// 4. if the answer is incorrect, the innerText (a number) from the front of the card is subtracted from their score
// 5. when all the cards have been turned over, the player is alerted to their score and the more challenging questions are displayed
// 6. steps 1 - 4 repeat
// 7. when all cards have been turned over, the player is alerted to their score and to the end of the game 
// =============================================== //

// ===== TS/JS GOALS ===== //
// 1. player selects a question from a category and the card flips over. 
    // event listener on questions && 2. player enters answer into input box. && 3. if the answer is correct, the innerText (a number) from the front of the card is added to their score. && . if the answer is incorrect, the innerText (a number) from the front of the card is subtracted from their score.
        // DONE onclick, display of card front is changed from inline-block to none and display of card back is changed to inline-block (1.)
        // DONE remove event listener from other cards
        // add event listener to submit button (2.)
            // on click take innerText of answer and compare to the return from the input (2.)
            // if ===, add innerText of front (number) from score (3.)
            // if !==, subtract innerText of front (number) from score (4.)
// 5. 7. when all cards have been turned over, the player is alerted to their score and to the end of the game
    // make array of styles of every card. When array.every("none") === true, change display to more challenging questions
// =============================================== //

// ===== VARIABLES ===== //
const cardFronts = Array.from(document.querySelectorAll(".question-card-front"))
const cardBacks = Array.from(document.querySelectorAll(".question-card-back"))
const cardAnswers = Array.from(document.querySelectorAll(".question-answer"))
const submitButton = document.getElementById("submit-btn")
const submitText = document.querySelector("input[type='text']") as HTMLInputElement // referenced https://www.typescripttutorial.net/typescript-tutorial/type-casting/ for syntax

let currentCardParent: HTMLDivElement

// ===== FUNCTIONS ===== //
const flipCard = (e) => { // changes card front display to none and card back display to inline-block
    currentCardParent = document.getElementById(e.currentTarget.parentElement.id) as HTMLDivElement
    const children = Array.from(currentCardParent.children) as HTMLDivElement[] // created an array here after getting a type error bc just accessing currentCardParent.children was types as a general element and needed to be coerced into an HTMLElement
    children[0].style.display = "none"
    children[1].style.display = "inline-block"
}

const storePlayerInput = () => { // returns player input
    let playerInput = submitText.value // used https://www.w3schools.com/jsref/prop_text_value.asp as a refresher 
    return playerInput
}

const comparePlayerInput = (input) => {
    const children = Array.from(currentCardParent.children) as HTMLDivElement[]
    return (input === children[2].innerText)
}

// ===== EVENT LISTENERS ===== //
// *** event listeners dynamically added and removed throughout game. Initial listener below

// *** card front listener functions *** //
const cardFrontListener = (e) => { // flips card display, removes event listener from other cards (stop player frmo flipping more cards), and adds event listener to submit button
    flipCard(e)
    removeCardFrontListener()
    addSubmitListener()
}


    cardFronts.forEach(card => {
        card.addEventListener("click", cardFrontListener)
    })


const removeCardFrontListener = () => {
    cardFronts.forEach(card => {
        card.removeEventListener("click", cardFrontListener)
    })
}

//  *** submit button listener functions *** //
const submitButtonListener = () => { 
    let input = storePlayerInput()
    removeSubmitListener()
    console.log(comparePlayerInput(input))
}

const addSubmitListener = () => {
    submitText.focus() // suggestion from someone w experience
    submitButton.addEventListener("click", submitButtonListener)
}

const removeSubmitListener = () => {
    submitButton.removeEventListener("click", submitButtonListener)
}

// addCardFrontListener()