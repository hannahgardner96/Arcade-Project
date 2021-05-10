"use strict";
// SIMON GAME
// Create a light up simon says game that displays 4 buttons that light up and play a sound. Computer plays random sequence starting w length of 1 and growing with each round. User replays sequence by clicking buttons in correct order. If correct, computer goes onto next round, increasing length of sequence by one. Score determined by length of sequence correctly mimicked. 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ===== VARIABLES ===== //
// ***** variables pulled from html ***** //
// import swal from "sweetalert"
//  ***** modal variables ***** //
const modal = document.querySelector("#modal");
const puppyButton = {
    idButton: "puppy-button",
    idAvatar: "puppy",
    avatarInUse: "block",
    avatarUnused: "none",
};
const rainbowButton = {
    idButton: "rainbow-button",
    idAvatar: "rainbow",
    avatarInUse: "block",
    avatarUnused: "none",
};
const frenchFryButton = {
    idButton: "french-fry-button",
    idAvatar: "french-fry",
    avatarInUse: "block",
    avatarUnused: "none",
};
//  ***** game experience variables ***** //
const greenButton = {
    id: "green",
    lightOff: "#3b7a62",
    lightOn: "#00ff9d"
};
const redButton = {
    id: "red",
    lightOff: "#6d3232",
    lightOn: "#fd0000"
};
const yellowButton = {
    id: "yellow",
    lightOff: "#b8b849",
    lightOn: "#ffff00"
};
const blueButton = {
    id: "blue",
    lightOff: "#327d96",
    lightOn: "#00bfff"
};
const startButton = document.querySelector("#start-button");
const simonResultsH4 = document.getElementById("simon-results");
const playerResultsH4 = document.getElementById("player-results");
const scoreH4 = document.getElementById("score-value");
// ***** variables defined in TS ***** //
const avatarOptions = [puppyButton, rainbowButton, frenchFryButton];
const simonButtons = [greenButton, redButton, yellowButton, blueButton];
let goalSequence = []; // used https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript to address type error in setGoalSequence function coming from the output's (this array's) type not being defined
let playerSequence = [];
let clicks = 0;
let score = 0;
scoreH4.innerText = `${score}`;
// ===== FUNCTIONS ===== //
//  *** these function are used for both simon's demonstration and the player's move *** //
const getAvatarButtonElement = (button) => {
    return document.getElementById(button.idButton);
};
const setAvatar = (button) => {
    document.getElementById(button.idAvatar).style.display = button.avatarInUse;
};
const closeModal = () => {
    modal.style.display = "none";
};
const getSimonElement = (button) => {
    return document.getElementById(button.id); // "!" to say that this is a non-null assertion
};
// const timeout = (f, milliseconds) => new Promise(resolve => {
// }) // if I were creating a promise without ts, I would structure it like this. Below is the structure with ts.
const timeout = (func, milliseconds) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(func());
    }, milliseconds);
}); // this function is a promise that takes a function and a number of milliseconds as a parameter, waits at least the amount of time in the seconds, and then executes the function and returns a promise (in the case of flashLights the return will be changing and unchanging the style which is technically a void output bc no value is returning, just manipulating HTML elements). This is effectively a timeout but it is a promise instead of a callback so you can use async/await to force the different promises to wait for each other.
// const sleep = (milliseconds: number) => new Promise(()=> { // simpler function to replace timeout() did not work but plan to tinker around with it
//     setTimeout(() => {}, milliseconds)
// })
const flashLights = (buttons) => __awaiter(void 0, void 0, void 0, function* () {
    // buttons.forEach((button) => {
    for (const button of buttons) { // someone with experience suggested I use a for of loop rather than a for each loop to execute async functions so that the loop iterated over each individual element (staying in the scope of flashLights()) rather than applying a function to each element at the same time (creating a separate scope from flashLights()). I used https://medium.com/@nataliecardot/foreach-vs-for-of-vs-for-in-loops-472146fc1a1f as a resource to understand more. 
        yield timeout(() => {
            getSimonElement(button).style.backgroundColor = button.lightOn;
        }, 500);
        yield timeout(() => {
            getSimonElement(button).style.backgroundColor = button.lightOff;
        }, 500);
    }
});
// *** these functions compose Simon's demonstration *** //
const setGoalSequence = () => {
    const randomIndex = Math.floor(Math.random() * simonButtons.length);
    goalSequence.push(simonButtons[randomIndex]); // the random index element is added to the goalSequence AND remains on the simonButtons
    return goalSequence;
};
const clearResults = () => {
    simonResultsH4.innerText = "";
    playerResultsH4.innerText = "";
};
const simonSays = () => __awaiter(void 0, void 0, void 0, function* () {
    clearResults();
    const sequenceForRound = setGoalSequence(); // Simon demonstrates the sequence of lights for the player to copy
    yield flashLights(sequenceForRound); // parameter of sequence taken and used to change background of divs
    yield timeout(() => { alert("Your turn! Simon says, 'Click the buttons exactly as I did!'"); }, 250); // this adds the alert to the event queue so it waits to pop up until the other items have run
    startButton.removeEventListener("click", startButtonListener); // this references the function I am removing
    simonButtons.forEach(button => {
        getSimonElement(button).addEventListener("click", playerCopies);
    });
});
// *** these functions compose the player's move *** //
const increaseClicks = () => {
    clicks = clicks + 1;
};
const getPlayerClick = (e) => {
    const currentClick = e.currentTarget; // consulted someone with experience as well as this article to understand implementation of "as" https://stackoverflow.com/questions/55781559/what-does-the-as-keyword-do
    return simonButtons.find(button => button.id === currentClick.id);
};
const pushClickToArray = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const currentClick = getPlayerClick(e);
    playerSequence.push(currentClick);
});
const increaseScore = () => {
    score = score + 1;
    scoreH4.innerText = `${score}`;
};
const resetRound = () => {
    playerSequence = [];
    clicks = 0;
    startButton.addEventListener("click", startButtonListener); // this turns the start button event listener back on so the next round can begin
};
const compareSequences = () => {
    return (playerSequence[clicks - 1].id === goalSequence[clicks - 1].id);
};
const revealResults = () => {
    simonResultsH4.innerText = `Simon clicked: ${goalSequence.map(button => button.id).join(" ")}`;
    playerResultsH4.innerText = `You clicked: ${playerSequence.map(button => button.id).join(" ")}`; // I collaborated with someone with experience on how to structure this
};
const playerCopies = (e) => __awaiter(void 0, void 0, void 0, function* () {
    increaseClicks();
    yield pushClickToArray(e);
    yield flashLights([playerSequence[playerSequence.length - 1]]); // identified an issue that each time player clicked, the whole array lit up. By putting entire parameter in an array, I was able to light up only one at a time.
    if (compareSequences() === false) {
        yield timeout(() => { alert(`Oops! You pressed the wrong button. Simon wins! You earned ${score} points.`); }, 250);
    }
    else if (clicks === goalSequence.length) {
        yield timeout(() => { alert("You did exactly what Simon said! Great job. Click start when you are ready for the next round."); }, 250);
        revealResults();
        increaseScore();
        resetRound();
        simonButtons.forEach(button => {
            getSimonElement(button).removeEventListener("click", playerCopies);
        });
    }
});
// ===== EVENT LISTENERS ===== //
// had to fluidly add and remove event listeners throughout the game experience so there are additional adds and removes throughout other functions. This event listener starts the game
const startButtonListener = () => {
    simonSays();
}; // had to save this to a variable in order to reference the function I;m listening to so I can remove it later
avatarOptions.forEach(button => {
    getAvatarButtonElement(button).onclick = (e) => {
        setAvatar(button);
        closeModal();
        startButton.addEventListener("click", startButtonListener); // this could not be in the format of "onclick" because "removeEventListener" could not target and remove onclick
    };
});
// swal("hello world")
