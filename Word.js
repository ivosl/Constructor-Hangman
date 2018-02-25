// requiring the Letter module exported from Letter.js
var Letter = require('./Letter.js');

// constructor function for creating Word objects
var Word = function(word) {
    
    
    var wordString = this; 
    
    this.wordSelected = false;
    this.word = word;
    // here letters objects will be held
    this.letters = []; 
    
    //push new letter object into an array
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
    // this method checks if there is a match for the guessed letter
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
// Exporting the Word constructor
module.exports = Word;