let board;
let currentPlayer;
let gameActive;
let gameMode;
let player1Score = 0;
let player2Score = 0;

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const options = document.querySelector('.options');
const gameContainer = document.querySelector('.game-container');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');

function startGame(mode) {
    // Hide the options and show the game container
    options.classList.add('hidden');
    setTimeout(() => {
        gameContainer.classList.add('visible');
    }, 500);

    // Initialize game variables
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameMode = mode;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkResult();
        switchPlayer();
    }
}

function switchPlayer() {
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;

        if (gameMode === 'computer' && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    let availableMoves = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(move);
}

function checkResult() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            updateScore();
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
    }
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
    }
}

function newGame() {
    // Reset the board and start a new game
    startGame(gameMode);
}
