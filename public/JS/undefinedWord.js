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

var palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
var palavraOculta = palavraSelecionada.split('').map(char => (char === ' ') ? ' ' : '_');
var tentativasRestantes = 6;

function randonWords(){
    palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
    palavraOculta = palavraSelecionada.split('').map(char => (char === ' ') ? ' ' : '_');
    tentativasRestantes = 6;
}

// Elementos da página
const wordDisplay = document.getElementById("word-display");
const inputLetter = document.getElementById("insertKeys");
const btnGuess = document.getElementById("btn-guess");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

// Exibe a palavra oculta na página
function displayWord() {
    let processedPostText = '';
    let texto = palavraOculta.join("")
    for (let i = 0; i < texto.length; i++) {
        const character = texto[i];
        if (letterToImage.hasOwnProperty(character)) {
            const imageElement = document.createElement('img');
            imageElement.src = `${typeOfKeyboard}${letterToImage[character]}`;
            imageElement.classList.add('sizeOfImageWord');

            if (!isNaN(character) && character.trim() !== "") {
                imageElement.classList.add('number');
            }

            processedPostText += imageElement.outerHTML;
        } else {
            processedPostText += character;
        }
    }

    wordDisplay.innerHTML = processedPostText;
}

// Verifica se a letra está na palavra
function checkLetter(letter) {
    let letterFound = false;
    for (let i = 0; i < palavraSelecionada.length; i++) {
        if (palavraSelecionada[i] === letter) {
            palavraOculta[i] = letter;
            letterFound = true;
        }
    }
    return letterFound;
}

// Função para verificar e processar a entrada
function processInput() {
    const inputLetter = document.getElementById("insertKeys");
    const message = document.getElementById("message");
    const attempts = document.getElementById("attempts");

    const letter = inputLetter.value.trim().toUpperCase();
    
    if (letter != "" && tentativasRestantes > 0) {

        if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
            if (palavraOculta.includes(letter)) {
                message.textContent = "Você já adivinhou essa letra.";
            } else {
                const letterFound = checkLetter(letter);
                if (letterFound) {
                    message.textContent = "Letra correta!";
                } else {
                    message.textContent = "Letra incorreta.";
                    tentativasRestantes--;
                    attempts.textContent = tentativasRestantes;
                }

                if (tentativasRestantes <= 0) {
                    message.textContent = `Você perdeu! A palavra era "${palavraSelecionada}". Pressione qualquer tecla para iniciar outro jogo.`;
                }

                if (!palavraOculta.includes("_")) {
                    message.textContent = "Parabéns! Você ganhou!";
                }

                displayWord();
                inputLetter.value = "";
            }
        }
    }else if(tentativasRestantes === 0){
        randonWords()
    }
}

// Intervalo de chamada corrigido para 1000 milissegundos
const inputInterval = setInterval(processInput, 100);

renderKeyboard(false, false);
randonWords()
