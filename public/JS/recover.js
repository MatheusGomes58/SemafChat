var customerEmail = ""

function enviarEmailRedefinicaoSenha(email) {
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
}

function changePassword() {
    customerEmail = document.getElementById("emailm").value;
    enviarEmailRedefinicaoSenha(customerEmail);
}
