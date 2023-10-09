// Função para renderizar chats
function renderChats(chats) {
    const chatList = document.getElementById("chatList");

    // Limpar a lista de chats existente
    chatList.innerHTML = '';

    chats.forEach((chat) => {
        const chatItem = document.createElement("li");
        chatItem.classList.add("chat-item");

        chatItem.addEventListener("click", () => {
            // Capturar o nome do chat após o clique
            userChat = chat.name;

            // Salvar o nome do chat no localStorage
            localStorage.setItem("userChat", userChat);

            // Adicionar um atraso de meio segundo (500ms) antes de executar a ação
            setTimeout(() => {
                // Redirecionar para a página "chatPage.html" após o atraso
                window.location.href = "chatPage.html";
            }, 1000); // 500 milissegundos (meio segundo)
        });


        const chatDetails = document.createElement("div");
        chatDetails.classList.add("chat-details");

        const chatName = document.createElement("h3");
        chatName.textContent = chat.name;

        const lastMessage = document.createElement("p");
        lastMessage.textContent = chat.lastMessage;

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
