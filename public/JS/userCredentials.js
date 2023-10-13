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
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }

  email = document.getElementById("email").value.toLowerCase()
  password = document.getElementById("password").value

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("./homePage.html")
          }, 1000)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/wrong-password":
          swal.fire({
            icon: "error",
            title: "Senha inválida",
          })
          break
        case "auth/invalid-email":
          swal.fire({
            icon: "error",
            title: "E-mail inválido",
          })
          break
        case "auth/user-not-found":
          swal
            .fire({
              icon: "warning",
              title: "Usuário não encontrado",
            })
          break
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}

function logout() {
  firebase.auth().signOut()
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
        swal
          .fire({
            icon: "success",
            title: "Redirecionando para a tela de autenticação",
          })
          .then(() => {
            setTimeout(() => {
              window.location.replace("./index.html")
            }, 1000)
          })
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
    }if(document.title == "Jogo da Memória | CodeCipherChat"){
      createGame(8)
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

  // Verifique se todos os campos estão preenchidos
  if (!emailInput.value || !userDataInput.value || !userKeyboardDataInput.value) {
    console.error("Por favor, preencha todos os campos.");
    return;
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
      closeUpdateUserModal()
      getUserInfo()
      searchChats()
    })
    .catch((error) => {
      console.error("Erro ao atualizar os dados do usuário:", error);
    });
}
