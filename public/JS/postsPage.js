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
        while (listaDePosts.length) {
            listaDePosts.pop();
        }
        const currentDate = now.getTime();

        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();

            const postObj = {
                userPost: post.userPost,
                emailPost: post.emailPost,
                postText: post.postText,
                userKeyboardPost: post.userKeyboardPost,
                timeOfPost: post.timeOfPost,
                dateOfPost: post.dateOfPost
            };

            listaDePosts.push(postObj);
        });

        // Chame renderPosts após a atualização em tempo real
        renderPosts(listaDePosts);
    });
}

function renderPosts(postList) {
    postList = postList.reverse(); // Invertendo a ordem dos posts
    postList.forEach(post => {
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
            <div class="user-info"onclick="generateChatEmail('${emailPost}','${userPost}')">${userPost}</div>
            <p>${processedPostText}</p>
            <div class="post-info">
                <div class="time">${dateOfPost} ${timeOfPost}</div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    // Após renderizar os posts, você pode redefinir a entrada e contador de caracteres, se necessário.
    postInput.value = "";
    charCount.textContent = 100;
}

postButton.addEventListener("click", () => {
    const postsRef = firebase.database().ref("posts");
    const post = postInput.value;
    var timeOfMessenger = "" + now.getHours().toString() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString());
    var currentDate = (now.getDay() < 10 ? "0" + now.getDay().toString() : now.getDay().toString()) + "/" + (now.getMonth() < 10 ? "0" + now.getMonth().toString() : now.getMonth().toString()) + "/" + now.getFullYear();

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
});


function generateChatEmail(emailFriend, nameFriend) {
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