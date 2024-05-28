// Audio
const audio = document.getElementById("soundtrack");
audio.volume = 0.45;

const hoverSound = document.getElementById("hoverSound");
hoverSound.volume = 0.24;

// Init State
let currentPlayer = 1;
let isGameOver = false;
let moves = 0; 
const boardState = ["", "", "", "", "", "", "", "", ""];
let playerOneName = 'Player One';
let playerTwoName = 'Player Two';

// Game
const boardButtons = document.querySelectorAll('.board-button');

boardButtons.forEach((button, index) => {
    button.addEventListener('mouseenter', () => {
        if (!isGameOver) {
            playHoverSound();
        }
    });

    button.addEventListener('click', () => {
        if (!isGameOver) {
            handleMove(index);
        }
    });
});

function playHoverSound() {
    hoverSound.currentTime = 0;
    hoverSound.play();
}

function handleMove(buttonIndex) {
    if (boardState[buttonIndex] === "" && !isGameOver) {
        boardState[buttonIndex] = currentPlayer === 1 ? 'X' : 'O';
        boardButtons[buttonIndex].textContent = currentPlayer === 1 ? 'X' : 'O'
        moves++;

        if (checkWinner()) {
            document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} wins!`;
            isGameOver = true;
            showResetModal();
        } else if (moves === 9) {
            document.getElementById('game-status').textContent = "It's a draw!";
            isGameOver = true;
            showResetModal();
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} - Your Turn`;
        }
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

// Players
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('submit').addEventListener('click', () => {
    const playerOneInput = document.getElementById('player-one').value;
    const playerTwoInput = document.getElementById('player-two').value;
    if (playerOneInput && playerTwoInput) {
        playerOneName = playerOneInput;
        playerTwoName = playerTwoInput;
        document.getElementById('player-one-info').textContent = `${playerOneName} (X)`;
        document.getElementById('player-two-info').textContent = `${playerTwoName} (O)`;
        document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} - Your Turn`;
        document.getElementById('modal').style.display = 'none';
    }
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('modal').style.display = 'none';
    }
});

function showResetModal() {
    const resetModal = document.getElementById('reset-modal');
    resetModal.style.display = 'block';
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetGame);
}

// Reset
function resetGame() {
    currentPlayer = 1;
    isGameOver = false;
    moves = 0;
    boardState.fill("");
    boardButtons.forEach(button => button.textContent = "");
    document.getElementById('game-status').textContent = `${playerOneName} - Your Turn`;
    document.getElementById('reset-modal').style.display = 'none';
}