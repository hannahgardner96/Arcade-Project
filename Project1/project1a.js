"use strict";
// SIMON GAME
// Create a light up simon says game that displays 4 buttons that light up and play a sound. Computer plays random sequence starting w length of 1 and growing with each round. User replays sequence by clicking buttons in correct order. If correct, computer goes onto next round, increasing length of sequence by one. Score determined by length of sequence correctly mimicked. 
// ===== VARIABLES ===== //
// ***** variables pulled from html ***** //
// import swal from "sweetalert"
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
const startButton = document.querySelector("button");
const simonResultsH4 = document.getElementById("simon-results");
const playerResultsH4 = document.getElementById("player-results");
const scoreH4 = document.getElementById("score-value");
// ***** variables defined in TS ***** //
const simonButtons = [greenButton, redButton, yellowButton, blueButton];
let goalSequence = []; // used https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript to address type error in setGoalSequence function coming from the output's (this array's) type not being defined
let playerSequence = [];
let clicks = 0;
let score = 0;
scoreH4.innerText = `${score}`;
// ===== FUNCTIONS ===== //
//  *** this function is used for both simon's demonstration and the player's move *** //
const flashLights = (buttons /*, index: number = 0*/, func) => {
    // if(index === buttons.length) {
    //     return
    // }
    buttons.forEach((button) => {
        setTimeout(() => {
            document.getElementById(button.id).style.backgroundColor = button.lightOn;
            setTimeout(() => {
                document.getElementById(button.id).style.backgroundColor = button.lightOff;
                setTimeout(func, 0); // this will call the function entered as a parameter. Consulted someone w experience. It is an alert and alerts pop up immediately regardless of timeouts set. By setting this function's calling to a timeout of 0, it adds it to the cue and forces it to be called after the background change is timed out.
            }, 500);
        }, 500);
    });
};
// *** these functions compose Simon's demonstration *** //
const setGoalSequence = () => {
    const randomIndex = Math.floor(Math.random() * simonButtons.length);
    goalSequence.push(simonButtons[randomIndex]); // the random index element is added to the goalSequence AND remains on the simonButtons
    return goalSequence;
};
const simonSays = () => {
    const sequenceForRound = setGoalSequence(); // Simon demonstrates the sequence of lights for the player to copy
    flashLights(sequenceForRound, () => { alert("Your turn! Simon says, 'Click the buttons exactly as I did!'"); }); // parameter of sequence taken and used to change background of divs. Parameter of function taken that sends an alert after flashing.
};
// *** these functions compose the player's move *** //
const increaseClicks = () => {
    clicks = clicks + 1;
};
// feels like this could be dryer 
const pushClickToArray = (e) => {
    const currentClick = e.currentTarget;
    if (currentClick.id === "green") { // says id does not exist but it successfully console logs
        playerSequence.push(greenButton);
    }
    else if (currentClick.id === "red") {
        playerSequence.push(redButton);
    }
    else if (currentClick.id === "yellow") {
        playerSequence.push(yellowButton);
    }
    else if (currentClick.id === "blue") {
        playerSequence.push(blueButton);
    }
};
const increaseScore = () => {
    score = score + 1;
};
const resetPlayerSequence = () => {
    playerSequence = [];
};
const compareSequences = () => {
    return (playerSequence[clicks - 1].id === goalSequence[clicks - 1].id);
};
const playerCopies = (e) => {
    if (clicks < goalSequence.length) {
        increaseClicks();
        pushClickToArray(e);
        flashLights(playerSequence, () => { }); // this functions requires a parameter of a function but in the context its being called here, it does not need an alert. I consulted someone w experience to put an empty function here.
        if (compareSequences() === false) {
            alert(`Oops! You pressed the wrong button. Simon wins! You earned ${score} points.`);
        }
        else {
            alert("You did exactly what Simon said! Great job. Click start when you are ready for the next round.");
            increaseScore();
            resetPlayerSequence();
        }
    }
};
// ===== EVENT LISTENERS ===== //
startButton.onclick = () => {
    simonSays();
};
// Could these be more dry? Attempted with foreach loop but got type error "buttons.forEach is not a function"
simonButtons.forEach(button => {
    document.getElementById(button.id).onclick = (e) => {
        playerCopies(e);
    };
});
// swal("hello world")
