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
// onclick, display of card front is changed from inline-block to none and display of card back is changed to inline-block (1.)
// add event listener to submit button (2.)
// on click take innerText of answer and compare to the return from the input (2.)
// if ===, add innerText of front (number) from score (3.)
// if !==, subtract innerText of front (number) from score (4.)
// 5. 7. when all cards have been turned over, the player is alerted to their score and to the end of the game
// make array of styles of every card. When array.every("none") === true, change display to more challenging questions
// =============================================== //
// ===== VARIABLES ===== //
const cardFronts = Array.from(document.querySelectorAll(".question-card-front"));
const cardBacks = Array.from(document.querySelectorAll(".question-card-back"));
const cardAnswers = Array.from(document.querySelectorAll(".question-answer"));
// ===== FUNCTIONS ===== //
const flipCard = (e) => {
    let cardParent = document.getElementById(e.currentTarget.parentElement.id);
    cardParent.children[0].style.display = "none";
    cardParent.children[1].style.display = "inline-block";
};
// ===== EVENT LISTENERS ===== //
// *** event listeners dynamically added and removed throughout game. Initial listener below
const cardFrontListener = (e) => {
    flipCard(e);
};
cardFronts.forEach(card => {
    card.addEventListener("click", cardFrontListener);
});
