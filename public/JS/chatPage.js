document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.querySelector(".chat-messages");

    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const senderDiv = document.createElement("div");
            senderDiv.classList.add("message-sender");
            senderDiv.textContent = "You";

            const textDiv = document.createElement("div");
            textDiv.classList.add("message-text");
            textDiv.textContent = messageText;

            messageDiv.appendChild(senderDiv);
            messageDiv.appendChild(textDiv);

            chatMessages.appendChild(messageDiv);

            messageInput.value = "";
            messageInput.focus();

            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Simulate receiving a message
    setTimeout(function () {
        const receivedMessageDiv = document.createElement("div");
        receivedMessageDiv.classList.add("message");

        const senderDiv = document.createElement("div");
        senderDiv.classList.add("message-sender");
        senderDiv.textContent = "John";

        const textDiv = document.createElement("div");
        textDiv.classList.add("message-text");
        textDiv.textContent = "I'm good, thanks!";

        receivedMessageDiv.appendChild(senderDiv);
        receivedMessageDiv.appendChild(textDiv);

        chatMessages.appendChild(receivedMessageDiv);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
});
