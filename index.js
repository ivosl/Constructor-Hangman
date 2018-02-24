

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

	