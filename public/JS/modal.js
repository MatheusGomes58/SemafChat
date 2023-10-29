function openCreateChatModal() {
    const modal = document.getElementById("createChatModal");
    modal.style.display = "block";
}

function openUpdateUserModal() {
    const modal = document.getElementById("updateUserModal");
    modal.style.display = "block";
    document.getElementById("chatEmailUpdate").value = email
    document.getElementById("userNameUpdate").value = userData
    if (userKeyboardData) {
        document.getElementById("userKeyboard").value = userKeyboardData
    } else {
        document.getElementById("userKeyboard").value = "databaseKeyboardNormal"
    }
    if (userRandonKeys) {
        document.getElementById("trueRandonKeys").checked = userRandonKeys
    }
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
                if (member == email) {
                    newUserField.hidden = true;
                    newUserField.readOnly = true;
                }
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
    document.getElementById("labelFromNewChat").style.display = "flex";
    document.getElementById("buttonFromADDUser").style.display = "flex";
}

function closeUpdateChatModal() {
    const modal = document.getElementById("updateChatModal");
    modal.style.display = "none";
}

function closeUpdateUserModal() {
    const modal = document.getElementById("updateUserModal");
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

    if (!chatName.trim() || !users.some(user => user.trim() !== "" && user !== email.trim())) {
        alert("Dados Inválidos: Por favor, insira pelo menos um usuário diferente do seu próprio email e que não seja vazio, e um nome para sua sala de bate-papo.");
        return;
    }


    // Salve o chat no Firestore
    db.collection("chats").add({
        chat: chatName,
        user: users,
    })
        .then(function (docRef) {
            alert("Chat criado com sucesso")
            closeCreateChatModal();
            searchChats();
        })
        .catch(function (error) {
            alert("Erro ao criar chat")
            searchChats();
        });
}

function updateChatUsers() {
    const chatName = document.getElementById("chatNameUpdate").value;
    const userInputs = document.querySelectorAll("#userFieldsUpdate input[name='user']");
    const users = Array.from(userInputs).map(input => input.value.trim().toLowerCase());

    if (!chatName.trim() || !users.some(user => user.trim() !== "" && user !== email.trim())) {
        alert("Por favor, insira pelo menos um usuário diferente do seu próprio email e que não seja vazio.")
        return;
    }

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
            alert("A lista de usuários do chat foi atualizada.")
            closeUpdateChatModal();
        })
        .catch(error => {
            console.error("Erro ao atualizar lista de usuários:", error);
        }); searchChats();
}

function deleteChat() {
    const chatName = document.getElementById("chatNameUpdate").value;
    if (confirm(`Tem certeza de que você deseja relmente sair do chat "${chatName}"?`)) {
        // Continue com a remoção do usuário do chat
        db.collection("chats").where("chat", "==", chatName)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    // Vamos assumir que só há um chat correspondente, então pegamos o primeiro
                    const chatDoc = querySnapshot.docs[0];
    
                    // Verifique se a propriedade "users" existe no documento do chat
                    if (chatDoc.exists && chatDoc.data().user) {
                        // Atualize o array de usuários do chat para remover o email
                        const users = chatDoc.data().user;
                        const updatedUsers = users.filter(user => user !== email);
    
                        if (updatedUsers.length === 1) {
                            // Se houver apenas um usuário, atualize para uma lista vazia
                            return chatDoc.ref.update({ user: [] });
                        }
                        else {
                            // Caso contrário, atualize para a lista filtrada
                            return chatDoc.ref.update({ user: updatedUsers });
                        }
                    }
                    else {
                        throw new Error("Estrutura de dados do chat inválida ou propriedade 'user' não encontrada");
                    }
                } else {
                    throw a Error("Chat não encontrado no Firestore");
                }
            })
            .then(() => {
                alert("Você saiu do chat com sucesso! Os dados do chat foram deletados do seu usuário.");
                searchChats();
                closeUpdateChatModal();
            })
            .catch(error => {
                alert("Erro ao remover usuário do chat!\n" + error);
            });
        searchChats();
    }   

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

var trueRadio = document.getElementById("trueRandonKeys");
var falseRadio = document.getElementById("falseRandonKeys");

// Adiciona um evento de mudança (change) ao rádio "Sim"
trueRadio.addEventListener("change", function () {
    // Se "Sim" for selecionado, desabilite o rádio "Não"
    falseRadio.checked = false;
});

// Adiciona um evento de mudança (change) ao rádio "Não"
falseRadio.addEventListener("change", function () {
    // Se "Não" for selecionado, desabilite o rádio "Sim"
    trueRadio.checked = false;
});




