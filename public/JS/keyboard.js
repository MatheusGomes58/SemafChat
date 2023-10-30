const databaseKeyboardBraile = `./IMG/DatabaseOfKeyboard/braile/`
const databaseKeyboardLibras = `./IMG/DatabaseOfKeyboard/libras/`
const databaseKeyboardMorse = `./IMG/DatabaseOfKeyboard/morse/`
const databaseKeyboardNormal = `./IMG/DatabaseOfKeyboard/normal/`
const databaseKeyboardSemaforico = `./IMG/DatabaseOfKeyboard/semaforico/`
const keyboarContainer = document.getElementById("keyboard");
const inputField = document.getElementById("insertKeys");
var keyboardVisible = false;
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
    "-": "38.png",
    " ": "39.png",
    "_": "39.png"
};

function randonKeys() {
    renderKeys();
    shuffleKeys(userRandonKeys);
}

//renderiza as teclas
function renderKeys() {
    const keyboardButtons = document.querySelectorAll("button");

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
    const keyboard = document.getElementById("keyboard-row");
    const numberRow = document.getElementById("number-row");
    const allButtons = Array.from(keyboard.querySelectorAll('.key'));
    const allButtonsNumbers = Array.from(numberRow.querySelectorAll('.key'));


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
}

function renderKeyboard(numbers, actions) {
    if (keyboardVisible) {
        keyboarContainer.innerHTML = `
            <div class="keyboard-container">
                <div class="keyboard">
                    <div class="number-row" id="number-row">
                        <button class="key number" value="1" onclick="buttonClickHandler('1')"></button>
                        <button class="key number" value="2" onclick="buttonClickHandler('2')"></button>
                        <button class="key number" value="3" onclick="buttonClickHandler('3')"></button>
                        <button class="key number" value="4" onclick="buttonClickHandler('4')"></button>
                        <button class="key number" value="5" onclick="buttonClickHandler('5')"></button>
                        <button class="key number" value="6" onclick="buttonClickHandler('6')"></button>
                        <button class="key number" value="7" onclick="buttonClickHandler('7')"></button>
                        <button class="key number" value="8" onclick="buttonClickHandler('8')"></button>
                        <button class="key number" value="9" onclick="buttonClickHandler('9')"></button>
                        <button class="key number" value="0" onclick="buttonClickHandler('10')"></button>
                    </div>
                    <div class="keyboard-row" id="keyboard-row">
                        <button class="key" value="A" onclick="buttonClickHandler('A')"></button>
                        <button class="key" value="B" onclick="buttonClickHandler('B')"></button>
                        <button class="key" value="C" onclick="buttonClickHandler('C')"></button>
                        <button class="key" value="D" onclick="buttonClickHandler('D')"></button>
                        <button class="key" value="E" onclick="buttonClickHandler('E')"></button>
                        <button class="key" value="F" onclick="buttonClickHandler('F')"></button>
                        <button class="key" value="G" onclick="buttonClickHandler('G')"></button>
                        <button class="key" value="H" onclick="buttonClickHandler('H')"></button>
                        <button class="key" value="I" onclick="buttonClickHandler('I')"></button>
                        <button class="key" value="J" onclick="buttonClickHandler('J')"></button>
                        <button class="key" value="K" onclick="buttonClickHandler('K')"></button>
                        <button class="key" value="L" onclick="buttonClickHandler('L')"></button>
                        <button class="key" value="M" onclick="buttonClickHandler('M')"></button>
                        <button class="key" value="N" onclick="buttonClickHandler('N')"></button>
                        <button class="key" value="O" onclick="buttonClickHandler('O')"></button>
                        <button class="key" value="P" onclick="buttonClickHandler('P')"></button>
                        <button class="key" value="Q" onclick="buttonClickHandler('Q')"></button>
                        <button class="key" value="R" onclick="buttonClickHandler('R')"></button>
                        <button class="key" value="S" onclick="buttonClickHandler('S')"></button>
                        <button class="key" value="T" onclick="buttonClickHandler('T')"></button>
                        <button class="key" value="U" onclick="buttonClickHandler('U')"></button>
                        <button class="key" value="V" onclick="buttonClickHandler('V')"></button>
                        <button class="key" value="W" onclick="buttonClickHandler('W')"></button>
                        <button class="key" value="X" onclick="buttonClickHandler('X')"></button>
                        <button class="key" value="Y" onclick="buttonClickHandler('Y')"></button>
                        <button class="key" value="Z" onclick="buttonClickHandler('Z')"></button>
                    </div>
                    <div class="math" id="actions">
                        <button class="key space" value=" " onclick="buttonClickHandler(' ')" id="keySpace"></button>
                        <button class="key backspace" value="-" onclick="buttonClickHandler('-')" id="keyBackspace"></button>
                    </div>
                </div>
            </div>
        `;
        if (!numbers) {
            document.getElementById("number-row").innerHTML = ""
        } if (!actions) {
            document.getElementById("actions").innerHTML = ""
        } if (document.title == "Advinhação de Palavras | CodeCipherChat") {
            displayWord();
        }if (document.title == "Anágramas | CodeCipherChat") {
            displayWord();
        }
        randonKeys()
    } else {
        keyboarContainer.innerHTML = ``;
    }

    keyboardVisible = !keyboardVisible;
}

function buttonClickHandler(event) {
    const content = event
    if (content == "-") {
        inputField.value = inputField.value.slice(0, -1);
    } else if (content == "+") {
        // Execução de envio da mensagem
    } else {
        console.log(content)
        inputField.value += content;
    }
    if (document.title == "Tela Inicial | CodeCipherChat") {
        reimantChar()
    }
}

function reimantChar() {
    const remainingChars = 100 - postInput.value.length;
    charCount.textContent = remainingChars;
    if (remainingChars < 0) {
        postInput.value = postInput.value.substring(0, 100);
        charCount.textContent = 0;
    }
};

function backToHomePage(){
    // Aguarde 1000 milissegundos (1 segundo) antes de redirecionar
    setTimeout(function () {
        window.location.replace("./homePage.html");
      }, 1000);
}

