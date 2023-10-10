const chatsCollection = firebase.firestore().collection("chats");
const messagesRef = firebase.database();

function searchChats() {
  while (chatsData.length) {
    chatsData.pop();
  }
  chatsCollection
    .where("user", "array-contains", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        findUltimateMessanger(chatData.chat, doc.id, chatData.lastMensagem)
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar chats do usuário:", error);
    });

}

function findUltimateMessanger(chat, chatId, lastMessageID) {
  if (!lastMessageID) {
    console.error("ID da última mensagem não fornecido.");
    chatsData.push({
      name: chat,
      uid: chatId
    });
    renderChats(chatsData);
    return;
  } else {
    const chatMessagesRef = firebase.database().ref("mensagens/" + chatId);
    chatMessagesRef
      .orderByKey()
      .equalTo(lastMessageID)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const mensagem = childSnapshot.val();
            chatsData.push({
              name: chat,
              uid: chatId,
              lastMessage: mensagem.mensagem,
              lastMessageTime: mensagem.timestamp
            });
          });
        }
        renderChats(chatsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar a última mensagem:", error);
        chatsData.push({
          name: chat,
          uid: chatId
        });
        renderChats(chatsData);
      });

  }
}


// Função para executar a pesquisa de usuário
function searchUsers() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim(); // Obtém o termo de pesquisa

  // Execute a lógica de pesquisa aqui (por exemplo, mostrar resultados em uma lista)
  if (searchTerm !== "") {
    alert(`Pesquisando por usuários com o termo: ${searchTerm}`);
  }
}

// Adiciona um evento de clique ao botão "Criar Novo Chat"
const createChatButton = document.getElementById("createChatButton");
createChatButton.addEventListener("click", openCreateChatModal);

// Adiciona um evento de clique ao botão "Buscar"
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchUsers);

// Adiciona um evento de clique ao botão "Criar editar usuário"
const updateUserModalButton = document.getElementById("settingsButton");
updateUserModalButton.addEventListener("click", openUpdateUserModal);


// Exemplo de array de chats
const chatsData = [];


// Captura todos os links dentro do menu
const menuLinks = document.querySelectorAll('nav ul li a');

// Adiciona um ouvinte de evento de clique a cada link
menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // Remove a classe "active" de todos os links
    menuLinks.forEach((menuLink) => {
      menuLink.classList.remove('active');
    });

    // Adiciona a classe "active" ao link clicado
    event.target.classList.add('active');
  });
});


