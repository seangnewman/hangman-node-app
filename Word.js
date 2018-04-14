// Dependent upon the Letter modue
var Letter = require('./Letter.js');

/**************************************************************************
//Word Constructor, utilizes "has-a" relationship with Letter
***************************************************************************/
var Word = function(word){
  //Create an array of characters
  this._word = word.split('').join('');

  // Create an array of letter objects
  this._arrayOfCharacters=[];
    
  //returns the string to indicate to identify which letters have been selected
  this._currentString = function(){
    var newCharacterString = [];

    if( this._arrayOfCharacters.length === 0){
      for (var i=0; i < this._word.length; i++){
        
        this._arrayOfCharacters.push(new Letter(this._word[i]));
      }
    }

    for(var i=0; i < this._arrayOfCharacters.length; i++){
      newCharacterString.push(this._arrayOfCharacters[i]._isGuessed());
    }
 
    return newCharacterString.join('');
  };  // End return string
  
  this._guessCharacter = function(character){
    for(var i=0; i <this._arrayOfCharacters.length; i++){
      if(this._arrayOfCharacters[i]._guessed != true){
        this._arrayOfCharacters[i]._evaluateGuess(character);
      }  
     }
  }; // End guess character
}

module.exports = Word;