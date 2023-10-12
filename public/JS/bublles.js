function createMenssager(text, user, hour) {
    var sendedMensager = "";
    var usuario = "";
    if (user == userData) {
        sendedMensager = "me"
        usuario = "você:"
    } else {
        sendedMensager = "you"
        usuario = user + ":";
    }

    const chatContainer = document.querySelector('.chat-messages');

    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble ' + sendedMensager;

    const messageInfo = document.createElement('div');
    messageInfo.className = 'message-info';
    const username = document.createElement('span');
    username.className = 'username';
    username.textContent = usuario;

    const messageTextElement = document.createElement('div');
    messageTextElement.className = 'message-text';

    // Loop para criar elementos de imagem para cada caractere do texto
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        if (letterToImage.hasOwnProperty(character)) {
            const imageElement = document.createElement('img');
            imageElement.src = typeOfKeyboard + letterToImage[character];
            imageElement.classList.add('sizeOfImage');

            // Verificar se o caractere é numérico
            if (!isNaN(character) && character.trim() !== "") {
                // Adicione uma classe CSS diferente para caracteres numéricos
                imageElement.classList.add('number');
            }            

            messageTextElement.appendChild(imageElement);
        }
    }



    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = hour;

    messageInfo.appendChild(username);

    chatBubble.appendChild(messageInfo);
    chatBubble.appendChild(messageTextElement);
    chatBubble.appendChild(timestamp);

    chatContainer.appendChild(chatBubble);
}
