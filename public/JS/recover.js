var customerEmail = ""

function enviarEmailRedefinicaoSenha(email) {
    var user = firebase.auth().currentUser;
    if (user.emailVerified) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                alert("Email de redefinição de senha enviado com sucesso.");
                // Aguarda 1000 milissegundos (1 segundo) antes de redirecionar
                setTimeout(function () {
                    window.location.replace("./index.html");
                }, 1000);
            })
            .catch(function (error) {
                alert(error.message);
            });
    } else {
        alert("Seu endereço de e-mail ainda não foi confirmado. Por favor, verifique seu e-mail e confirme-o antes de redefinir a senha.");
    }
}


function changePassword() {
    customerEmail = document.getElementById("emailm").value;
    enviarEmailRedefinicaoSenha(customerEmail);
}
