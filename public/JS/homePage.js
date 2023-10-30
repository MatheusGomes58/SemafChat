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
      alert("Erro ao buscar chats do usuário:\n" + error);
    })
}

function findUltimateMessanger(chat, chatId, lastMessageID) {
  if (!lastMessageID) {
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
              lastMessageTime: mensagem.timestamp,
              userKeyboardData: mensagem.userKeyboardData,
              user: mensagem.user
            });
          });
        }
        renderChats(chatsData);
      })
      .catch((error) => {
        alert("Erro ao buscar a última mensagem:\n" + error);
        chatsData.push({
          name: chat,
          uid: chatId
        });
        renderChats(chatsData);
      });

  }
}


// Função para executar a pesquisa de usuário
function search() {
  var page = document.querySelector(".active")
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (page.innerHTML == "Conversas") {
    if (searchTerm !== "") {
      const filteredChats = chatsData.filter(chat => {
        return chat.name.includes(searchTerm);
      });
      renderChats(filteredChats);
    } else {
      renderChats(chatsData);
    }
  } else if (page.innerHTML == "Atualizações") {
    postsContainer.innerHTML = "";
    if (searchTerm !== "") {
      const filteredPost = listaDePosts.filter(post => {
        return post.userPost.includes(searchTerm) || post.postText.includes(searchTerm);
      });
      renderPosts(filteredPost);
    } else {
      renderPosts(listaDePosts);
    }
  }

}


// Adiciona um evento de clique ao botão "Criar Novo Chat"
const createChatButton = document.getElementById("createChatButton");
createChatButton.addEventListener("click", openCreateChatModal);

// Adiciona um evento de clique ao botão "Buscar"
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);

// Adiciona um evento de clique ao botão "Criar editar usuário"
const updateUserModalButton = document.getElementById("settingsButton");
updateUserModalButton.addEventListener("click", openUpdateUserModal);


// Exemplo de array de chats
const chatsData = [];

function openWordUndefined() {
  window.location.href = "wordUndefined.html";
}

function openGameMemory() {
  window.location.href = "gameMemory.html";
}

function openWordRandon() {
  window.location.href = "wordRandon.html";
}

