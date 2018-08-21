String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandom(max) {
    var min = 0;
    return Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
}
// Function to check letters and numbers
function alphanumeric(inputtxt) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (inputtxt.match(letters)) {
        return true;
    } else {
        return false;
    }
}


var hangmanObj = {
    gameRunning: false,
    gameString: "",
    displayString: "",
    gameLength: 0,
    guessesMade: 0,
    guessesAllowed: 6,
    wrongGuesses: 0,
    triesLeft: 6,
    lettersGuessed: [],
    letters: {
        space: {
            display: " ",
            count: 0,
            position: [],
        },
    },
    gamesWon: 0,
    gamesLost: 0,
    gamesPlayed: 0,
    posterURL: "",
    MovieTitle: "",
    MovieYear: "",


    initGame: function(string) {
        this.gameString = string;
        this.gameRunning = false;
        this.displayString = "";
        this.gameLength = 0;
        this.guessesMade = 0;
        this.wrongGuesses = 0;
        this.triesLeft = this.guessesAllowed;
        this.lettersGuessed = [];
        this.letters = {
            space: {
                display: " ",
                count: 0,
                position: [],
            },
        }

        for (var i = 0; i < string.length; i++) {
            eachLetter = string.charAt(i);
            eachLetterLC = eachLetter.toLowerCase();
            if (eachLetter === " ") {
                this.displayString += " ";
            } else if (eachLetter === "\'") {
                this.displayString += "\'";
            } else {
                this.displayString += "-";
                if (this.letters.hasOwnProperty(eachLetterLC)) {
                    this.letters[eachLetterLC].count++;
                    (this.letters[eachLetterLC]['position']).push(i);
                } else {
                    this.letters[eachLetterLC] = {
                        display: eachLetterLC,
                        count: 1,
                        position: [i],
                        capitals: {},
                    }
                    this.gameLength += 1;
                }
            }
            if ((eachLetter != " ") && (eachLetter === eachLetter.toUpperCase())) {
                Object.defineProperty(this.letters[eachLetterLC]['capitals'], i, {
                    value: true,
                });
            }
        }
    },

    makeGuess: function(guess) {
        var guess = guess.charAt(0).toLowerCase();
        hangmanObj.gameRunning = true;
        if (this.letters.hasOwnProperty(guess)) {
            correct = this.letters[guess];
            for (var i = 0; i < (correct['position']).length; i++) {
                // this.displayString = this.displayString.replaceAt((correct['position'])[i], correct['display']);
                if (correct['capitals'].hasOwnProperty((correct['position'])[i])) {
                    this.displayString = this.displayString.replaceAt((correct['position'])[i], (correct['display']).toUpperCase());
                } else {
                    this.displayString = this.displayString.replaceAt((correct['position'])[i], correct['display']);
                }
            }
            this.gameLength--;
        } else {
            this.triesLeft--;
            this.wrongGuesses++;
        }
        this.guessesMade++;
        this.lettersGuessed.push(guess);
    },

    drawCurrentWord: function(word, init) {
        var boxes = word.length;
        var currentWordStr = "";
        for (var i = 0; i < boxes; i++) {
            curChar = word.charAt(i);
            displayChar = curChar;
            if (init) {
                if (curChar == " ") {
                    displayChar == " ";
                } else {
                    displayChar = "-";
                }
            }
            currentWordStr += displayChar;
        }
        console.log(currentWordStr);
    },

}

// Captures Key Clicks
function getKeyInput(keyEvent) {
    // Determines which exact key was selected. Make it lowercase
    var userGuess = String.fromCharCode(keyEvent);
    userGuess = userGuess.charAt(0);
    if ((hangmanObj.guessesMade < 1) || (hangmanObj.gameRunning)) {
        if (alphanumeric(userGuess)) {
            if (hangmanObj.lettersGuessed.indexOf(userGuess.toLowerCase()) == -1) {
                hangmanObj.makeGuess(userGuess);
                hangmanObj.drawCurrentWord(hangmanObj.displayString, false);
                console.log("Tries Left: " + hangmanObj.triesLeft);
                updateCurrentGameStats();
            }
            if ((hangmanObj.gameLength == 0) || (hangmanObj.triesLeft < 1)) {
                hangmanObj.gameRunning = false;
                hangmanObj.gamesPlayed++;
                if (hangmanObj.gameLength == 0) {
                    hangmanObj.gamesWon++;
                    console.log("You Won!");
                } else {
                    hangmanObj.gamesLost++;
                    console.log("Sorry, you lost.");
                }
            }
        }
        updateCurrentGameStats();
    }
}

function guessesLeft(num) {
    console.log(hangmanObj.gameRunning);
    if (hangmanObj.gameRunning == false) {
        hangmanObj.guessesAllowed = num;
        console.log('wrong guesses left: ' + num);
    }
}

function updateCurrentGameStats() {
    if (hangmanObj.gameRunning) {
        console.log('guesses made: ' + hangmanObj.guessesMade);
        console.log('wrong guesses made: ' + hangmanObj.wrongGuesses);
        console.log('wrong guesses left: ' + hangmanObj.triesLeft);
    }
}

function newGame() {
    var randomNum = getRandom(hangmanData.length);

    currentGameString = hangmanData[randomNum].name;
    hangmanObj.MovieTitle = hangmanData[randomNum].name;
    hangmanObj.MovieYear = hangmanData[randomNum].year;
    hangmanObj.initGame(currentGameString);
}