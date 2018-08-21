//require the inquirer npm package
var inquirer = require('inquirer');

var HangmanWord = require('./game.js');
//require the constructor from word.js
var Word = require('./word.js');
//create a new instance of a random word from the word bank

var hangmanWord = new Word(HangmanWord());

// Function to check letters and numbers
function alphanumeric(inputtxt) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (inputtxt.match(letters)) {
        return true;
    } else {
        return false;
    }
}

var runOnce = 1;
// console.log(hangmanWord);
var playGame = function() {

    if (runOnce) {
        console.log("-----------------------------------------------");
        console.log("-----------------------------------------------");
    	console.log("Hangman Topic: Academy Award Nominated Movies!");
        console.log("     You get a total of " + hangmanWord.guessesAllowed + " wrong Guesses.");
        console.log("-----------------------------------------------");
        runOnce = 0;
    }

    if (hangmanWord.gameString.localeCompare(hangmanWord.displayString) == 0) {
        console.log("-----------------------------------------------");
        console.log("CONGRATULATIONS, You WON!! Here again is the solution:");
        console.log("-----------------------------------------------");
    	console.log("====>      " + hangmanWord.gameString + "     <====");
        console.log("-----------------------------------------------");
        console.log("                    Try again!")
    }

    if ((hangmanWord.wrongGuesses < hangmanWord.guessesAllowed) && (hangmanWord.gameString != hangmanWord.displayString)) {
        console.log("-----------------------------------------------\n");
    	// console.log("You have " + hangmanWord.triesLeft + " wrong guesses left.");
        console.log("You have made " + hangmanWord.guessesMade + " guesses, "+ hangmanWord.triesLeft + " wrong guesses left.");
        console.log("Letters Guessed: "+ hangmanWord.lettersGuessed)
    	console.log("\n");
    	console.log("====>      " + hangmanWord.displayString + "     <====");
    	console.log("\n");

    	inquirer.prompt([{
    		type: 'text',
    		name: 'input',
    		message: "Pick a letter:",
    	}]).then(function(userInput) {
    		var userGuess = userInput.input.charAt(0);
    		if (alphanumeric(userGuess)) {
    			if (hangmanWord.lettersGuessed.indexOf(userGuess.toLowerCase()) == -1) {
    				hangmanWord.makeGuess(userGuess);
    			}
    			playGame();
    		} else {
    			playGame();
    		}
    	});
    } else if ((hangmanWord.wrongGuesses == hangmanWord.guessesAllowed) && (hangmanWord.gameString != hangmanWord.displayString)) {
        console.log("-----------------------------------------------");
        console.log("Bummer, you didn't win this time. Here is the solution:");
        console.log("-----------------------------------------------");
    	console.log("====>      " + hangmanWord.gameString + "     <====");
        console.log("-----------------------------------------------");
        console.log("\n                    Try again!\n")
    }

};

playGame();