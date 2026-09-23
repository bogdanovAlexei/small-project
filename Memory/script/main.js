document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.querySelector("#game-board");
    const movesDisplay = document.querySelector("#moves");
    const timerDisplay = document.querySelector("#timer");
    const resultDisplay = document.querySelector("#result");
    const restartBtn = document.querySelector("#restart");

    if (!gameBoard || !movesDisplay || !timerDisplay || !resultDisplay || !restartBtn) {
        console.error("Un élément du jeu est introuvable dans le HTML.");
        return;
    }

    const dimension = 150;
    const pairCount = 8;

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matchedCount = 0;
    let seconds = 0;
    let timerInterval = null;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }

        return array;
    }

    function createCards() {
        const imgStart = Math.floor(Math.random() * 1000) + 1;
        const images = [];

        for (let i = 0; i < pairCount; i++) {
            images.push(
                `https://picsum.photos/seed/memory-${imgStart + i}/${dimension}/${dimension}`
            );
        }

        return shuffle([...images, ...images]);
    }

    function renderCards() {
        gameBoard.innerHTML = "";

        cards.forEach((imgUrl) => {
            const card = document.createElement("div");
            card.className = "card";
            card.dataset.value = imgUrl;
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");

            card.addEventListener("click", () => handleCardClick(card));

            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(card);
                }
            });

            gameBoard.appendChild(card);
        });
    }

    function handleCardClick(card) {
        if (
            lockBoard ||
            card.classList.contains("matched") ||
            card === firstCard ||
            card.querySelector("img")
        ) {
            return;
        }

        revealCard(card);

        if (timerInterval === null) {
            startTimer();
        }

        if (firstCard === null) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;
        moves++;
        movesDisplay.textContent = `Coups : ${moves}`;

        checkMatch();
    }

    function revealCard(card) {
        const img = document.createElement("img");
        img.src = card.dataset.value;
        img.alt = "Image de mémoire";
        card.appendChild(img);
    }

    function checkMatch() {
        const isMatch = firstCard.dataset.value === secondCard.dataset.value;

        if (isMatch) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matchedCount += 2;

            resetTurn();
            checkVictory();
        } else {
            const cardOne = firstCard;
            const cardTwo = secondCard;

            setTimeout(() => {
                cardOne.innerHTML = "";
                cardTwo.innerHTML = "";
                resetTurn();
            }, 800);
        }
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function checkVictory() {
        if (matchedCount === cards.length) {
            stopTimer();
            resultDisplay.textContent =
                `Victoire ! Coups : ${moves} | Temps : ${formatTime(seconds)}`;
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function formatTime(totalSeconds) {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");

        return `${minutes}:${remainingSeconds}`;
    }

    function initGame() {
        stopTimer();

        seconds = 0;
        moves = 0;
        matchedCount = 0;
        firstCard = null;
        secondCard = null;
        lockBoard = false;

        movesDisplay.textContent = "Coups : 0";
        timerDisplay.textContent = "Temps : 00:00";
        resultDisplay.textContent = "";

        cards = createCards();
        renderCards();
    }

    restartBtn.addEventListener("click", initGame);
    initGame();
});