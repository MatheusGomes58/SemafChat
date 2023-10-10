// Função para renderizar chats
function renderChats(chats) {
    const chatList = document.getElementById("chatList");

    // Limpar a lista de chats existente
    document.getElementById("chatList").innerHTML = '';

    chats.forEach((chat) => {
        const chatItem = document.createElement("li");
        chatItem.classList.add("chat-item");

        // Adicionar evento de clique ao chatItem
        chatItem.addEventListener("click", () => {
            // Capturar o nome do chat após o clique
            userChat = chat.name;

            // Salvar o nome do chat no localStorage
            localStorage.setItem("userChat", userChat);

            // Redirecionar para a página "chatPage.html"
            window.location.href = "chatPage.html";
        });

        let longPressTimer;

        // Adicionar evento de pressionar e segurar (long press) ao chatItem
        chatItem.addEventListener("mousedown", () => {
            longPressTimer = setTimeout(() => {
                openUpdateChatModal(chat.name)
            }, 1000); 
        });

        // Cancelar o timer de long press se o usuário soltar o mouse antes de 4 segundos
        chatItem.addEventListener("mouseup", () => {
            clearTimeout(longPressTimer);
        });

        const chatDetails = document.createElement("div");
        chatDetails.classList.add("chat-details");

        const chatName = document.createElement("h3");
        chatName.textContent = chat.name;

        const lastMessage = document.createElement("p");
        if (chat.lastMessage) {
            for (let i = 0; i < chat.lastMessage.length; i++) {
                const character = chat.lastMessage[i];
                if (letterToImage.hasOwnProperty(character)) {
                    const imageElement = document.createElement('img');
                    imageElement.src = typeOfKeyboard + letterToImage[character];
                    imageElement.classList.add('sizeOfImage');

                    // Verificar se o caractere é numérico
                    if (!isNaN(character)) {
                        // Adicione uma classe CSS diferente para caracteres numéricos
                        imageElement.classList.add('number');
                    }

                    lastMessage.appendChild(imageElement);
                }
            }
        }

        chatDetails.appendChild(chatName);
        chatDetails.appendChild(lastMessage);

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


