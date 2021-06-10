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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
Swal.fire("Hello world");
// ===== VARIABLES ===== //
// ***** variables pulled from html ***** //
// import swal from "sweetalert"
//  ***** modal variables ***** //
var modal = document.querySelector("#modal");
var puppyButton = {
    idButton: "puppy-button",
    idAvatar: "puppy",
    avatarInUse: "block",
    avatarUnused: "none"
};
var rainbowButton = {
    idButton: "rainbow-button",
    idAvatar: "rainbow",
    avatarInUse: "block",
    avatarUnused: "none"
};
var frenchFryButton = {
    idButton: "french-fry-button",
    idAvatar: "french-fry",
    avatarInUse: "block",
    avatarUnused: "none"
};
//  ***** game experience variables ***** //
var greenButton = {
    id: "green",
    lightOff: "#3b7a62",
    lightOn: "#00ff9d"
};
var redButton = {
    id: "red",
    lightOff: "#6d3232",
    lightOn: "#fd0000"
};
var yellowButton = {
    id: "yellow",
    lightOff: "#b8b849",
    lightOn: "#ffff00"
};
var blueButton = {
    id: "blue",
    lightOff: "#327d96",
    lightOn: "#00bfff"
};
var startButton = document.querySelector("#start-button");
var simonResultsH4 = document.getElementById("simon-results");
var playerResultsH4 = document.getElementById("player-results");
var scoreH4 = document.getElementById("score-value");
// ***** variables defined in TS ***** //
var avatarOptions = [puppyButton, rainbowButton, frenchFryButton];
var simonButtons = [greenButton, redButton, yellowButton, blueButton];
var goalSequence = []; // used https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript to address type error in setGoalSequence function coming from the output's (this array's) type not being defined
var playerSequence = [];
var clicks = 0;
var score = 0;
scoreH4.innerText = "" + score;
// ===== FUNCTIONS ===== //
//  *** these function are used for both simon's demonstration and the player's move *** //
var getAvatarButtonElement = function (button) {
    return document.getElementById(button.idButton);
};
var setAvatar = function (button) {
    document.getElementById(button.idAvatar).style.display = button.avatarInUse;
};
var closeModal = function () {
    modal.style.display = "none";
};
var getSimonElement = function (button) {
    return document.getElementById(button.id); // "!" to say that this is a non-null assertion
};
// const timeout = (f, milliseconds) => new Promise(resolve => {
// }) // if I were creating a promise without ts, I would structure it like this. Below is the structure with ts.
var timeout = function (func, milliseconds) { return new Promise(function (resolve) {
    setTimeout(function () {
        resolve(func());
    }, milliseconds);
}); }; // this function is a promise that takes a function and a number of milliseconds as a parameter, waits at least the amount of time in the seconds, and then executes the function and returns a promise (in the case of flashLights the return will be changing and unchanging the style which is technically a void output bc no value is returning, just manipulating HTML elements). This is effectively a timeout but it is a promise instead of a callback so you can use async/await to force the different promises to wait for each other.
// const sleep = (milliseconds: number) => new Promise(()=> { // simpler function to replace timeout() did not work but plan to tinker around with it
//     setTimeout(() => {}, milliseconds)
// })
var flashLights = function (buttons) { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _i, buttons_1, button;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _loop_1 = function (button) {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: // someone with experience suggested I use a for of loop rather than a for each loop to execute async functions so that the loop iterated over each individual element (staying in the scope of flashLights()) rather than applying a function to each element at the same time (creating a separate scope from flashLights()). I used https://medium.com/@nataliecardot/foreach-vs-for-of-vs-for-in-loops-472146fc1a1f as a resource to understand more. 
                            return [4 /*yield*/, timeout(function () {
                                    getSimonElement(button).style.backgroundColor = button.lightOn;
                                }, 500)];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, timeout(function () {
                                        getSimonElement(button).style.backgroundColor = button.lightOff;
                                    }, 500)];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, buttons_1 = buttons;
                _a.label = 1;
            case 1:
                if (!(_i < buttons_1.length)) return [3 /*break*/, 4];
                button = buttons_1[_i];
                return [5 /*yield**/, _loop_1(button)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
// *** these functions compose Simon's demonstration *** //
var setGoalSequence = function () {
    var randomIndex = Math.floor(Math.random() * simonButtons.length);
    goalSequence.push(simonButtons[randomIndex]); // the random index element is added to the goalSequence AND remains on the simonButtons
    return goalSequence;
};
var clearResults = function () {
    simonResultsH4.innerText = "";
    playerResultsH4.innerText = "";
};
var simonSays = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sequenceForRound;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clearResults();
                sequenceForRound = setGoalSequence() // Simon demonstrates the sequence of lights for the player to copy
                ;
                return [4 /*yield*/, flashLights(sequenceForRound)]; // parameter of sequence taken and used to change background of divs
            case 1:
                _a.sent(); // parameter of sequence taken and used to change background of divs
                return [4 /*yield*/, timeout(function () { alert("Your turn! Simon says, 'Click the buttons exactly as I did!'"); }, 250)]; // this adds the alert to the event queue so it waits to pop up until the other items have run
            case 2:
                _a.sent(); // this adds the alert to the event queue so it waits to pop up until the other items have run
                startButton.removeEventListener("click", startButtonListener); // this references the function I am removing
                simonButtons.forEach(function (button) {
                    getSimonElement(button).addEventListener("click", playerCopies);
                });
                return [2 /*return*/];
        }
    });
}); };
// *** these functions compose the player's move *** //
var increaseClicks = function () {
    clicks = clicks + 1;
};
var getPlayerClick = function (e) {
    var currentClick = e.currentTarget; // consulted someone with experience as well as this article to understand implementation of "as" https://stackoverflow.com/questions/55781559/what-does-the-as-keyword-do
    return simonButtons.find(function (button) { return button.id === currentClick.id; });
};
var pushClickToArray = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var currentClick;
    return __generator(this, function (_a) {
        currentClick = getPlayerClick(e);
        playerSequence.push(currentClick);
        return [2 /*return*/];
    });
}); };
var increaseScore = function () {
    score = score + 1;
    scoreH4.innerText = "" + score;
};
var resetRound = function () {
    playerSequence = [];
    clicks = 0;
    startButton.addEventListener("click", startButtonListener); // this turns the start button event listener back on so the next round can begin
};
var compareSequences = function () {
    return (playerSequence[clicks - 1].id === goalSequence[clicks - 1].id);
};
var revealResults = function () {
    simonResultsH4.innerText = "Simon clicked: " + goalSequence.map(function (button) { return button.id; }).join(" ");
    playerResultsH4.innerText = "You clicked: " + playerSequence.map(function (button) { return button.id; }).join(" "); // I collaborated with someone with experience on how to structure this
};
var playerCopies = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                increaseClicks();
                return [4 /*yield*/, pushClickToArray(e)];
            case 1:
                _a.sent();
                return [4 /*yield*/, flashLights([playerSequence[playerSequence.length - 1]])]; // identified an issue that each time player clicked, the whole array lit up. By putting entire parameter in an array, I was able to light up only one at a time.
            case 2:
                _a.sent(); // identified an issue that each time player clicked, the whole array lit up. By putting entire parameter in an array, I was able to light up only one at a time.
                if (!(compareSequences() === false)) return [3 /*break*/, 4];
                return [4 /*yield*/, timeout(function () { alert("Oops! You pressed the wrong button. Simon wins! You earned " + score + " points."); }, 250)];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                if (!(clicks === goalSequence.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, timeout(function () { alert("You did exactly what Simon said! Great job. Click start when you are ready for the next round."); }, 250)];
            case 5:
                _a.sent();
                revealResults();
                increaseScore();
                resetRound();
                simonButtons.forEach(function (button) {
                    getSimonElement(button).removeEventListener("click", playerCopies);
                });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
// ===== EVENT LISTENERS ===== //
// had to fluidly add and remove event listeners throughout the game experience so there are additional adds and removes throughout other functions. This event listener starts the game
var startButtonListener = function () {
    simonSays();
}; // had to save this to a variable in order to reference the function I;m listening to so I can remove it later
avatarOptions.forEach(function (button) {
    getAvatarButtonElement(button).onclick = function (e) {
        setAvatar(button);
        closeModal();
        startButton.addEventListener("click", startButtonListener); // this could not be in the format of "onclick" because "removeEventListener" could not target and remove onclick
    };
});
