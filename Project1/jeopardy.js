"use strict";
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
// DONE add event listener to submit button (2.)
// DONE on click take innerText of answer and compare to the return from the input (2.)
// DONE if ===, add innerText of front (number) from score (3.)
// DONE if !==, subtract innerText of front (number) from score (4.)
// 5. 7. when all cards have been turned over, the player is alerted to their score and to the end of the game
// make array of styles of every card. When array.every("none") === true, change display to more challenging questions
// =============================================== //
// CURRENT ISSUES
// cannot click c2q2
// ===== VARIABLES ===== //
const cardFronts = Array.from(document.querySelectorAll(".question-card-front"));
const cardBacks = Array.from(document.querySelectorAll(".question-card-back"));
const cardAnswers = Array.from(document.querySelectorAll(".question-answer"));
const submitButton = document.getElementById("submit-btn");
const submitText = document.querySelector("input[type='text']"); // referenced https://www.typescripttutorial.net/typescript-tutorial/type-casting/ for syntax
const scoreh3 = document.getElementById("score");
let score = 0;
let currentCardParent;
// ===== FUNCTIONS ===== //
const flipCard = (e) => {
    currentCardParent = document.getElementById(e.currentTarget.parentElement.id);
    const children = Array.from(currentCardParent.children); // created an array here after getting a type error bc just accessing currentCardParent.children was types as a general element and needed to be coerced into an HTMLElement
    children[0].style.display = "none";
    children[1].style.display = "inline-block";
};
const storePlayerInput = () => {
    let playerInput = submitText.value.toLowerCase(); // used https://www.w3schools.com/jsref/prop_text_value.asp as a refresher 
    submitText.value = "";
    return playerInput;
};
const comparePlayerInput = (input) => {
    const children = Array.from(currentCardParent.children);
    return (input === children[2].innerText);
};
const increaseScore = () => {
    const children = Array.from(currentCardParent.children);
    const newScore = Number(children[0].innerText);
    score = score + newScore;
    scoreh3.innerText = `Score: ${score}`;
};
const decreaseScore = () => {
    const children = Array.from(currentCardParent.children);
    const newScore = Number(children[0].innerText);
    score = score - newScore;
    scoreh3.innerText = `Score: ${score}`;
};
const setDisplayNone = (e) => {
    const children = Array.from(currentCardParent.children);
    children[1].style.display = "none";
    children[3].style.display = "inline-block";
};
const checkCompletedDisplay = () => {
    const completedDivs = Array.from(document.querySelectorAll(".question-completed"));
    const arrayOfStyles = completedDivs.map(x => window.getComputedStyle(x).display);
    return arrayOfStyles.every(x => x === "inline-block");
};
// ===== EVENT LISTENERS ===== //
// *** event listeners dynamically added and removed throughout game. Initial listener below
// *** card front listener functions *** //
const cardFrontListener = (e) => {
    flipCard(e);
    removeCardFrontListener();
    addSubmitListener();
};
const addCardFrontListener = () => {
    cardFronts.forEach(card => {
        card.addEventListener("click", cardFrontListener);
    });
};
const removeCardFrontListener = () => {
    cardFronts.forEach(card => {
        card.removeEventListener("click", cardFrontListener);
    });
};
//  *** submit button listener functions *** //
const submitButtonListener = (e) => {
    e.preventDefault(); // without prevent default, it refreshes the page and clears the console
    let input = storePlayerInput();
    removeSubmitListener();
    if (comparePlayerInput(input)) {
        increaseScore();
    }
    else {
        decreaseScore();
    }
    setDisplayNone(e);
    if (checkCompletedDisplay()) {
        alert(`You answered all the questions. Your score is ${score}`);
    }
    addCardFrontListener();
};
const addSubmitListener = () => {
    submitText.focus(); // suggestion from someone w experience
    submitButton.addEventListener("click", submitButtonListener);
};
const removeSubmitListener = () => {
    submitButton.removeEventListener("click", submitButtonListener);
};
addCardFrontListener();
