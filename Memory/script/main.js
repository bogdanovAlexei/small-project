const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;
const tab = [];
let firstCard = null;
let secondCard = null;
let lockBoard = null;
let moves = 0;
let matchedCount = 0;

for (let i = 0; i < 8; i++) {
    tab[i] = `https://picsum.photos/${dimension}/${imgStart + i}`;
}

let cards = [...tab, ...tab];

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
}

function gameStart() {
    const cartesMelangees = shuffle(cards);
    initGame(cartesMelangees);
}

function renduDynamique(cartes) {
    const gameBoard = document.querySelector("#game-board");

    gameBoard.innerHTML = "";

    cartes.forEach((imgUrl) => {
        const conteneur = document.createElement("div");

        conteneur.innerHTML = `<div class="card"></div>`;

        const card = conteneur.firstElementChild;

        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");


        card.addEventListener("click", () => handleCardClick(card));

        gameBoard.appendChild(card);
    });
}

function handleCardClick(card) {
    if (lockBoard || card.classList.contains("matched") || card === firstCard ||
        card.firstChild) {
        return;
    }
    revealCard(card); // Tout est bon, on affiche l'image de la carte
    if (!firstCard) {
        firstCard = card; // C'est la première carte du tour
        return;
    }
    secondCard = card;
    lockBoard = true; // On bloque le plateau le temps de vérifier
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
        // On attend 0.8 seconde avant de cacher les images
        setTimeout(() => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetTurn(); // On débloque le plateau pour le coup suivant
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

checkVictory() {
    if (matchedCount === cards.length) {
        stopTimer();
        resultDisplay.textContent = `Victoire ! Coups : ${moves} | Temps : ${formatTime(seconds)}`;
    }
}
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
function formatTime(sec) {
    const min = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${min}:${s}`;
}
// Liaisons finales
restartBtn.addEventListener("click", initGame);
initGame();

gameStart();