let currentUser = {}
  
let email = "";
let password = "";

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
            window.location.replace("./indexPage.html")
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
  if(document.title != "Login | RECOWEBAPP"){
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
            window.location.replace("./login.html")
          }, 1000)
        })
      }
    })
  }
}

async function getUserInfo() {
  let userLabel = document.getElementById("useLabel")
  let userValue = document.getElementById("useValue")
  const logUsers = await db.collection("users").where("user", "==", email).get()
  if (!logUsers.docs.length == 0) {
    profile = true
    const userData = logUsers.docs[0]
    userLabel.innerHTML = userData.data().customerName
    userValue.innerHTML = userData.data().customerValue.toFixed(2)
    if(userData.data().type == "admin" && !document.title.includes("ADM")){
      window.location.replace("./indexPageADM.html")
    }else if(userData.data().type == "user" && document.title.includes("ADM")){
      window.location.replace("./indexPage.html")
    }
    if(document.title == "Histórico | RECOWEBAPP" || document.title == "Histórico ADM | RECOWEBAPP")
    {
      renderitems(userData.data().type)
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