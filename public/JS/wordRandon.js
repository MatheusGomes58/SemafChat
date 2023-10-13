// Lista de palavras para o jogo
const palavras = [
    "ACAMPAMENTO",
    "DESBRAVADOR",
    "TRILHA",
    "ESPECIALIDADES",
    "NO E AMARRA",
    "NATUREZA",
    "LIDERANCA",
    "DESAFIO",
    "SOBREVIVENCIA",
    "HABILIDADE",
    "UNIDADE",
    "EXCURSAO",
    "ORIENTACAO",
    "AVENTURA",
    "PIONEIRISMO",
    "AMIZADE",
    "ATIVIDADE AO AR LIVRE",
    "SERVICO COMUNITARIO",
    "FOGOS E FOGUEIRAS",
    "COMPETICAO"
];

// Obter elementos HTML
const output = document.getElementById("output");
const scrambledWord = document.getElementById("scrambledWord");
const guessSubmit = document.getElementById("send-button");
var palavraEmbaralhada = "";
var palavraSecreta = ""
// Adicionar um ouvinte de evento para o botão de adivinhar
guessSubmit.addEventListener("click", verificarAdivinhacao);

function createGame() {
    // Escolha uma palavra aleatória
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

    // Embaralhar a palavra
    palavraEmbaralhada = embaralharPalavra(palavraSecreta);
    document.getElementById("insertKeys").value = "";

    displayWord()
}

// Função para embaralhar uma palavra
function embaralharPalavra(word) {
    const arrayPalavra = word.split("");
    for (let i = arrayPalavra.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayPalavra[i], arrayPalavra[j]] = [arrayPalavra[j], arrayPalavra[i]];
    }
    return arrayPalavra.join("");
}

// Função para verificar a adivinhação do jogador
function verificarAdivinhacao() {
    const guess = document.getElementById("insertKeys").value.toUpperCase();

    if (guess === palavraSecreta) {
        swal.fire({
            icon: "success",
            title: "Parabéns! Você acertou a palavra!",
            text: "Deseja iniciar outro jogo?",
            showCancelButton: true,
            cancelButtonText: "Não",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            confirmButtonColor: "#3085d6",
        })
            .then((result) => {
                console.log(result)
                if (result.value) {
                    createGame()
                }
            })
    } else {
        swal.fire({
            icon: "error",
            title: "Tente novamente.",
            text: "A palavra está incorreta."
        })
    }
}

function displayWord() {
    let processedPostText = '';
    let texto = palavraEmbaralhada
    for (let i = 0; i < texto.length; i++) {
        const character = texto[i];
        if (letterToImage.hasOwnProperty(character)) {
            const imageElement = document.createElement('img');
            imageElement.src = `${typeOfKeyboard}${letterToImage[character]}`;

            if (character === " ") {
                imageElement.classList.add('sizeOfImage');
            } else {
                imageElement.classList.add('sizeOfImageWord');
            }

            processedPostText += imageElement.outerHTML;
        } else {
            processedPostText += character;
        }
    }

    scrambledWord.innerHTML = processedPostText;
}

renderKeyboard(false, true);