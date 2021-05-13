# Hannah's Arcade
![Homepage Img](homepageinterfaceimg.png)

### Overview of Project 1
My goal for Project 1 is to create a game using JavaScript, TypeScript, CSS, and HTML that integrates DOM maniuplation through JS, reasponds to event listeners, and allows a user to play at least one round of a game. I began with a virtual version of Simon Says which required some basic knowledge of asynchronous JavaScript. After finishing this, I created a hiden word guessing game, Connect Four, and Jeopardy. I housed my games on an arcade homepage to enable seamless navigation. Below, I will elaborate on the technologies used, notable challenges, and interesting features.

### Simon
Simon begins with a modal that prompts a user to select from three avatar options. Upon selection, the modal disappears and the avatar appears next to their score. In the game instructions, the user is told to press "START". This triggers the background of a simon button to change as if it is lighting up. The user is alerted that it is their turn and they should imitate the sequence of lights that "Simon" demonstrated. Each time a player successfully imitates the sequence of lights, the sequence gets longer by one light. This will continue until the player incorrectly imitates the light sequence at which point an alert will pop up stating their score and that they lost. 
![Simon Interface](Simon/interfaceimg.png)

#### Technologies Used
This required a review of asynchronous JavaScript. I read the articles linked in [this article](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous). Additionally, I implemented vanilla JavaScript, TypeScript, HTML, and CSS.  I used Sketch to wireframe and Google Fonts for styling.

#### Notable Challenges
Simon's sequence was determined by pushing random indices from one array into another. The new array was itterated over by a forEach loop that triggered the display change of each button. Without asynchronous JS all the displays changed at once instead of sequentially. The challenge here came from understanding the syntax of a promise as well as how async and await impacted the queue of functions. By strategically awaiting certain functions, I was able to sequentially change the display of buttons as well as time alerts to display after the completion of these display changes. 

#### Interesting Features
timeout(f, milliseconds)
I consulted someone with experience about changing the timing of the display changes and alerts. Their changes were so abrupt that the user experience was a bit jarring. With his help, I structured a promise that implemented setTimout() to create distinct delays between the execution of functions.

### Snowman: Guess the Hidden Word
#### Technologies Used
#### Notable Challenges
#### Interesting Features

### Jeopardy
#### Technologies Used
#### Notable Challenges
#### Interesting Features

###  Connect Four
#### Technologies Used
#### Notable Challenges
#### Interesting Features
