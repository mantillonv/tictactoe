// Variables to track game state
let currentPlayer = 1; // Player 1 starts
let isGameOver = false;
let moves = 0; // Track number of moves
const boardState = ["", "", "", "", "", "", "", "", ""]; // Represents the board, initially empty
let playerOneName = 'Player One';
let playerTwoName = 'Player Two';

// Selecting all board buttons
const boardButtons = document.querySelectorAll('.board-button');

// Add event listeners to each board button
boardButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!isGameOver) {
            handleMove(index); // Call handleMove with the index of the clicked button
        }
    });
});

function handleMove(buttonIndex) {
    if (boardState[buttonIndex] === "" && !isGameOver) {
        // Update board state
        boardState[buttonIndex] = currentPlayer === 1 ? 'X' : 'O';
        
        // Update button text on UI
        boardButtons[buttonIndex].textContent = currentPlayer === 1 ? 'X' : 'O';

        // Increment moves
        moves++;

        // Check for a winner
        if (checkWinner()) {
            // Display winner
            document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} wins!`;
            isGameOver = true;
        } else if (moves === 9) {
            // If no winner and all cells are filled
            document.getElementById('game-status').textContent = "It's a draw!";
            isGameOver = true;
        } else {
            // Switch players
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} - Your Turn`;
        }
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }

    return false;
}

// Show modal when clicking "Change Names" button
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

// Handle form submission to change player names
document.getElementById('submit').addEventListener('click', () => {
    const playerOneInput = document.getElementById('player-one').value;
    const playerTwoInput = document.getElementById('player-two').value;
    
    if (playerOneInput && playerTwoInput) {
        playerOneName = playerOneInput;
        playerTwoName = playerTwoInput;
        
        document.getElementById('player-one-info').textContent = `${playerOneName} (X)`;
        document.getElementById('player-two-info').textContent = `${playerTwoName} (O)`;
        
        document.getElementById('game-status').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName} - Your Turn`;

        // Hide the modal
        document.getElementById('modal').style.display = 'none';
    }
});

// Hide modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Hide modal when pressing the 'Escape' key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('modal').style.display = 'none';
    }
});
