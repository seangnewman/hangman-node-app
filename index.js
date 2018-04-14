// We will use prompt for this one
// npm i prompt
var prompt = require('prompt');
var colors= require("colors/safe");

// Dependent upon the Letter modue
var Word = require('./Word')
var lostInSpaceArray = require('./lostInSpaceArray');


/************************************************************************************** */
var introductionString = `*************** Lost in Space Reboot Week! *******************\n
This week, Netflix is rebooting the classic (and many times not so classic) Irwin\n
Allen treasure (that should have been buried long ago) standard Lost in Space. The\n
original plan for the series was a retelling of the Swiss Family Robinson adventures\n
with a space based feel. And initially it seemed to stay on that track. However, the \n
show jumped the shark late in the first season and was a silly mess by the end of\n
season 3.  Curiously, despite the campiness of the show it always drew a much larger\n
audience than it's sister show on NBC - Star Trek.\n\n
let's see how much you remember, or haven't seemed to forget about this ridiculous\n
show. (I watched every episode.. even the talking plants...ugh)\n
And I will watch the reboot (I'm hopeless)\n\n`;

console.log(introductionString);
prompt.start();

//Lets define the game object based on the instruction provided
var lisGame = {
  lisPreviouslyGuessed : [], //Array to prevent duplicate gueses
  //Program entry
  lisStart : function(){
    this.lisObject = lostInSpaceArray[Math.floor(Math.random() * lostInSpaceArray.length)];
    this.lisWord = new Word(this.lisObject.Answer.replace(/\s/g, '')) ;
    this.lisWord._currentString();
    this.remainingGuesses = Math.ceil(this.lisObject.Answer.length * 1.5);
    this.lisPreviouslyGuessed = [];
    this.lisPrompt();
  },
  
  lisMatch : function(){
    var placeholder = '_';
    //If every character return true then a match was found
    var wordMatch = this.lisWord._currentString().replace(/\s+/, "").split('').every(function(character){
    //return true if not the placeholder ' _ '
       return (character != placeholder);
    });
      // All items returned were characters
    return wordMatch; 
   },

   lisFound : function(char, lisTerm){
     var matched = lisTerm.indexOf(char);
     if(matched === -1){
       return false;
     }else{
       return true;
     }
   },

   lisPrompt : function(){
     var promptObj = {
       name: 'lisCharacter',
       description : colors.magenta('Guess a letter!'),
       required : true
    };

    

    

    lisString = this.lisWord;
    console.log(this.lisObject.Question);
    //console.log("Answer = " + lisString._currentString()); 
    var matched = this.lisFound;

    /*********************************************************************************** */
    /*  Not sure why, but this does not work within prompt , have to pass reference
        need to read up by see this  -- Probably out of scope when entering prompt object */
    /************************************************************************************ */
    var self = this;


    prompt.get(promptObj, function(error, result){

        var playAgainObj = {
            name: 'playAgain',
            description : colors.green('Play Again (y/n)?'),
            required : true,
            pattern : '^(?:Y|N|y|n)$'
        };
        
      if(self.lisPreviouslyGuessed.indexOf(result.lisCharacter.toUpperCase()) === -1){
        self.lisWord._guessCharacter(result.lisCharacter.toUpperCase());
        self.lisPreviouslyGuessed.push(result.lisCharacter.toUpperCase());
        self.remainingGuesses--;
       
        var lisWordPrompt = matched(result.lisCharacter.toUpperCase(), self.lisWord._currentString());
        var resultString = lisWordPrompt === true?"Congrats!, you have a match.":"Sorry, no match found.";
        console.log(resultString + " " + self.lisWord._currentString() + "( " + self.remainingGuesses + " guesses remaining )");

        

        //Need a test to see if the number of guesses exceeds maximum
        if(self.remainingGuesses == 0 ){
          process.stdout.write('\033c');
          console.log("\nGood for you, the correct answer is '" + self.lisObject.Answer + "'  you didn't spend too much time on this show!\n");
          prompt.get(playAgainObj, function(error, result){
            self.lisStart();
            return;
          });
         
          
        }else if(self.lisMatch() === true){
          process.stdout.write('\033c');
          console.log("\nCongrats! The correct answer is '" + self.lisObject.Answer + "' Looks like you had no life, welcome to the club!\n");
          prompt.get(playAgainObj, function(error, result){
            if(result.playAgain.toUpperCase() === 'Y'){
              self.lisStart();
               
              return;
            }else{
              return;
            }
          });
          
        }else{
          //Lets continue game;
          
          self.lisPrompt();
        }
      }else{
        process.stdout.write('\033c');
        console.log("Whoa!  Tried this character before.");
        console.log("Current Guess " ,self.lisWord._currentString())
        self.lisPrompt();
      }
       
    });

    
   }
};

lisGame.lisStart();
 
 

 