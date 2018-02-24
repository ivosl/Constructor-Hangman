

var inquirer = require('inquirer');

var Word = require('./Word.js');

var Letter = require('./Letter.js');


var gameOn = {
    
	wordToGuess:["EGGPLANT", "TURNIP", "CUCUMBER", "CAULIFLOWER", "KALE", "BELL PEPPER"],
    
	guessesLeft: 10,
    
	lettersGuessed: [], 
    
	currentWord: null,
    
    
	startGame: function(){  
        
		var startGame = this;
        
		if(this.lettersGuessed.length > 0) {
            
			this.lettersGuessed = [];
		}
        
		inquirer.prompt([{
            
			name: "start",
			type: "confirm",
			message: "Start a new game?"
            
		}]).then(function(response){
            
			if (response.start) {
                
				startGame.newGame();
			}
            
			else {
                
				console.log("Bye! Come again!");
			}
		})
        
	},
    
    newGame: function(){
        
		if(this. guessesLeft === 10) {
            
			console.log("\x1b[34mWhat is the name of the vegetable?\x1b[0m");
			console.log(" ");
            
            
			var shufleWord = Math.floor(Math.random() * this.wordToGuess.length); //pick a random word from the word bank
            
			this.currentWord = new Word (this.wordToGuess[shufleWord]);
			this.currentWord.newLetters();
            
			console.log(this.currentWord.showWord()); 
            
			this.nextGuess();
		}
        
		else {
            
			this.guessClear();
			this.newGame();
		}
	},
    
	guessClear: function(){
        
		this.guessesLeft = 10;
	},
    
	nextGuess: function(){
        
		var newGuess = this;
        
		inquirer.prompt([{ 
            
			name: "guess",
			type: "input",
			message: "Guess a letter!",
            
		}]).then(function(newLetter) {
            
            var chooseLetter = (newLetter.guess).toUpperCase(); 
            
            var repeatGuess = false;
            
            for(var i = 0; i < newGuess.lettersGuessed.length; i++){
                
                if(chooseLetter === newGuess.lettersGuessed[i]){
                    
                    repeatGuess = true;
                }
            }
            
            if(repeatGuess === false) {
                
                newGuess.lettersGuessed.push(chooseLetter); 
                
                var letterLookup = newGuess.currentWord.checkLetter(chooseLetter);
                
                if(letterLookup === 0) { //if guess is wrong
                    
                    console.log("\x1b[31mINCORECT\x1b[0m");
                    newGuess.guessesLeft--; //take away a guess
                    
                    console.log(newGuess.guessesLeft + " guesses remaining!!!" );
                    console.log("Letters already guessed: " + "\x1b[34m" + newGuess.lettersGuessed + "\x1b[0m ");
                    console.log(" ");
                    console.log(newGuess.currentWord.showWord());
                    console.log(" ");
                    console.log("-----------------------------");
                    console.log(" ");
                }
                
                else {
                    
                    console.log("\x1b[32mCORRECT!!!\x1b[0m ");
                    
                    if(newGuess.currentWord.selectWord() === true) { 
                        
                        console.log(newGuess.currentWord.showWord());
                        console.log("You got it right!");
                        
                    }
                    
                    
                    else {
                        
                        console.log(newGuess.guessesLeft + " guesses remaining!!!" );
                        console.log("Letters already guessed: " + "\x1b[34m" + newGuess.lettersGuessed + "\x1b[0m ");
                        console.log(" ");
                        console.log(newGuess.currentWord.showWord());
                        console.log(" ");
                        console.log("-----------------------------");
                        console.log(" ");
                        
                    }
                }
                
                if(newGuess.guessesLeft > 0 && newGuess.currentWord.wordSelected === false) { 
                    
                    newGuess.nextGuess();
                }
                
                else if (newGuess.guessesLeft === 0) {
                    
                    console.log("You ran out of guesses!");
                    
                    console.log("The correct answer is:  " + newGuess.currentWord.word)
                }
            }
            
            else {
                
                console.log("You have tried this letter already. Try a new one.");
                newGuess.nextGuess();
            }
            
        });
    }
}

gameOn.startGame();	