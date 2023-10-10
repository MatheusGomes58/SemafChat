function openCreateChatModal() {
    const modal = document.getElementById("createChatModal");
    modal.style.display = "block";
}

function openUpdateChatModal(chatName) {
    const modal = document.getElementById("updateChatModal");
    const chatNameInput = document.getElementById("chatNameUpdate");
    document.getElementById("userFieldsUpdate").innerHTML = "";

    // Buscar os dados do chat no Firestore
    getChatData(chatName)
        .then(chatData => {
            chatNameInput.value = chatData.chat;

            for (const member of chatData.user) {
                const userFieldsDiv = document.getElementById("userFieldsUpdate");
                const newUserField = document.createElement("input");
                newUserField.type = "text";
                newUserField.placeholder = "Email do usuário";
                newUserField.name = "user";
                newUserField.value = member;
                userFieldsDiv.appendChild(newUserField);
            }

            // Exibir o modal
            modal.style.display = "block";
        })
        .catch(error => {
            console.error("Erro ao abrir modal:", error);
        });
}


function closeCreateChatModal() {
    const modal = document.getElementById("createChatModal");
    modal.style.display = "none";
}

function closeUpdateChatModal() {
    const modal = document.getElementById("updateChatModal");
    modal.style.display = "none";
}

function addUserField() {
    const userFieldsDiv = document.getElementById("userFields");
    const newUserField = document.createElement("input");
    newUserField.type = "text";
    newUserField.placeholder = "Email do usuário";
    newUserField.name = "user";
    userFieldsDiv.appendChild(newUserField);
}

function addUserUpdateField() {
    const userFieldsDiv = document.getElementById("userFieldsUpdate");
    const newUserField = document.createElement("input");
    newUserField.type = "text";
    newUserField.placeholder = "Email do usuário";
    newUserField.name = "user";
    userFieldsDiv.appendChild(newUserField);
}

function createChat() {
    const chatName = document.getElementById("chatName").value;
    const userInputs = document.querySelectorAll("#userFields input[name='user']");
    const users = Array.from(userInputs).map(input => input.value.trim().toLowerCase());
    users.push(email);

    // Supondo que você tenha uma variável 'chatName' para o nome do chat
    // e uma variável 'users' para a lista de usuários

    if (!chatName.trim() || !users.some(user => user !== email.trim())) {
        alert("Por favor, preencha o nome do chat e insira pelo menos um usuário diferente do seu próprio email.");
        return;
    }


    // Salve o chat no Firestore
    db.collection("chats").add({
        chat: chatName,
        user: users,
    })
        .then(function (docRef) {
            console.log("Chat criado com ID: ", docRef.id);
            closeCreateChatModal();
            searchChats();
        })
        .catch(function (error) {
            console.error("Erro ao criar chat: ", error);
        });
}

function updateChatUsers() {
    const chatName = document.getElementById("chatNameUpdate").value;
    const userInputs = document.querySelectorAll("#userFieldsUpdate input[name='user']");
    const users = Array.from(userInputs).map(input => input.value.trim().toLowerCase());

    // Primeiro, você precisa buscar o chat com base no chatName
    db.collection("chats").where("chat", "==", chatName)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                // Vamos assumir que só há um chat correspondente, então pegamos o primeiro
                const chatDoc = querySnapshot.docs[0];

                // Atualizamos a lista de usuários no documento do chat
                return chatDoc.ref.update({
                    user: users,
                });
            } else {
                throw new Error("Chat não encontrado no Firestore");
            }
        })
        .then(() => {
            closeUpdateChatModal();
        })
        .catch(error => {
            console.error("Erro ao atualizar lista de usuários:", error);
        });
}

function deleteChat() {
    const chatName = document.getElementById("chatNameUpdate").value;


    // Verifique com o usuário se ele realmente deseja deletar o chat
    const confirmDelete = window.confirm(`Tem certeza de que deseja excluir o chat "${chatName}"?`);

    if (!confirmDelete) {
        return; // O usuário cancelou a exclusão, saia da função
    }

    // Continue com a exclusão do chat
    db.collection("chats").where("chat", "==", chatName)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                // Vamos assumir que só há um chat correspondente, então pegamos o primeiro
                const chatDoc = querySnapshot.docs[0];

                // Excluímos o documento do chat
                return chatDoc.ref.delete();
            } else {
                throw new Error("Chat não encontrado no Firestore");
            }
        })
        .then(() => {
            closeUpdateChatModal();
            searchChats();
        })
        .catch(error => {
            console.error("Erro ao excluir chat:", error);
        });
}


function getChatData(chatName) {
    const db = firebase.firestore();
    const chatRef = db.collection("chats").where("chat", "==", chatName);

    return chatRef.get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return doc.data();
            } else {
                throw new Error("Chat não encontrado no Firestore");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados do chat:", error);
        });
}


