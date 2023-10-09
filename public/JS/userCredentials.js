let currentUser = {}
  
let email = "";
let password = "";
let userData = "";
let userKeyboardData = "";
let userRandonKeys = "";
let userChat = "";

function login() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }

  email = document.getElementById("email").value
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
  if(document.title != "Login | DesbravaChat"){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser.uid = user.uid
        if(email != null){email = user.email}
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
    userData = usersData.data().customerName
    if(document.title == "Bate-Papo | DesbravaChat"){
      exibirMensagens()
      userKeyboardData = usersData.data().typeOfKeyboard
      userRandonKeys = usersData.data().userRandonKeys
      randonKeys()
    }else if (document.title == "Tela Inicial | DesbravaChat"){
      searchChats();
    }
  }
}

window.onload = function () {
  getUser()
  console.log(document.title)
  if(typeof titulo != "undefined")
  {
    $('#config').hide();
    valida();
  }
}