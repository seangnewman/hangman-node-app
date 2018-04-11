// Will user prompt for this excercise
// npm i prompt
var prompt = require('prompt');
var colors= require("colors/safe");

var Letter = function(character){
    
    this._character = character;
    this._guessed;
    this._isGuessed = function(){
        var placeHolder = '_';
        return this._guessed === true? this._character : placeHolder;
    };
    this._evaluateGuess = function(theCharacter){
        this._guessed = theCharacter === this._character? true: false;
        console.log("Is it true?", this._guessed);
    }
};

var promptObj = {
    name: 'characterGuess',
    description : colors.magenta('Guess a letter!'),
    required : true
};


var test = new Letter('a');

var testchar;
prompt.start();
prompt.get(promptObj, function(err, result){
    //console.log(result.characterGuess);
    testchar = result.characterGuess;
    test._evaluateGuess(testchar);
     console.log(test._isGuessed());

});

//var test = Letter('a');



