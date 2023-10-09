
const messageInput = document.getElementById("insertMessenger");
const chatMessages = document.querySelector(".chat-messages");
const now = new Date();


// Função para enviar uma mensagem para o Firebase
function enviarMensagem() {
    const messagesRef = firebase.database().ref("mensagens/" + userChat);
    
    const mensagem = messageInput.value;
    var timeOfMessenger = "" + now.getHours() + ":" + now.getMinutes()

    if (mensagem !== '') {
        // Crie um objeto com a mensagem e a data atual
        const novaMensagem = {
            mensagem: mensagem,
            user: userData,
            timestamp: timeOfMessenger
        };

        // Envie a mensagem para o Realtime Database
        const mensagemRef = messagesRef.push();
        mensagemRef.set(novaMensagem);

        // Recupere o ID da mensagem recém-enviada
        const mensagemID = mensagemRef.key;

        // Atualize o Firestore com o ID da última mensagem enviada
        const query = db.collection('chats').where("chat", "==", userChat);

        query.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const chatID = doc.id;
                    const chatRef = db.collection('chats').doc(chatID); // Substitua 'seu_chat_id' pelo ID do seu chat
                    chatRef.update({
                        lastMensagem: mensagemID
                    });
                });
            })
            .catch((error) => {
                console.error("Erro ao consultar o Firestore: ", error);
            });
        // Limpe o campo de mensagem
        messageInput.value = '';
    }
}


// Função para exibir mensagens em tempo real
function exibirMensagens() {
    userChat = localStorage.getItem("userChat")
    const messagesRef = firebase.database().ref("mensagens/" + userChat);
    
    messagesRef.on('child_added', (snapshot) => {
        const mensagem = snapshot.val();
        createMenssager(mensagem.mensagem, mensagem.user, mensagem.timestamp);
    });
}

