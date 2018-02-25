// dependency for inquirer npm package
var inquirer = require('inquirer');
// requiring the Word module exported from Word.js
var Word = require('./Word.js');

var gameOn = {

	// creating the wordbank
	wordToGuess:["EGGPLANT", "TURNIP", "CUCUMBER", "CAULIFLOWER", "KALE", "BELL PEPPER"],
    
	guessesLeft: 10,
    // this array will hold player's guesses
	lettersGuessed: [], 
    
	currentWord: null,
    
    // this function will prompt if player wants to start a new game
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
            
            // here we pick a random word from our list
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

        // inquirer is asking for player's guess
		inquirer.prompt([{ 
            
			name: "guess",
			type: "input",
			message: "Guess a letter!",
            
		}]).then(function(newLetter) {
			
			// Since our words are all caps the guessed letter is stored and shown in all caps too
            var chooseLetter = (newLetter.guess).toUpperCase(); 
            
            var repeatGuess = false;
            
            for(var i = 0; i < newGuess.lettersGuessed.length; i++){
                
                if(chooseLetter === newGuess.lettersGuessed[i]){
                    
                    repeatGuess = true;
                }
            }
            
            if(repeatGuess === false) {
                // adding the guessed letter to our array
                newGuess.lettersGuessed.push(chooseLetter); 
                
                var letterLookup = newGuess.currentWord.checkLetter(chooseLetter);
                
                if(letterLookup === 0) { 
                    
					console.log("\x1b[31mINCORECT\x1b[0m");
					
					//reducing the number of guesses by incrementing it by one after each wrong guess
                    newGuess.guessesLeft--; 
                    
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
                // If no guesses left the this game ends
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