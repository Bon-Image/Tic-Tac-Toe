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
// Properties and Methods: name,getMark, setMark ,increaseScore, getScore, resetScore 
// Example: const playerOne = createPlayer("Alex"),playerOne.name, playerOne.increaseScore(), etc. 


//--------------------------------------------------- Game Object --------------------------------------------------


// Purose: Controls the flow of the game, who is the current player and how many rounds has been played, the score board
// Properties and Methods: getRound, getPlayers, setPlayers, increaseRound, getCurrentPlayer, setCurrentPlayer, getGameIsOn, setGameIsOn
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
    const resetScore = () => {

        score = 0;

    }

    return { name, getMark, setMark, increaseScore, getScore, resetScore };

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

    let gameIsOn = false;
    const getGameIsOn = () => gameIsOn;
    const setGameIsOn = () => {

        gameIsOn = !gameIsOn;

    };


    let round = 1;
    const getRound = () => round;
    const increaseRound = () => round++;

    let currentPlayer;
    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (player) => {

        currentPlayer = player;

    }
    return { getRound, getPlayers, setPlayers, increaseRound, getCurrentPlayer, setCurrentPlayer, getGameIsOn, setGameIsOn };
})()

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- Game Flow ------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------


// Purpose: Creates players 
// void -> ArrayOfPlayer

function initializePlayers() {

    // Read the players' name from the input form, pass the names to create Players. 
    const player1 = createPlayer(document.getElementById("player1").value);
    const player2 = createPlayer(document.getElementById("player2").value);

    if (player1.name && player2.name) {

        if (!Game.getGameIsOn()) {

            initializeGame([player1, player2]);
            Game.setGameIsOn();

        } else {

            alert("Please refresh the page to start a new game.");

        };


    } else {

        alert("Please choose a name for player!");

    };

};


// Purpose: Initialize the game
// Signature: [player1, player2] -> void
// initializeGame([player1, player2])

function initializeGame(players) {

    Game.setPlayers(players);
    Game.setCurrentPlayer(players[0]);
    setPlayerMark(players);
    renderGameScores(players[0].getScore(), players[1].getScore());
    renderGrid();

};


// Purpose: Set player's mark
// Signature: [player1, player2] -> void
// setPlayerMark([player1, player2])

function setPlayerMark(players) {

    players[0].setMark("X");
    players[1].setMark("O");

};


// Purpose: Records the player's choice. 
// Signature: Integer -> !!!
// play

function play(cellID, cell = "") {

    Gameboard.setCell(cellID, Game.getCurrentPlayer().getMark());
    renderCell(cell);

    if (hasPlayerWon(Game.getCurrentPlayer().getMark())) {

        updateGameStatus(Game.getCurrentPlayer());



    } else {

        if (gameboardIsFull()) {

            showBanner();
            Gameboard.resetBoard();
            removeGrid();

        };

    };

    switchPlayer();

};

// Purpose: Check if the selected cell is occupid
// Signature: Integer -> Boolean 
// Examples: cellNotOccupied(2) -> True / False

function cellIsNotOccupied(cellID) {

    return (Gameboard.getCell(cellID) === null);

};


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

};


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

function updateGameStatus(player) {

    player.increaseScore();
    renderGameScores();


    if (player.getScore() === 3) {

        showBanner(Game.getCurrentPlayer(), true);

    } else {

        showBanner(Game.getCurrentPlayer());
        Gameboard.resetBoard();
        removeGrid();

    };

};


// Purpose: Displays grid and scores 
// void -> void 

function renderGameScores() {

    const players = Game.getPlayers();

    player1ScoreBoard.textContent = ` ${players[0].name} : ${players[0].getScore()}`;
    player2ScoreBoard.textContent = ` ${players[1].name} : ${players[1].getScore()}`;

};


// purpose: Render grids 
// Signature: void -> void 

function renderGrid() {

    for (let i = 0; i < 9; i++) {

        const cellIDs = [
            "[0, 0]", "[0, 1]", "[0, 2]",
            "[1, 0]", "[1, 1]", "[1, 2]",
            "[2, 0]", "[2, 1]", "[2, 2]"
        ];

        let cellDiv = createElement("div", ["cell"], cellIDs[i]);

        gridContainer.appendChild(cellDiv);

    };

};


// Purpose: Render a new mark into the secected cell
// Signature: Array -> void 

function renderCell(cell) {

    cell.textContent = Game.getCurrentPlayer().getMark();

};


// Purpose: Show game's results after each round ends. 
// Signature: Player Boolean -> void 

function showBanner(player = null, gameover = false) {

    const banner = createElement("dialog", ["banner"]);
    const bannerButton = createElement("button", ["banner-button"]);

    if (player !== null && !gameover) {

        bannerButton.textContent = "Play Again";
        banner.textContent = `${player.name} has won!`;

    } else if (player !== null && gameover) {

        bannerButton.textContent = "Reset";
        banner.textContent = `${player.name} Has Won 3 Times!`;
        resetGame();

    } else {

        bannerButton.textContent = "Play Again";
        bannerButton.textContent = "Tie!";

    };

    banner.appendChild(bannerButton);
    body.appendChild(banner);

    banner.showModal();

    bannerButton.addEventListener("click", () => {
        if (gameover) {

            location.reload();

        } else {

            banner.close();
            banner.remove();

        }

    });

};


// Purpose; Resets the game 
// void -> void 

function resetGame() {

    removeGrid();
    const players = Game.getPlayers();
    players[0].resetScore();
    players[1].resetScore();
    renderGameScores();

};


//--------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------- DOM Manipulation  -----------------------------------------
//--------------------------------------------------------------------------------------------------------------------


// import from HTML 
const body = document.querySelector("body");
const mainContentArea = document.getElementsByClassName("main-content-area")[0];
const gridContainer = document.getElementsByClassName("grid-container")[0];
const start = document.getElementById("submit");
const form = document.getElementById("player-form");

// Create new elements
const scoreContainer = createElement("div", ["scores"]);
const player1ScoreBoard = createElement("div", ["score-board"], "player1Score");
const player2ScoreBoard = createElement("div", ["score-board"], "player2Score");

scoreContainer.appendChild(player1ScoreBoard);
scoreContainer.appendChild(player2ScoreBoard);
mainContentArea.appendChild(scoreContainer);


//--------------------------------------------------- Event Handling ------------------------------------------------------


start.addEventListener("click", (event) => {

    event.preventDefault();
    initializePlayers();
    form.reset();

});



gridContainer.addEventListener("click", (event) => {

    const cellID = JSON.parse(event.target.id);
    if (cellIsNotOccupied(cellID)) {

        play(cellID, event.target);

    };
}

);


//--------------------------------------------------- DOM Functions ------------------------------------------------------


// Purpose: Creates elements 
// String ArrayOfString String-> Element 
// createElement("div", ["one", "container", "scores"]) -> <div class = " one container scores"></div>
// First argument is the element type we want to create, div, p, etc., the seocnd is the class list and the thirs ID name


function createElement(element, classList, id = "") {

    const tag = document.createElement(element);
    tag.classList.add(classList);
    tag.id = id;

    return tag;

};


// Purpose: Removes the grid after gameover
// void -> void 

function removeGrid() {

    const cells = [...document.getElementsByClassName("cell")];
    cells.forEach(cell => {

        cell.textContent = "";

    });

};
