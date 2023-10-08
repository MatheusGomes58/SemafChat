
const messageInput = document.getElementById("insertMessenger");
const chatMessages = document.querySelector(".chat-messages");
// Referência para o nó "mensagens" no Realtime Database
const messagesRef = firebase.database().ref('mensagens');

// Função para enviar uma mensagem para o Firebase
function enviarMensagem() {
    const mensagem = messageInput.value;

    if (mensagem !== '') {
        // Crie um objeto com a mensagem e a data atual
        const novaMensagem = {
            mensagem: mensagem,
            timestamp: new Date().getTime(),
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
        const mensagemElement = document.createElement('div');
        mensagemElement.innerText = `${mensagem.mensagem}`;
        chatMessages.appendChild(mensagemElement);
    });
}

// Chame a função para exibir mensagens em tempo real
exibirMensagens();
