

var Letter = require('./Letter.js');

var Word = function(word) {
    

  var wordString = this; 

  this.wordSelected = false;
  this.word = word;
  this.letters = []; 


  this.newLetters = function(){ 

    for(var i = 0; i < wordString.word.length; i++){

      var wordLetters = new Letter (wordString.word[i]);

      this.letters.push(wordLetters);
    }
  };

  this.selectWord = function() { 

    if(this.letters.every(function(newLetter) {

      return newLetter.guessLetter === true;

    })) {

      this.wordSelected = true;

      return true;
    }

  };

  this.checkLetter = function(guessLetter) { 

    var correctLtr = 0;
    
    this.letters.forEach(function(newLetter) {

      if(newLetter.letter === guessLetter) {

        newLetter.guessLetter = true;

        correctLtr++;

      }
    })
    
    return correctLtr;
  };


  this.showWord = function() { 

    var displayLetter = '';
    
    wordString.letters.forEach(function(newLtr){
      
      var currentLetter = newLtr.lettersInWord();
      
      displayLetter += currentLetter;

    });

    return displayLetter;
  };
}

module.exports = Word;