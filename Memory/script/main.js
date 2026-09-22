const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;
const tab = [];

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

        gameBoard.appendChild(card);
    });
}

gameStart();