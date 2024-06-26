let currentUser = {}

let email = "";
let password = "";
let userData = "";
let usersId = ";"
let userKeyboardData = "";
let userRandonKeys = "";
let userChat = "";
var typeOfKeyboard = "";

function login() {
  // Verificar se o usuário já está autenticado em outro dispositivo
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  // Use o Firebase Realtime Database ou Firestore para verificar o status de autenticação
  const authRef = firebase.database().ref('authenticated_users/' + email.replace(/[.#$\[\]]/g, ''));

  authRef.once('value').then((snapshot) => {
    if (snapshot.val() === true) {
      // O usuário já está autenticado em outro dispositivo
      alert("O usuário já está autenticado em outro lugar.");
    } else {
      // O usuário não está autenticado em outro lugar, continue com o processo de login
      // Realizar login com e-mail e senha
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Marque o usuário como autenticado no banco de dados
          authRef.set(true);

          // Verificar se o e-mail foi confirmado
          if (user.emailVerified) {
            // Usuário confirmou o e-mail, redirecione para a página principal
            alert("Login realizado com sucesso.");

            // Aguarde 1000 milissegundos (1 segundo) antes de redirecionar
            setTimeout(function () {
              window.location.replace("./homePage.html");
            }, 1000);

          } else {
            // E-mail não foi confirmado
            alert("E-mail não confirmado. Verifique sua caixa de entrada para o link de confirmação.");
            // Deslogar o usuário
            firebase.auth().signOut();
          }
        })
        .catch((error) => {
          // Trate os erros de autenticação aqui
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/wrong-password":
              alert("Usuário e Senha inválidos");
              break;
            case "auth/invalid-email":
              alert("E-mail inválido.");
              break;
            case "auth/user-not-found":
              alert("Usuário e Senha inválidos");
              break;
            default:
              alert(error.message);
          }
        });
    }
  });
}




function logout() {
  // Verificar se o usuário está autenticado
  const user = firebase.auth().currentUser;
  
  if (user) {
    const email = user.email;

    // Realizar o logout
    firebase.auth().signOut()
      .then(() => {
        // Remover o registro de autenticação no Firebase Realtime Database ou Firestore
        const db = firebase.database(); // Substitua pelo seu banco de dados real ou Firestore
        const authRef = firebase.database().ref('authenticated_users/' + email.replace(/[.#$\[\]]/g, ''));

        authRef.remove()
          .then(() => {
            alert("Logout realizado com sucesso.");
            // Redirecione para a página de login ou onde desejar
            window.location.replace("./login.html");
          })
          .catch((error) => {
            alert("Erro ao remover o registro de autenticação: " + error.message);
          });
      })
      .catch((error) => {
        alert("Erro ao fazer logout: " + error.message);
      });
  } else {
    alert("Nenhum usuário autenticado.");
  }
}


function getUser() {
  if (document.title != "Login | CodeCipherChat") {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser.uid = user.uid
        if (email != null) {
          email = user.email
          if (document.title == "Tela Inicial | CodeCipherChat") {
            searchChats();
            exibirPosts()
          }
        }
        getUserInfo()
      } else {
        alert("Redirecionando para a tela de autenticação.");

        // Aguarde 1000 milissegundos (1 segundo) antes de redirecionar
        setTimeout(function () {
          window.location.replace("./index.html");
        }, 1000);

      }
    })
  }
}

async function getUserInfo() {
  const logUsers = await db.collection("users").where("user", "==", email).get()
  if (!logUsers.docs.length == 0) {
    profile = true
    const usersData = logUsers.docs[0]
    usersId = usersData.id
    userData = usersData.data().customerName
    userKeyboardData = usersData.data().typeOfKeyboard
    userRandonKeys = usersData.data().userRandonKeys
    switch (userKeyboardData) {
      case "databaseKeyboardBraile":
        typeOfKeyboard = databaseKeyboardBraile;
        break;
      case "databaseKeyboardSemaforico":
        typeOfKeyboard = databaseKeyboardSemaforico;
        break;
      case "databaseKeyboardNormal":
        typeOfKeyboard = databaseKeyboardNormal;
        break;
      case "databaseKeyboardLibras":
        typeOfKeyboard = databaseKeyboardLibras;
        break;
      case "databaseKeyboardMorse":
        typeOfKeyboard = databaseKeyboardMorse;
        break;
      default:
        typeOfKeyboard = databaseKeyboardNormal;
        break;
    }
    if (document.title == "Bate-Papo | CodeCipherChat") {
      exibirMensagens()
    } if (document.title == "Advinhação de Palavras | CodeCipherChat") {
      renderKeyboard(false, false);
    } if (document.title == "Jogo da Memória | CodeCipherChat") {
      createGame(8)
    } if (document.title == "Anágramas | CodeCipherChat") {
      createGame()
      renderKeyboard(false, true);
    }
  }
}

window.onload = function () {
  getUser()
  if (typeof titulo != "undefined") {
    $('#config').hide();
    valida();
  }
}
function updateUser() {
  const userId = usersId;
  const emailInput = document.getElementById("chatEmailUpdate");
  const userDataInput = document.getElementById("userNameUpdate");
  const userKeyboardDataInput = document.getElementById("userKeyboard");
  const userRandonKeysCheckbox = document.getElementById("trueRandonKeys");
  const userRef = db.collection("users").doc(userId);

  if (!emailInput.value || !userDataInput.value || !userKeyboardDataInput.value) {
    alert("Por favor, preencha todos os campos.")
  }

  // Converta o email para letras minúsculas
  const email = emailInput.value.toLowerCase();

  // Construa um objeto com os dados do usuário a serem atualizados
  const updatedUserData = {
    email: email,
    customerName: userDataInput.value,
    type: "user",
    typeOfKeyboard: userKeyboardDataInput.value || "databaseKeyboardNormal",
    userRandonKeys: userRandonKeysCheckbox.checked || false
  };

  // Atualize os dados do usuário no Firestore
  userRef.update(updatedUserData)
    .then(() => {
      getUserInfo()
      searchChats()
      closeUpdateUserModal()
      alert("Dados do usuário atualizado com sucesso.")
    })
    .catch((error) => {
      alert("Erro ao atualizar os dados do usuário")
    });
}
