// Dependent upon the Letter modue
var Letter = require('./Letter.js');

/**************************************************************************
//Word Constructor, utilizes "has-a" relationship with Letter
***************************************************************************/
var Word = function(word){
  //Create an array of characters
  this._word = word.split('');

  // Create an array of letter objects
  this._arrayOfCharacters=[];
    
  //returns the string to indicate to identify which letters have been selected
  this._currentString = function(){
    if( this._arrayOfCharacters.length === 0){
    // Initializes the array
      for (var i=0; i < this._word.length; i++){
        this._arrayOfCharacters.push(new Letter(this._word[i]));
      }
    }

    var newCharacterString = [];
    for(var i=0; i < this._arrayOfCharacters.length; i++){
      newCharacterString.push(this._arrayOfCharacters[i]._isGuessed());
    }
 
    return newCharacterString.join('');
  };  // End return string
  
  
  this._guessCharacter = function(character){
  //given a character, call 
    for(var i=0; i <this._arrayOfCharacters.length; i++){
      this._arrayOfCharacters[i]._guessed === true? this._arrayOfCharacters[i]._isGuessed() :this._arrayOfCharacters[i]._evaluateGuess(character) ;
    }
  }; // End guess character
}

module.exports = Word;