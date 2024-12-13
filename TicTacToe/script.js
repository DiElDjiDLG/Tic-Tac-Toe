const tile1 = document.getElementById('tile1');
const tile2 = document.getElementById('tile2');
const tile3 = document.getElementById('tile3');
const tile4 = document.getElementById('tile4');
const tile5 = document.getElementById('tile5');
const tile6 = document.getElementById('tile6');
const tile7 = document.getElementById('tile7');
const tile8 = document.getElementById('tile8');
const tile9 = document.getElementById('tile9');

const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules-container');

const resetBtn = document.getElementById('reset-btn');
const singlePlayerBtn = document.getElementById('singleplayer-btn');

const scoreBoard = document.getElementById('score-container')

const allTiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
let allTilesSingle = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];

const winningCombinations = [
    [tile1, tile2, tile3],
    [tile4, tile5, tile6],
    [tile7, tile8, tile9],
    [tile1, tile4, tile7],
    [tile2, tile5, tile8],
    [tile3, tile6, tile9],
    [tile1, tile5, tile9],
    [tile3, tile5, tile7]
]

const checkForWin = (player) => {
    return winningCombinations.some(combination => combination.every(tile => player.includes(tile)));
}

let singlePlayer = false;

let player1 = [];
let player2 = [];
let computer = [];

let player1Score = 0;
let player2Score = 0;
let computerBotScore = 0;

const resetBoard = () => {
    player1 = [];
    player2 = [];
    computer = [];
    allTiles.forEach(e => e.innerHTML = "");
    allTilesSingle = [...allTiles];
}

const setScoreBoard = () => {
    if (singlePlayer === false) {
        scoreBoard.innerHTML = `<p>Player1: ${player1Score}</p>\n<p>Player2: ${player2Score}</p>`;
    } else {
        scoreBoard.innerHTML = `<p>You: ${player1Score}</p>\n<p>Computer: ${computerBotScore}</p>`;
    }
}
setScoreBoard()

const resetScoreBoard = () => {
    player1Score = 0;
    player2Score = 0;
    computerBotScore = 0;
    setScoreBoard();
}

const drawFunction = (e) => {

    let tile;

    //multiplayer
    if (singlePlayer === false) {
        tile = e.target;
        if (tile.innerHTML === "") {
            if (player1.length === player2.length) {
                player1.push(tile);
                tile.innerHTML = `<h3 class="xo">X</h3>`;
                allTilesSingle = allTilesSingle.filter(element => element !== tile);
            } else {
                player2.push(tile);
                tile.innerHTML = `<h3 class="xo">O</h3>`;
                allTilesSingle = allTilesSingle.filter(element => element !== tile);
            }

            if (checkForWin(player1)) {
                setTimeout(() => {
                    alert("Player1 wins!");
                    resetBoard();
                }, 500);
                player1Score++;
            } if (checkForWin(player2)) {
                setTimeout(() => {
                    alert("Player2 wins!");
                    resetBoard();
                }, 500);
                player2Score++;
            }
        }
        setScoreBoard();

        if (allTilesSingle.length === 0 && checkForWin(player1) === false && checkForWin(player2) === false) {
            setTimeout(() => {
                alert("It's a tie, no one wins b*tch");
                resetBoard();
            }, 500)
        }
    }

    //singleplayer
    if (e) {
        tile = e.target;
        if (tile.innerHTML === "") {

            if (player1.length === computer.length) {
                player1.push(tile);
                tile.innerHTML = `<h3 class="xo">X</h3>`;
                allTilesSingle = allTilesSingle.filter(element => element !== tile);
                if (checkForWin(player1)) {
                    setTimeout(() => {
                        alert("You win!");
                        resetBoard();
                    }, 500);
                    player1Score++;
                    setScoreBoard();
                    return;
                }
            }
        }
    }
    if (allTilesSingle.length > 0 && singlePlayer === true) {
        computerMove();
    }
    if (allTilesSingle.length === 0 && checkForWin(player1) === false && checkForWin(computer) === false && singlePlayer === true) {
        setTimeout(() => {
            alert("It's a tie, no one wins b*tch");
            resetBoard();
        }, 500)
    }

    setScoreBoard()
}

const makePcSmarter = () => {
    if (computer.length !== player1.length) {
        //Check for winning move pc
        for (let i = 0; i < allTilesSingle.length; i++) {
            let pcTile = allTilesSingle[i];
            computer.push(pcTile);
            if (checkForWin(computer)) {
                pcTile.innerHTML = `<h3 class="xo">O</h3>`
                allTilesSingle = allTilesSingle.filter(element => element !== pcTile);
                return;
            } else {
                computer.pop();
            }
        }
        //Check for blocking winning move player1 (you)
        for (let i = 0; i < allTilesSingle.length; i++) {
            let pcTile = allTilesSingle[i];
            player1.push(pcTile);
            if (checkForWin(player1)) {
                player1.pop();
                computer.push(pcTile);
                pcTile.innerHTML = `<h3 class="xo">O</h3>`
                allTilesSingle = allTilesSingle.filter(element => element !== pcTile);
                return;
            } else {
                player1.pop();
            }
        }
        if (allTilesSingle.length > 0) {
            let randomIndex = Math.floor(Math.random() * allTilesSingle.length);
            let pcTile = allTilesSingle[randomIndex];
            computer.push(pcTile);
            pcTile.innerHTML = `<h3 class="xo">O</h3>`
            allTilesSingle = allTilesSingle.filter(element => element !== pcTile);
            return;
        }
    }
}

const computerMove = () => {
    if (computer.length !== player1.length) {
        setTimeout(() => {
            makePcSmarter();
            if (checkForWin(computer)) {
                computerBotScore++;
                setScoreBoard();
                setTimeout(() => {
                    alert("Computer wins!");
                    resetBoard();
                }, 500);
            }
        }, 500);
    }
}

const hideShowRules = () => {
    if (rules.style.display === 'none') {
        rules.style.display = 'block';
    } else {
        rules.style.display = 'none';
    }
}

rulesBtn.addEventListener('click', hideShowRules);
resetBtn.addEventListener('click', resetScoreBoard);
singlePlayerBtn.addEventListener('click', () => {

    if (singlePlayer === false) {
        singlePlayerBtn.innerText = "MultiPlayer";
        singlePlayer = true;
        resetBoard();
        resetScoreBoard();
    } else {
        singlePlayerBtn.textContent = "SinglePlayer";
        singlePlayer = false;
        resetBoard();
        resetScoreBoard();
    }
});

allTiles.forEach(tile => {
    tile.addEventListener("click", drawFunction);
})
