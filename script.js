// Select the elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const overlay = document.getElementById("overlay");
const resultMessage = document.getElementById("result-message");
const newGameButton = document.getElementById("new-game");

// Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Functions
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id);

    if (board[cellIndex] !== "" || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showResultScreen(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (!board.includes("")) {
        showResultScreen("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function showResultScreen(message) {
    resultMessage.textContent = message;
    overlay.style.display = "flex"; // Show the overlay
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    overlay.style.display = "none"; // Hide the overlay
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame); // For New Game button
