
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;
let gameOver = false;
let guessHistory = [];


const guessInput = document.getElementById('guessInput');
const guessForm = document.getElementById('guessForm');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('resetButton');
const guessList = document.getElementById('guessList');


function checkGuess(event) {
    event.preventDefault(); 

    if (gameOver) return;

    const userGuess = Number(guessInput.value);

    
    if (userGuess < 1 || userGuess > 100) {
        message.textContent = 'Por favor, ingresa un número entre 1 y 100.';
        return;
    }

    attemptsLeft--;
    
    
    guessHistory.push(userGuess);
    updateGuessHistory();

    if (userGuess === randomNumber) {
        message.textContent = `¡Felicidades! ¡Adivinaste el número ${randomNumber}!`;
        message.style.color = 'green';
        endGame(true);
    } else if (attemptsLeft === 0) {
        message.textContent = `¡Fin del juego! El número era ${randomNumber}.`;
        message.style.color = 'red';
        endGame(false);
    } else {
        const hint = userGuess < randomNumber ? 'Demasiado bajo. Intenta de nuevo.' : 'Demasiado alto. Intenta de nuevo.';
        message.textContent = hint;
        message.style.color = 'orange';
    }

    attemptsDisplay.textContent = attemptsLeft;
    guessInput.value = ''; 
}

function endGame(isWinner) {
    gameOver = true;
    guessInput.disabled = true;
    resetButton.style.display = 'block';
}

function resetGame() {
   
    window.location.reload();
}


function updateGuessHistory() {
    guessList.innerHTML = '';
    guessHistory.forEach(guess => {
        const listItem = document.createElement('li');
        listItem.textContent = `Intentaste con: ${guess}`;
        guessList.appendChild(listItem);
    });
}


guessForm.addEventListener('submit', checkGuess);
resetButton.addEventListener('click', resetGame);

attemptsDisplay.textContent = attemptsLeft;