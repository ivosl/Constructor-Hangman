
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
        if(this.letter === ' ') { 
            
            this.guessLetter = true;
            
            return '  ';
            
        }
    }
};

module.exports = Letter;