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


//--------------------------------------------------- Gameboard Object ----------------------------------------------


// Purpose: Store the gameboard as an array
// Properties and Methods: gameboard, getCell, setCell, resetBoard
// Example: const Gameboard = Wrapped inside IIFE, Gameboard.gameboard 


//--------------------------------------------------- Player Object ------------------------------------------------------


// Purpose: Create Players for the game
// Properties and Methods: name,getMark, setMark ,increaseScore, getScore
// Example: const playerOne = createPlayer("Alex"),playerOne.name, playerOne.increaseScore(), etc. 


//--------------------------------------------------- Game Object --------------------------------------------------


// Purose: Controls the flow of the game, who is the current player and how many rounds has been played, the score board
// Properties and Methods: getRound, getPlayes, setPlayers ,increaseRound, getCurrentPlayer, setCurrentPlayer
// Examples: const Game = Wrapped inside IIFE, Game.currentPlayer() etc. 

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Factory Functions ---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


// Purpose: Factory function to create Gameboard objects
// Signature: void -> object
// () -> []
// Wrap it inside IIFE so it cannot be used to create additional instances. 

const Gameboard = (function () {

    let gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const getCell = (cellID) => gameboard[cellID[0]][cellID[1]];
    const setCell = (cellID, mark) => {

        gameboard[cellID[0]][cellID[1]] = mark;

    }

    let resetBoard = () => {

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                gameboard[i][j] = null;
            }
        }

    };

    return { gameboard, getCell, setCell, resetBoard };

})();


// Purpose: Create Players 
// Signature: void -> object
// () -> {name: Alex, Score: 2}

function createPlayer(name) {

    // Each player has a mark, X or O
    let mark = "";
    const getMark = () => mark;
    const setMark = (m) => mark = m;

    // Current score of the player in the ongoing competition
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;


    return { name, getMark, setMark, increaseScore, getScore };

};


// purpose: Create Game 
// Signature: void -> Game 
// () -> {!!!}

const Game = (function () {

    let players = [];
    const getPlayers = () => players;
    const setPlayers = (playerList) => {

        players = playerList;

    }


    let round = 1;
    const getRound = () => round;
    const increaseRound = () => round++;

    let currentPlayer;
    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (player) => {

        currentPlayer = player;

    }
    return { getRound, getPlayers, setPlayers, increaseRound, getCurrentPlayer, setCurrentPlayer };
})()

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Game Flow ------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


// Purpose: Initialize the game
// Signature: [player1, player2] -> void
// initializeGame([player1, player2])

function initializeGame(players) {

    Game.setPlayers(players);
    Game.setCurrentPlayer(players[0]);
    setPlayerMark(players);

}


// Purpose: Set player's mark
// Signature: [player1, player2] -> void
// setPlayerMark([player1, player2])

function setPlayerMark(players) {

    players[0].setMark("X");
    players[1].setMark("O");

}


// Purpose: Records the player's choice. 
// Signature: Integer -> !!!
// play

function play(cellID) {


    if (cellNotOccupied(cellID)) {

        Gameboard.setCell(cellID, Game.getCurrentPlayer().getMark());

        console.log(Gameboard.gameboard);

        if (hasPlayerWon(Game.getCurrentPlayer().getMark())) {

            console.log(`${Game.getCurrentPlayer().name} has won the game!`);
            updateGameStatus(Game.getCurrentPlayer());

        } else {

            if (gameboardIsFull()) {

                console.log("This is a tie!");

            };

        };

        switchPlayer();

    };



};

// Purpose: Check if the selected cell is occupid
// Signature: Integer -> Boolean 
// Examples: cellNotOccupied(2) -> True / False

function cellNotOccupied(cellID) {

    return (Gameboard.getCell(cellID) === null);

}


// Purpose: Check if the board is full
// Sgnature: void -> Boolean 
// Exampels: boardIsNotFull() = true 

function gameboardIsFull() {

    return Gameboard.gameboard.every(row => {

        return row.every(cell => {

            return cell !== null;

        });

    });


};


// Purpose: Switchs the player after each move. 
// Signature: void -> void 
// Exampel: swithcPlayer()

function switchPlayer() {

    let [player1, player2] = Game.getPlayers();


    if (Game.getCurrentPlayer() === player1) {

        Game.setCurrentPlayer(player2);

    } else {

        Game.setCurrentPlayer(player1);

    }

}


// Purpose: Check for the winning combination 
// Signature: Array -> Boolean 
// Examples: hasPlayerWon([["X", "X", "X"], ["x", "O", "x"], ["O", "O", "X"]]) -> True

function hasPlayerWon(mark) {
    const gameboard = Gameboard.gameboard;

    const winningCombinations = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winningCombinations.some(combination =>
        combination.every(cell => gameboard[cell[0]][cell[1]] === mark)
    );

};


// Purpose: Updates the scores of the winning player and the winner of each three rounds in a row
// Signature: Player -> void 
// Examples: !!!

function updateGameStatus(player) {

    player.increaseScore();

    if (player.getScore() === 3) {

        console.log(`${Game.getCurrentPlayer().name} has won three times in a row!`);

    } else {

        console.log("Reset");
        Gameboard.resetBoard();

    };

};


// Purpose: Check for the gameover
// Signature: void -> !!!
// Examples: !!!

function gameOver() {

}
