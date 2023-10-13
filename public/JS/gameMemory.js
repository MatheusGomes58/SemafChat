const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

let cards = [...letters, ...letters];
let flippedCards = [];
let matchedCards = [];
let selected = [];
let numToChoose = 0;

function createGame(Choose) {
    // Selecionar aleatoriamente um subconjunto do array com o tamanho especificado (numToChoose)
    numToChoose = Choose;
    while (selected.length < (numToChoose * 2) && letters.length > 0) {
        var randomIndex = Math.floor(Math.random() * letters.length);
        selected.push(letters[randomIndex]);
        selected.push(letters[randomIndex]);
        letters.splice(randomIndex, 1);
    }

    // Embaralhar o subconjunto selecionado
    for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""
    selected.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.dataset.cardValue = card;
        cardElement.dataset.index = index;

        cardElement.innerHTML = `
            <div class="card-front"><img src="./IMG/LOGO.png" alt="Card"></div>
            <div class="card-back hidden"><img src="${typeOfKeyboard}${letterToImage[card]}" alt="${card}"></div>
        `;

        cardElement.addEventListener("click", flipCard);

        gameBoard.appendChild(cardElement);
    });
}



function flipCard(event) {
    const card = event.target.closest('.card');
    if (!card || flippedCards.length >= 2 || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    const cardFront = card.querySelector(".card-front");
    const cardBack = card.querySelector(".card-back");

    cardFront.classList.toggle("hidden");
    cardBack.classList.toggle("hidden");

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.cardValue !== card2.dataset.cardValue) {
            // Se as cartas não forem iguais, vire-as de volta após um curto intervalo
            setTimeout(() => {
                flippedCards.forEach((flippedCard) => {
                    flippedCard.classList.remove("flipped");
                    const front = flippedCard.querySelector(".card-front");
                    const back = flippedCard.querySelector(".card-back");
                    front.classList.toggle("hidden");
                    back.classList.toggle("hidden");
                }); 
                checkMatch()
                flippedCards = [];
            }, 1000);
        } else {
            checkMatch()
            flippedCards = [];
        }
    }
}





// Função para verificar se as cartas formam um par
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.cardValue === card2.dataset.cardValue) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === (numToChoose * 2)) {
            swal.fire({
                icon: "success",
                title: "Parabéns, você venceu o jogo!",
                text: "Deseja iniciar outro jogo?",
                showCancelButton: true,
                cancelButtonText: "Não",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim",
                confirmButtonColor: "#3085d6",
            })
                .then((result) => {
                    if (result.value) {
                        createGame(8)
                    }
                })
        }
    }
}
