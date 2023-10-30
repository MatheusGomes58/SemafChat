const messageInput = document.getElementById("insertKeys");
const chatMessages = document.querySelector(".chat-messages");
const now = new Date();

// Função para enviar uma mensagem para o Firebase
function enviarMensagem() {
    const messagesRef = firebase.database().ref("mensagens/" + userChat);
    
    const mensagem = messageInput.value;
    const timeOfMessenger = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    
    if (mensagem !== '') {
        const novaMensagem = {
            mensagem: mensagem,
            user: userData,
            userKeyboardData: userKeyboardData,
            timestamp: timeOfMessenger
        };

        const mensagemRef = messagesRef.push();
        mensagemRef.set(novaMensagem);

        const mensagemID = mensagemRef.key;

        // Atualize o Firestore com o ID da última mensagem enviada
        const query = db.collection('chats').doc(userChat);
        query.update({
            lastMensagem: mensagemID
        });

        messageInput.value = '';
    }
}

// Função para exibir mensagens em tempo real
function exibirMensagens() {
    userChat = localStorage.getItem("userChat");
    const messagesRef = firebase.database().ref("mensagens/" + userChat);
    
    messagesRef.on('child_added', (snapshot) => {
        const mensagem = snapshot.val();
        createMenssager(mensagem.mensagem, mensagem.user, mensagem.userKeyboardData, mensagem.timestamp);
        scrollChatToBottom();
    });
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


