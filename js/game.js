document.addEventListener('DOMContentLoaded', () => {

    /* remplacer le nombre  * 10 par un autre nombre pour le jeu 1 */
    let correctNumber = Math.floor(Math.random() * 10) + 1;
    const gameSection = document.querySelector('.game-section'); // Assure-toi que la classe est correcte
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const resultMessage = document.getElementById('result-message');

    const mineGameSection = document.querySelector('.mine-game-section');
    const mineGrid = document.getElementById('mine-grid');
    const mineResultMessage = document.getElementById('mine-result-message');

    const TowerSection = document.querySelector('.tower-section');
    const towerGrid = document.getElementById('tower-grid');
    const message = document.getElementById("message");

    let safeClicks = 0;
    let attemptsLeftCheckGuessFacile = 3;

    //game 3
    const rows = 9, cols = 4;
    let bombPositions = [];
    let currentRow = rows - 1;
    let gameOver = false;

    // fonction checkGuess pour le niveau FACILE//
    function checkGuessFacile() {

        // 10 car on compte en base 10. C est juste pour ca //
        const userGuess = parseInt(guessInput.value, 10);
        
        // Modifier le nombre 1 et 10 si 
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            resultMessage.textContent = 'Please enter a number between 1 and 10.';
            resultMessage.style.color = 'orange';
            return;
        }
        
        if (userGuess === correctNumber) {
            resultMessage.textContent = 'You won! You guessed the correct number.';
            resultMessage.style.color = 'green';
            
            // Disable the input and button after winning
            guessInput.disabled = true;
            guessButton.disabled = true;

            // Show the mine game section after winning the number guessing game

            gameSection.style.display ='none';

            mineGameSection.style.display = 'block';
            setupMineGame();  // Setup the mine grid
        } 
        else {
            attemptsLeftCheckGuessFacile--;
            if (attemptsLeftCheckGuessFacile === 0) {
                resultMessage.textContent = `You lost! The correct number was ${correctNumber}`;
                resultMessage.style.color = 'red';
                setTimeout(resetGame, 3000);
            } 
            else {
                resultMessage.textContent = `You have ${attemptsLeftCheckGuessFacile} chances left.`;
                resultMessage.style.color = 'orange';

                if (userGuess < correctNumber) {
                    resultMessage.textContent += ' Try a higher number.';
                } 
                else {
                    resultMessage.textContent += ' Try a lower number.';
                }
            }
        }
    }
    

    function setupMineGame() {
        mineGrid.innerHTML = '';
        bombPosition = Math.floor(Math.random() * 25);
        safeClicks = 0;
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('mine-cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleMineClick(cell, i));
            mineGrid.appendChild(cell);
        }
    
        // Re-enable pointer events for new game
        const allCells = mineGrid.querySelectorAll('.mine-cell');
        allCells.forEach(cell => cell.style.pointerEvents = 'auto');
    }
    

    function handleMineClick(cell, index) {
        // Vérifie si la partie est déjà terminée
        if (mineResultMessage.textContent.includes('You won') || mineResultMessage.textContent.includes('You lost')) {
            return;
        }
    
        // Vérifie si la case a déjà été cliquée
        if (cell.classList.contains('clicked')) return;
        cell.classList.add('clicked');
    
        if (index === bombPosition) {
            cell.textContent = '💥';
            mineResultMessage.textContent = 'You lost! Restart the game.';
            mineResultMessage.style.color = 'red';
    
            // Désactiver toutes les cellules après avoir perdu
            const allCells = mineGrid.querySelectorAll('.mine-cell');
            allCells.forEach(cell => cell.style.pointerEvents = 'none');
    
            setTimeout(resetGame, 3000);
        } else {
            cell.textContent = '✓';
            safeClicks++;
    
            if (safeClicks === 15) {
                mineResultMessage.textContent = 'You won! Proceed to the secret code game.';
                mineResultMessage.style.color = 'green';
    
                // Désactiver toutes les cellules après avoir gagné
                const allCells = mineGrid.querySelectorAll('.mine-cell');
                allCells.forEach(cell => cell.style.pointerEvents = 'none');
                
                mineGameSection.style.display ='none';
                TowerSection.style.display = 'block';
                
                createGrid();
            }
        }
    }
    

    function createBombPositions() {
            bombPositions = [];
            for (let row = 0; row < rows; row++) {
                const bombCol = Math.floor(Math.random() * cols);
                bombPositions.push(row * cols + bombCol);
            }
        }

    function createGrid() {
        towerGrid.innerHTML = "";
        createBombPositions();
        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            if (i >= rows * cols - cols) cell.classList.add("start"); // Start zone
            if (i < cols) cell.classList.add("end"); // End zone
            cell.addEventListener("click", () => handleCellClick(cell, i));
            towerGrid.appendChild(cell);
        }
    }

    function handleCellClick(cell, index) {
        if (gameOver) return;
        if (!cell.classList.contains("clicked") && index >= currentRow * cols && index < (currentRow + 1) * cols) {
            cell.classList.add("clicked");
            if (bombPositions.includes(index)) {
                cell.textContent = "💥";
                message.textContent = "You hit a bomb! Game Over!";
                message.style.color = "red";
                gameOver = true;
                setTimeout(resetGame, 3000);
            } else {
                cell.textContent = "✓";
                currentRow--;
                if (currentRow < 0) {
                    message.textContent = "Le mot de passe est NONJA!";
                    message.style.color = "green";
                    gameOver = true;
                }
            }
        }
    }

    function resetGame() {
        location.reload();
    }

    guessButton.addEventListener('click', checkGuessFacile);
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkGuessFacile();
        }
    });

    codeButton.addEventListener('click', checkCode);
});