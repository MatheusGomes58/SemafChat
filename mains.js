var firebaseConfig = {
  apiKey: "AIzaSyBZPI36XYbRpAB_qJoOOIgp9fHD1v5t9DI",
  authDomain: "semafchat-60cd1.firebaseapp.com",
  projectId: "semafchat-60cd1",
  storageBucket: "semafchat-60cd1.appspot.com",
  messagingSenderId: "214897507551",
  appId: "1:214897507551:web:80c04808f956e55f81bd6a",
  measurementId: "G-YDXN20NC3H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)



function login(){
    const email = document.getElementById('login').value
    const senha = document.getElementById('password').value

    firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(() => {
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("TelaInicial.html")
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