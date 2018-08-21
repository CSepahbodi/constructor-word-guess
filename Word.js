String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

//word.js should contain all of the methods which will check the letters guessed versus the random word selected.
var Letter = require('./letter.js');

function Word(string) {
	this.gameString = string;
	this.displayString = "";
	this.gameLength = 0;
	this.guessesMade = 0;
	this.wrongGuesses = 0;
	this.guessesAllowed = 6;
	this.triesLeft = this.guessesAllowed;
	this.lettersGuessed = [];
	this.letters = {
		space: {
			display: " ",
			count: 0,
			position: [],
		},
	};
    this.letterArray = [];

    for (var i = 0; i < string.length; i++) {
        eachLetter = string.charAt(i);
        this.letterArray.push(new Letter(eachLetter));
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
	};

    this.makeGuess = function(guess) {
        // for (var k=0; k < this.gameString.length; k++) {
            // console.log(this.letterArray[k].letterRender());
        // }
        var guess = guess.charAt(0).toLowerCase();
        if (this.letters.hasOwnProperty(guess)) {
            correct = this.letters[guess];
            for (var i = 0; i < (correct['position']).length; i++) {
                this.displayString = this.displayString.replaceAt((correct['position'])[i], this.letterArray[((correct['position'])[i])].letterRender());
                // if (correct['capitals'].hasOwnProperty((correct['position'])[i])) {
                    // this.displayString = this.displayString.replaceAt((correct['position'])[i], (correct['display']).toUpperCase());
                // } else {
                    // this.displayString = this.displayString.replaceAt((correct['position'])[i], correct['display']);
                // }
            }
            this.gameLength--;
        } else {
            this.triesLeft--;
            this.wrongGuesses++;
        }
        this.guessesMade++;
        this.lettersGuessed.push(guess);
    };

    this.drawCurrentWord = function(word) {
        var boxes = word.length;
        var currentWordStr = "";
        for (var i = 0; i < boxes; i++) {
            curChar = word.charAt(i);
            displayChar = curChar;
            if (curChar == " ") {
                displayChar == " ";
            }
            currentWordStr += displayChar;
        }
        console.log(currentWordStr);
    };
}

module.exports = Word;