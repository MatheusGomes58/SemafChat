// Função para renderizar chats
function renderChats(chats) {
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";

    chats.forEach((chat) => {
        const chatItem = document.createElement("li");
        chatItem.classList.add("chat-item");

        // Adicionar evento de clique ao chatItem
        chatItem.addEventListener("click", () => {
            // Capturar o nome do chat após o clique
            userChat = chat.uid;
            localStorage.setItem("userChat", chat.uid);

            // Redirecionar para a página "chatPage.html"
            window.location.href = "chatPage.html";
        });

        let longPressTimer;

        // Adicionar evento de pressionar e segurar (long press) ao chatItem
        chatItem.addEventListener("mousedown", () => {
            longPressTimer = setTimeout(() => {
                openUpdateChatModal(chat.name)
            }, 2000);
        });


        // Cancelar o timer de long press se o usuário soltar o mouse antes de 4 segundos
        chatItem.addEventListener("mouseup", () => {
            clearTimeout(longPressTimer);
        });

        // Adicionar evento de pressionar e segurar (long press) ao chatItem em dispositivos móveis
        chatItem.addEventListener("touchstart", (e) => {
            longPressTimer = setTimeout(() => {
                openUpdateChatModal(chat.name);
            }, 2000);
        });

        // Limpar o temporizador se o toque for liberado antes do long press
        chatItem.addEventListener("touchend", () => {
            clearTimeout(longPressTimer);
        });

        const chatDetails = document.createElement("div");
        chatDetails.classList.add("chat-details");

        const chatName = document.createElement("h3");
        chatName.textContent = chat.name;

        console.log(chat.userKeyboardData)

        var typeOfKeyboardUser = ""
        switch (chat.userKeyboardData) {
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
            default:
                typeOfKeyboardUser = databaseKeyboardNormal;
                break;
        }
        const lastMessage = document.createElement("div");
        if (chat.lastMessage) {
            for (let i = 0; i < chat.lastMessage.length; i++) {
                const character = chat.lastMessage[i];
                if (letterToImage.hasOwnProperty(character)) {
                    const imageElement = document.createElement('img');
                    imageElement.src = typeOfKeyboardUser + letterToImage[character];
                    imageElement.classList.add('sizeOfImage');

                    // Verificar se o caractere é numérico
                    if (!isNaN(character) && character.trim() !== "") {
                        // Adicione uma classe CSS diferente para caracteres numéricos
                        imageElement.classList.add('number');
                    }

                    lastMessage.classList.add('resizeMensager');
                    lastMessage.appendChild(imageElement);
                }
            }
        }

        const chatMenssager = document.createElement("p");
        if(chat.user){
            chatMenssager.innerHTML = chat.user + " : " + lastMessage.innerHTML;
        }

        chatDetails.appendChild(chatName);
        chatDetails.appendChild(chatMenssager);

        const chatInfo = document.createElement("div");
        chatInfo.classList.add("chat-info");

        const messageTime = document.createElement("span");
        messageTime.classList.add("message-time");
        messageTime.textContent = chat.lastMessageTime;

        chatInfo.appendChild(messageTime);

        chatItem.appendChild(chatDetails);
        chatItem.appendChild(chatInfo);

        chatList.appendChild(chatItem);
    });
}



