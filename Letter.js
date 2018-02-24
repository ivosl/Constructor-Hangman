
// var Letter = function(letter){

//     this.letter = letter;
//     this.letterIsGuessed = false;
//     this.guessLetter = function(){
//         if (this.letterIsGuessed === true){
//             console.log(this.letter);
//         }else{
//             console.log("_");
//         }
//     }
//     this.checkLetter = function(){
//         if(letter===)

//     }

// }

// module.exports = Letter;

var Letter = function (letter) {

    this.letter = letter; 
  
    this.guessLetter = false; 
  
    this.lettersInWord = function() {
  
      if(this.guessLetter === false) {  //if it is not a space, a letter or blank should appear
  
        return ' _ ';
      } 
  
      else { 
  
        return this.letter;
      }
  
    };
    this.check = function() {
        if(this.letter === ' ') { //show a blank if there is a space in the letter
        
            this.guessLetter = true;
      
            return '  ';
      
          }
    }
  };
  
  module.exports = Letter;