var customerEmail = ""

function enviarEmailRedefinicaoSenha(email) {
  firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
        swal.fire({ 
            icon: "success", 
            title: "Email de redefinição de senha enviado com sucesso." 
        }).then(() => {
            setTimeout(() => {
                window.location.replace("./index.html")
            }, 1000)
        })
    })
    .catch(function(error) {
        swal.fire({
            icon: "error",
            title: error.message
        })
    });
}

function changePassword(){
    customerEmail = document.getElementById("emailm").value;
    enviarEmailRedefinicaoSenha(customerEmail);
}
