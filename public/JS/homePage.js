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
      swal.fire({
        icon: "error",
        title: "Erro ao buscar chats do usuário",
        text: error
      })
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
              lastMessageTime: mensagem.timestamp
            });
          });
        }
        renderChats(chatsData);
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          title: "Erro ao buscar a última mensagem",
          text: error
        })
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


// Captura todos os links dentro do menu
const menuLinks = document.querySelectorAll('nav ul li a');

// Adiciona um ouvinte de evento de clique a cada link
menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // Remove a classe "active" de todos os links
    menuLinks.forEach((menuLink) => {
      menuLink.classList.remove('active');
    });
    searchChats();
    // Adiciona a classe "active" ao link clicado
    event.target.classList.add('active');
  });
});

function openWordUndefined() {
  window.location.href = "wordUndefined.html";
}

function openGameMemory() {
  window.location.href = "gameMemory.html";
}


