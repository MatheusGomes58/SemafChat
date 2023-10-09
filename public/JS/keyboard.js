const databaseKeyboardBraile = `./IMG/DatabaseOfKeyboard/braile/`
const databaseKeyboardSemaforico = `./IMG/DatabaseOfKeyboard/semaforico/`
const databaseKeyboardNormal = `./IMG/DatabaseOfKeyboard/normal/`

//setInterval(embaralhar, 5000);

var typeOfKeyboard = "";

function randonKeys() {
    shuffleKeys(userRandonKeys);
    switch (userKeyboardData) {
        case "databaseKeyboardBraile":
            typeOfKeyboard = databaseKeyboardBraile;
            break;
        case "databaseKeyboardSemaforico":
            typeOfKeyboard = databaseKeyboardSemaforico;
            break;
        case "databaseKeyboardNormal":
            typeOfKeyboard = databaseKeyboardNormal;
            break;
        default:
            typeOfKeyboard = databaseKeyboardNormal;
            break;
    }
    renderKeys();
    console.log(userKeyboardData)
    console.log(userRandonKeys)
}


//interpreta as teclas
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("insertMessenger");
    const keyboardButtons = document.querySelectorAll(".key");
    keyboardButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const content = button.value;

            // Verifica se o conteúdo do botão é uma imagem
            const isImage = button.querySelector("img");

            if (content == "-") {
                inputField.value = inputField.value.slice(0, -1);
            } else if (content == "+") {
                //execução de envio da mensagem
            } else {
                inputField.value += content;
            }
        });
    });
});

//renderiza as teclas
function renderKeys() {
    const keyboardButtons = document.querySelectorAll(".key");

    // Mapeia letras para nomes de imagens correspondentes
    const letterToImage = {
        "A": "1.png",
        "B": "2.png",
        "C": "3.png",
        "D": "4.png",
        "E": "5.png",
        "F": "6.png",
        "G": "7.png",
        "H": "8.png",
        "I": "9.png",
        "J": "10.png",
        "K": "11.png",
        "L": "12.png",
        "M": "13.png",
        "N": "14.png",
        "O": "15.png",
        "P": "16.png",
        "Q": "17.png",
        "R": "18.png",
        "S": "19.png",
        "T": "20.png",
        "U": "21.png",
        "V": "22.png",
        "W": "23.png",
        "X": "24.png",
        "Y": "25.png",
        "Z": "26.png",
        "1": "27.png",
        "2": "28.png",
        "3": "29.png",
        "4": "30.png",
        "5": "31.png",
        "6": "32.png",
        "7": "33.png",
        "8": "34.png",
        "9": "35.png",
        "0": "36.png",
        "+": "37.png",
        "-": "38.png"
    };


    keyboardButtons.forEach((button) => {
        const letter = button.value;
        if (letterToImage.hasOwnProperty(letter)) {
            // Cria um elemento de imagem e define seu src como a imagem correspondente
            const img = document.createElement("img");
            img.src = `${typeOfKeyboard}${letterToImage[letter]}`;
            img.alt = letter; // Define o atributo alt como a letra original (para acessibilidade)

            // Remove o conteúdo de texto do botão e adiciona a imagem
            button.textContent = "";
            button.appendChild(img);
        }
    });
}

// Função para embaralhar todas as teclas, mantendo os números na mesma linha
function shuffleKeys(value) {
    const keyboard = document.querySelector('.keyboard-row');
    const numberRow = document.querySelector('.number-row');
    const allButtons = Array.from(keyboard.querySelectorAll('.key'));
    const allButtonsNumbers = Array.from(numberRow.querySelectorAll('.key'));

    // Exclui a tecla "Backspace" para não ser embaralhada
    const backspaceButton = keyboard.querySelector('.key.backspace');
    const index = allButtons.indexOf(backspaceButton);
    if (index !== -1) {
        allButtons.splice(index, 1);
    }

    if (value) {
        // Função de embaralhamento Fisher-Yates
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // Embaralhe todas as teclas
        shuffleArray(allButtonsNumbers);
        shuffleArray(allButtons);
    }

    // Limpa o teclado
    keyboard.innerHTML = '';

    // Reorganize os botões numericos no teclado
    allButtonsNumbers.forEach(button => {
        keyboard.appendChild(button);
    });

    // Reorganize os botões no teclado
    allButtons.forEach(button => {
        keyboard.appendChild(button);
    });

    // Adicione a tecla "Backspace" de volta ao teclado
    //keyboard.appendChild(backspaceButton);
}

