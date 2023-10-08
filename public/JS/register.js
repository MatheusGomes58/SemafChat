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
    for (doc of logUsers.docs){
        users.push({
            id: doc.data().id,
            user: doc.data().user,
        })
    }
}

function UserPassword() {
    customerName = document.getElementById("namec").value
    customerEmail = document.getElementById("emailc").value
    CustomerPassword = document.getElementById("passwordc").value

    if(customerEmail !== ""){
        firebase.auth().signInWithEmailAndPassword(customerEmail, CustomerPassword).then(() => {
            swal.fire({
                icon: "success",
                title: "Usuário já cadastrado",
            }).then(() => {
                addUser()
                setTimeout(() => {
                    window.location.replace("./index.html")
                }, 1000)
            })
        }).catch((error) => {
            const errorCode = error.code
            switch (errorCode) {
                case "auth/user-not-found":
                swal
                    .fire({
                    icon: "warning",
                    title: "Usuário não encontrado",
                    text: "Deseja criar esse usuário?",
                    showCancelButton: true,
                    cancelButtonText: "Não",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim",
                    confirmButtonColor: "#3085d6",
                    })
                    .then((result) => {
                    if (result.value) {
                        signUp()
                    }
                    })
                break
                default:
                swal.fire({
                    icon: "error",
                    title: error.message,
                })
            }
            })
    }else{
        swal.fire({
            icon: "error",
            title: "Por favor insira um email",
        })
    }
}

function signUp() {
    addUser(); 
    firebase.auth().createUserWithEmailAndPassword(customerEmail, CustomerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Enviar email de verificação
        user.sendEmailVerification()
          .then(() => {
            swal.fire({ 
              icon: "success", 
              title: "Usuário foi criado com sucesso. Verifique seu email para ativar sua conta." 
            }).then(() => {
              setTimeout(() => {
                window.location.replace("./index.html");
              }, 1000);
            });
          })
          .catch((error) => {
            swal.fire({
              icon: "error",
              title: "Erro ao enviar o email de verificação.",
              text: error.message
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/weak-CustomerPassword":
            swal.fire({
              icon: "error",
              title: "Senha muito fraca"
            });
            break;
          default:
            swal.fire({
              icon: "error",
              title: error.message
            });
        }
      });
  }
  