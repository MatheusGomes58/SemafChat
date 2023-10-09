
const messageInput = document.getElementById("insertMessenger");
const chatMessages = document.querySelector(".chat-messages");
// Referência para o nó "mensagens" no Realtime Database
const messagesRef = firebase.database().ref(userChat);
const now = new Date();


// Função para enviar uma mensagem para o Firebase
function enviarMensagem() {
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
        messagesRef.push().set(novaMensagem);

        // Limpe o campo de mensagem
        messageInput.value = '';
    }
}

// Função para exibir mensagens em tempo real
function exibirMensagens() {
    messagesRef.on('child_added', (snapshot) => {
        const mensagem = snapshot.val();
        createMenssager(mensagem.mensagem, mensagem.user, mensagem.timestamp);
    });
}

