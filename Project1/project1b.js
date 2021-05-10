"use strict";
// SNOWMAN GAME
// Create a snowman game that displays a secret word as a list of hidden letters. Display an alphabet of letters that the player can reference while trying to guess the word. After a letter is used, disable that letter from alphabet. When a guess matches >= 1 letter, reveal those letters in list. Store incorrect guesses and end if they reach 6. When player reveals all hidden letters, they win.
// ===== GAME FLOW ===== //
// 1. User clicks start game, a secret word is chosen, and they are prompted to begin guessing.
// 2. User clicks a letter. If it is in the  word, the letter is revealed. If not, their incorrect guesses increase by one. 
// 3. The previously clicked letter's display changes and they cannot click it again. 
// 4. If their incorrect guesses reach 6, the game ends and they lose. 
// 5. If they guess all of the letters in the word, they win.
// ===== TS/JS GOALS ===== //
// 1. User clicks start game, a secret word is chosen, and they are prompted to begin guessing.
// availableWords[] = array filled with strings of possible words to guess
// secretWord[] = array mapped from randomWord
// DONE event listener on start game button
// DONE onclick, randomly sellect an index from randomWord
// DONE populate secretWord by splitting the string by spaces and pushing each letter as a separate index (use map?)
// DONE forEach element in secretWord, create an LI, set its innerText to the index value, its display to none, its id to `letter${Index}`, and append it to the UL
// 2. User clicks a letter. If it is in the  word, the letter is revealed. If not, their incorrect guesses increase by one. && 3. The previously clicked letter's display changes and they cannot click it again. && 4. If their incorrect guesses reach 6, the game ends and they lose. && 5. If they guess all of the letters in the word, they win.
// let incorrectGuesses = 0
// let currentGuess"" = empty string variable that will store the guess 
// add event listeners to alphabet buttons (forEach loop?)
// onclick, change display to gray and change event listener to alert that they have already clicked (need more rsearch here) (3.)
// onclick, store innerText of button in currentGuess
// if secretWord.some(currentGuess) === false (2.)
// alert the letter is not in the word
// increase incorrect guesses by one 
// check if incorrect guesses is 6 (4.)
// if === 6, alert they lost
// if secretWord.some(currentGuess) === true (2.)
// forEach LI, if innerText === currentGuess, change display from none to block
// forEach LI, if display === "block", alert player won, else alert to guess again (5.)
// set curentGuess to an empty string
// ===== INTERFACES ===== //
// ===== VARIABLES ===== //
const startButton = document.getElementById("start-button");
const secretWordUL = document.querySelector("ul");
let availableWords = ["snowflake", "icicle", "frosty", "cold", "frozen"];
let secretWord = [];
let availableLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let incorrectGuesses = 0;
let currentGuess = "";
// ===== FUNCTIONS ===== //
// *** FUNCTIONS TO SET UP SECRET WORD *** //
const selectSecretWord = () => {
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    secretWord.push(availableWords[randomIndex]);
    availableWords.splice(randomIndex, 1);
    return secretWord;
};
const splitWord = () => {
    let arrayToSplit = selectSecretWord();
    let splitWordArr = arrayToSplit[0].toUpperCase().split("");
    return splitWordArr;
};
const inputSecretWordLI = () => {
    let arrayToAppend = splitWord();
    arrayToAppend.forEach(letter => {
        let newLetter = document.createElement("li");
        newLetter.innerText = letter;
        newLetter.setAttribute("id", `${letter}`);
        newLetter.setAttribute("class", "hidden-letter");
        secretWordUL.appendChild(newLetter);
    });
};
// *** FUNCTIONS TO RESPOND TO PLAYER GUESSES *** //
// const changeLetterDisplay = (e) => {
//     let letter = e.currentTarget as HTMLButtonElement
//     letter.style.backgroundColor = "gray"
// }
// ===== EVENT LISTENERS ===== //
const startButtonListener = () => {
    inputSecretWordLI();
};
startButton.addEventListener("click", startButtonListener);
const letterListener = (e) => {
    // changeLetterDisplay(e)
};
availableLetters.forEach(letter => {
    document.getElementById(letter).addEventListener("click", letterListener);
});
