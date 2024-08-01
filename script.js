const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const newGameButton = document.getElementById('newGame');
const toggleModeButton = document.getElementById('toggleMode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let playerVsAI = false;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkResult();

    if (playerVsAI && isGameActive) {
        aiMove();
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerHTML = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function aiMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomCell] = currentPlayer;
    cells[randomCell].innerHTML = currentPlayer;
    checkResult();
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.innerHTML = scoreX;
    } else {
        scoreO++;
        scoreODisplay.innerHTML = scoreO;
    }
}

function newGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerHTML = '');
}

function toggleMode() {
    playerVsAI = !playerVsAI;
    toggleModeButton.innerHTML = playerVsAI ? 'Switch to Player vs Player' : 'Switch to Player vs AI';
    newGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameButton.addEventListener('click', newGame);
toggleModeButton.addEventListener('click', toggleMode);

newGame(); // Start the game