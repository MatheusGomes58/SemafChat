//Configuracoes de projeto firebase
var firebaseConfig = {
  apiKey: "AIzaSyBZPI36XYbRpAB_qJoOOIgp9fHD1v5t9DI",
  authDomain: "semafchat-60cd1.firebaseapp.com",
  projectId: "semafchat-60cd1",
  storageBucket: "semafchat-60cd1.appspot.com",
  messagingSenderId: "214897507551",
  appId: "1:214897507551:web:80c04808f956e55f81bd6a",
  measurementId: "G-YDXN20NC3H"
};

// inicializa a instancia do firebase
firebase.initializeApp(firebaseConfig)


//funcao leitura da tela de login
function login(){
    //variaveis do tipo string armazenam o vamor obtido pelo usuario
    const email = document.getElementById('login').value
    const senha = document.getElementById('password').value

    //busca na biblioteca do firebase a funcao login
    firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(() => {
      //se o login for efetuado ira fazer estas acoes
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        //depois de exibir a notificacao do tipo sweet alerta abra a tela inicial
        .then(() => {
          setTimeout(() => {
            window.location.replace("TelaInicial.html")
          }, 1000)
        })
    })
    // se houver erro
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        //se o erro for senha errada
        case "auth/wrong-password":
          swal.fire({
            icon: "error",
            title: "Senha inválida",
          })
          break
        //se o erro for email errado
        case "auth/invalid-email":
          swal.fire({
            icon: "error",
            title: "E-mail inválido",
          })
          break
        //se o erro for usuario nao encontrado
        case "auth/user-not-found":
          swal
            .fire({
              icon: "warning",
              title: "Usuário não encontrado",
            })
          break
        //se o erro for outro qualquer
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}

$(function(){
  $(".heading-compose").click(function() {
    $(".side-two").css({
      "left": "0"
    });
  });

  $(".newMessage-back").click(function() {
    $(".side-two").css({
      "left": "-100%"
    });
  });
})