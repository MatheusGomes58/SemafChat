const chatsCollection = firebase.firestore().collection("chats");
const messagesRef = firebase.database();

function searchChats() {
  const chatList = document.getElementById("chatList"); // Substitua pelo ID do elemento onde você deseja renderizar a lista de chats
  chatsCollection
    .where("user", "array-contains", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        findUltimateMessanger(chatData.chat,chatData.lastMensagem)
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar chats do usuário:", error);
    });

}

function findUltimateMessanger(chat, lastMessageID) {
  if (!lastMessageID) {
    console.error("ID da última mensagem não fornecido.");
    chatsData.push({
      name: chat,
    });  
    renderChats(chatsData);
    return;
  }

  const chatMessagesRef = firebase.database().ref("mensagens/" + chat);

  chatMessagesRef
    .orderByKey()
    .equalTo(lastMessageID)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const mensagem = childSnapshot.val();
        chatsData.push({
          name: chat,
          lastMessage: mensagem.mensagem,
          lastMessageTime: mensagem.timestamp
        });
        renderChats(chatsData);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar a última mensagem:", error);
      chatsData.push({
        name: chat,
      });
      renderChats(chatsData);
    });
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


// Exemplo de array de chats
const chatsData = [];

