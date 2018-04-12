// Letter constructor 
var Letter = function(character){
    this._character = character;  //Initialize object with character
    this._guessed;
    this._isGuessed = function(){ 
        var placeHolder = '_';
        return this._guessed === true? this._character : placeHolder;
    };
    this._evaluateGuess = function(theCharacter){
        //Set guessed flag 
        this._guessed = theCharacter === this._character? true: false;
    }
};
 
module.exports = Letter;


 

