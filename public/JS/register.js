var customerName = ""
var customerEmail = ""
var CustomerPassword = ""

async function addUser() {
  await db.collection('users').add({
    user: customerEmail,
    customerName: customerName,
    type: "user"
  })
  readUsers()
}

async function readUsers() {
  users = []
  const logUsers = await db.collection("users").get()
  for (doc of logUsers.docs) {
    users.push({
      id: doc.data().id,
      user: doc.data().user,
    })
  }
}

function UserPassword() {
  customerName = document.getElementById("namec").value
  customerEmail = document.getElementById("emailc").value.toLowerCase()
  CustomerPassword = document.getElementById("passwordc").value

  if (customerEmail !== "") {
    addUser()
    firebase.auth().signInWithEmailAndPassword(customerEmail, CustomerPassword).then(() => {
      alert("Usuário já cadastrado.");

      // Aguarda 1000 milissegundos (1 segundo) antes de redirecionar
      setTimeout(function () {
        window.location.replace("./index.html");
      }, 1000);

    }).catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/user-not-found":
          var userNotFound = confirm("Usuário não encontrado. Deseja criar esse usuário?");

          if (userNotFound) {
            signUp();
          }

          break
        default:
          alert(error.message)
      }
    })
  } else {
    alert("Por favor insira um email")
  }
}

function signUp() {
  firebase.auth().createUserWithEmailAndPassword(customerEmail, CustomerPassword)
    .then((userCredential) => {
      const user = userCredential.user;

      // Enviar email de verificação
      user.sendEmailVerification()
        .then(() => {
          alert("Usuário foi criado com sucesso. Verifique seu email para ativar sua conta.");

          // Aguarde 1000 milissegundos (1 segundo) antes de redirecionar
          setTimeout(function () {
            window.location.replace("./index.html");
          }, 1000);

        })
        .catch((error) => {
          alert("Erro ao enviar o email de verificação:\n" + error.message);

        });
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/weak-CustomerPassword":
          alert("Senha muito fraca");
          break;
        default:
          alert(error.message);
      }
    });
}
