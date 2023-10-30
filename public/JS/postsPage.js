const postInput = document.getElementById("insertKeys");
const postButton = document.getElementById("send-button");
const charCount = document.getElementById("char-count");
const postsContainer = document.getElementById("posts");
const keyboardButtons = document.querySelectorAll("button");
const now = new Date();
const listaDePosts = [];

function exibirPosts() {
    const postsRef = firebase.database().ref("posts");

    postsRef.on('value', (snapshot) => {
        postsContainer.innerHTML = "";
        listaDePosts.length = 0; // Limpe a lista de posts de uma maneira mais eficiente
        const currentDate = now.getTime();

        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();

            const postObj = { ...post }; // Copie os valores do post para um novo objeto

            listaDePosts.push(postObj);
        });

        // Chame renderPosts após a atualização em tempo real
        renderPosts(listaDePosts);
    });
}

function renderPosts(postList) {
    postList = postList.reverse(); // Invertendo a ordem dos posts
    postsContainer.innerHTML = postList.map(post => {
        const { userPost, emailPost, postText, userKeyboardPost, timeOfPost, dateOfPost } = post;
        const postElement = document.createElement("div");

        let processedPostText = '';
        var keyboardOfPost = "";

        switch (userKeyboardPost) {
            case "databaseKeyboardBraile":
                keyboardOfPost = databaseKeyboardBraile;
                break;
            case "databaseKeyboardSemaforico":
                keyboardOfPost = databaseKeyboardSemaforico;
                break;
            case "databaseKeyboardNormal":
                keyboardOfPost = databaseKeyboardNormal;
                break;
            case "databaseKeyboardLibras":
                keyboardOfPost = databaseKeyboardLibras;
                break;
            case "databaseKeyboardMorse":
                keyboardOfPost = databaseKeyboardMorse;
                break;
            default:
                keyboardOfPost = databaseKeyboardNormal;
                break;
        }

        for (let i = 0; i < postText.length; i++) {
            const character = postText[i];
            if (letterToImage.hasOwnProperty(character)) {
                const imageElement = document.createElement('img');
                imageElement.src = keyboardOfPost + letterToImage[character];
                imageElement.classList.add('sizeOfImage');

                if (!isNaN(character) && character.trim() !== "") {
                    imageElement.classList.add('number');
                }

                processedPostText += imageElement.outerHTML;
            } else {
                processedPostText += character;
            }
        }

        postElement.className = "post";
        postElement.innerHTML = `
            <div class="user-info" onclick="generateChatEmail('${emailPost}','${userPost}')">${userPost}</div>
            <p>${processedPostText}</p>
            <div class="post-info">
                <div class="time">${dateOfPost} ${timeOfPost}</div>
            </div>
        `;
        return postElement.outerHTML;
    }).join('');

    // Após renderizar os posts, você pode redefinir a entrada e contador de caracteres, se necessário.
    postInput.value = "";
    charCount.textContent = 100;
}

function publicar() {
    const postsRef = firebase.database().ref("posts");
    const post = postInput.value;
    var dayOfMonth = now.getDate();
    var currentDay = dayOfMonth <= 9 ? "0" + dayOfMonth : dayOfMonth.toString();
    var timeOfMessenger = "" + now.getHours().toString() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString());
    var currentDate = currentDay + "/" + (now.getMonth() < 10 ? "0" + now.getMonth().toString() : now.getMonth().toString()) + "/" + now.getFullYear();

    if (post !== '') {
        postsRef.orderByChild("emailPost").equalTo(email).once("value", (snapshot) => {
            let existingPostKey = null;

            snapshot.forEach((childSnapshot) => {
                const post = childSnapshot.val();
                if (post.dateOfPost === currentDate) {
                    existingPostKey = childSnapshot.key;
                }
            });

            // Se o usuário já fez um post hoje, atualize o post existente
            if (existingPostKey) {
                const postRef = postsRef.child(existingPostKey);
                postRef.update({
                    userPost: userData,
                    dateOfPost: currentDate,
                    emailPost: email,
                    userKeyboardPost: userKeyboardData,
                    timeOfPost: timeOfMessenger,
                    postText: post
                });
            } else {
                const newPost = {
                    userPost: userData,
                    dateOfPost: currentDate,
                    emailPost: email,
                    userKeyboardPost: userKeyboardData,
                    timeOfPost: timeOfMessenger,
                    postText: post
                };

                // Envie a mensagem para o Realtime Database
                const postRef = postsRef.push();
                postRef.set(newPost);
            }
        });
    }
}

function generateChatEmail(emailFriend, nameFriend) {
    document.getElementById("closeAplication").style.display = "none";
    const modal = document.getElementById("createChatModal");
    const chatNameInput = document.getElementById("chatName");
    document.getElementById("userFields").innerHTML = "";
    document.getElementById("labelFromNewChat").style.display = "none";
    document.getElementById("buttonFromADDUser").style.display = "none";
    chatNameInput.value = "Chat do " + userData + " e do " + nameFriend;

    const userFieldsDiv = document.getElementById("userFieldsUpdate");
    const newUserField = document.createElement("input");
    newUserField.type = "text";
    newUserField.placeholder = "Email do usuário";
    newUserField.name = "user";
    newUserField.value = emailFriend;
    newUserField.hidden = true;
    userFieldsDiv.appendChild(newUserField);

    // Exibir o modal
    modal.style.display = "block";
}
