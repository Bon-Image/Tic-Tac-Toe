//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Design Guidelines ---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------- functions -----------------------------------------------------


// 1st line: Purpose
// 2nd line: Signature (Type input1 Type input2 -> Type output)
// 3rd line: Functional examples
// 4th line: Extra explanations (optional)


//--------------------------------------------------- Objects ------------------------------------------------------


// 1st line: Purpose
// Briefly describe the purpose of the object and what it represents or models

// 2nd line: Properties and Methods
// List the properties (attributes) and methods (functions) of the object with their types and purposes

// 3rd line: Example Usage
// Provide examples of how to create an instance of the object and use its properties and methods

// 4th line: Extra Explanations (optional)
// Any additional explanations or notes about the object


//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Object Definition ---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------- Gameboard Object ------------------------------------------------------


// Purpose: Store the gameboard as an array
// Properties and Methods: array gameboard !!!
// Example: const Gameboard = Wrapped inside IIFE, Gameboard.gameboard 


//--------------------------------------------------- Player Object ------------------------------------------------------


// Purpose: Create Players for the game
// Properties and Methods: name, increaseScore, getScore, numberOfWins, increaseNumberOfWins, getNumberOfWins 
// Example: const playerOne = createPlayer("Alex"),playerOne.name, playerOne.increaseScore(), etc. 


//--------------------------------------------------- Game Object --------------------------------------------------


// Purose: Controls the flow of the game, who is the current player and how many rounds has been played, the score board
// Properties and Methods: getRound, increaseRound, getCurrentPlayer, setCurrentPlayer
// Examples: const Game = Wrapped inside IIFE, Game.currentPlayer() etc. 

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Factory Functions ---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


// Purpose: Factory function to create Gameboard objects
// Signature: void -> object
// () -> []
// Wrap it inside IIFE so it cannot be used to create additional instances. 

const Gameboard = (function () {

    const gameboard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    return { gameboard };

})();


// Purpose: Create Players 
// Signature: void -> object
// () -> {name: Alex, Score: 2}

function createPlayer(name) {

    // Current score of the player in the ongoing round 
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;

    // Total number of wins up to the current round
    let numberOfWins = 0; 
    const increaseNumberOfWins = () => numberOfWins++; 
    const getNumberOfWins = () => numberOfWins; 
    
    return { name, increaseScore, getScore, numberOfWins, increaseNumberOfWins, getNumberOfWins};

}


// purpose: Create Game 
// Signature: void -> Game 
// () -> {!!!}

const Game = (function () {

    let round = 1;
    const getRound = () => round; 
    const increaseRound = () => round++; 

    let currentPlayer; 
    const getCurrentPlayer = () => currentPlayer; 
    const setCurrentPlayer = (player) => {

        currentPlayer = player; 

    }
    return {getRound, increaseRound, getCurrentPlayer, setCurrentPlayer}; 
})()

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Game Flow------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------



