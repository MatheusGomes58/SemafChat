function createMenssager(text, user, hour) {
    if (user == userData) {
        const chatContainer = document.querySelector('.chat-messages');
        const chatBubble = document.createElement('div');
        chatBubble.className = 'chat-bubble me';

        const messageInfo = document.createElement('div');
        messageInfo.className = 'message-info';
        const username = document.createElement('span');
        username.className = 'username';
        username.textContent = 'Você:';
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = hour;

        const messageTextElement = document.createElement('div');
        messageTextElement.className = 'message-text';
        messageTextElement.textContent = text;
    
        messageInfo.appendChild(username);
        messageInfo.appendChild(timestamp);
    
        chatBubble.appendChild(messageInfo);
        chatBubble.appendChild(messageTextElement);
    
        chatContainer.appendChild(chatBubble);
    }else{
        const chatContainer = document.querySelector('.chat-messages');
        const chatBubble = document.createElement('div');
        chatBubble.className = 'chat-bubble you';

        const messageInfo = document.createElement('div');
        messageInfo.className = 'message-info';
        const username = document.createElement('span');
        username.className = 'username';
        username.textContent = user;
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = hour;

        const messageTextElement = document.createElement('div');
        messageTextElement.className = 'message-text';
        messageTextElement.textContent = text;
    
        messageInfo.appendChild(username);
        messageInfo.appendChild(timestamp);
    
        chatBubble.appendChild(messageInfo);
        chatBubble.appendChild(messageTextElement);
    
        chatContainer.appendChild(chatBubble);
    }

}
