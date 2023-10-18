const messageInput = document.getElementById("insertKeys");
const chatMessages = document.querySelector(".chat-messages");
const now = new Date();


// Função para enviar uma mensagem para o Firebase
function enviarMensagem() {
    const messagesRef = firebase.database().ref("mensagens/" + userChat);
    
    const mensagem = messageInput.value;
    var timeOfMessenger = "" + now.getHours().toString()  + ":" + (now.getMinutes() < 10? "0" + now.getMinutes().toString() : now.getMinutes().toString());

    if (mensagem !== '') {
        // Crie um objeto com a mensagem e a data atual
        const novaMensagem = {
            mensagem: mensagem,
            user: userData,
            userKeyboardData: userKeyboardData,
            timestamp: timeOfMessenger
        };

        // Envie a mensagem para o Realtime Database
        const mensagemRef = messagesRef.push();
        mensagemRef.set(novaMensagem);

        // Recupere o ID da mensagem recém-enviada
        const mensagemID = mensagemRef.key;

        // Atualize o Firestore com o ID da última mensagem enviada
        const query = db.collection('chats').doc(userChat);
        query.update({
            lastMensagem: mensagemID
        });
        // Limpe o campo de mensagem
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
        
        // Após adicionar a mensagem, role para a parte inferior
        scrollChatToBottom();
    });
}

function scrollChatToBottom() {
    var chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}