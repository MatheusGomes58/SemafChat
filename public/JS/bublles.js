function createMenssager(text, user, userKeyboardDataMensager, hour) {
    var sendedMensager = (user == userData) ? "me" : "you";
    var usuario = (user == userData) ? "você:" : user + ":";
    var typeOfKeyboardUser = databaseKeyboardNormal;

    switch (userKeyboardDataMensager) {
        case "databaseKeyboardBraile":
            typeOfKeyboardUser = databaseKeyboardBraile;
            break;
        case "databaseKeyboardSemaforico":
            typeOfKeyboardUser = databaseKeyboardSemaforico;
            break;
        case "databaseKeyboardNormal":
            typeOfKeyboardUser = databaseKeyboardNormal;
            break;
        case "databaseKeyboardLibras":
            typeOfKeyboardUser = databaseKeyboardLibras;
            break;
        case "databaseKeyboardMorse":
            typeOfKeyboardUser = databaseKeyboardMorse;
            break;
    }

    const chatContainer = document.querySelector('.chat-messages');
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble ' + sendedMensager;

    const messageInfo = document.createElement('div');
    messageInfo.className = 'message-info';

    const username = document.createElement('span');
    username.className = 'username';
    username.textContent = usuario;
    messageInfo.appendChild(username);

    const messageTextElement = document.createElement('div');
    messageTextElement.className = 'message-text';

    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        if (letterToImage.hasOwnProperty(character)) {
            const imageElement = document.createElement('img');
            imageElement.src = typeOfKeyboardUser + letterToImage[character];
            imageElement.classList.add('sizeOfImage');

            if (!isNaN(character) && character.trim() !== "") {
                imageElement.classList.add('number');
            }

            messageTextElement.appendChild(imageElement);
        }
    }

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = hour;

    chatBubble.appendChild(messageInfo);
    chatBubble.appendChild(messageTextElement);
    chatBubble.appendChild(timestamp);

    chatContainer.appendChild(chatBubble);
}
