// Constructor function for creating Letter objects
var Letter = function (letter) {
    
    this.letter = letter; 
    
    this.guessLetter = false; 

    this.lettersInWord = function() {
        
        if(this.guessLetter === false) {  
            return ' _ ';
        } 
        
        else { 
            
            return this.letter;
        }
        
    };
    
    this.check = function() {
        // checking if there is a space in the letter
        if(this.letter === ' ') { 
            
            this.guessLetter = true;
            
            return '  ';
            
        }
    }
};
// Exporting the Letter constructor
module.exports = Letter;