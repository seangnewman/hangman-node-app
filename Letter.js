/**************************************************************************
//Letter Constructor, base object (not class, no inheritance in js)
***************************************************************************/
var Letter = function(character){
  this._character = character;  //Initialize object with character
  //Initialize value to false
  this._guessed = false;
    
  //return char if the guess was correct, otherwise a blank placeholder
  this._isGuessed = function(){ 
    var placeHolder = ' _ ';
    return this._guessed === true? ' ' + this._character + ' ' : placeHolder;
  }; // End 

  //return if the character was guessed
  this._evaluateGuess = function(theCharacter){
  //Set guessed flag 
    this._guessed = theCharacter === this._character? true: false;
   }
};
 
module.exports = Letter;


 

