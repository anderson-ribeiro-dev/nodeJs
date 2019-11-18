// /**
//  * 0-obter o usuário
//  * 1-obter o numero de telefone de um usuário a partir do seu id
//  * 2-obter enderenço do usuário pelo id
//  */


 //callback, 1-erro, 2-sucesso
 function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
 }

 function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1111111111111',
            ddd: 11
        })
    }, 2000);
 }

 function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
 }

 function resolverUsuario(erro, usuario) {
     console.log('usuario', usuario)
 }

 //callback
obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false 
    if(error) {
        console.error('Deu ruim em usuário', error)
        return;
    } 
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em telefone', error1)
            return;
        } 
        obterEndereco(usuario.id, function resolverEndereco(error2, enderenco) {
            if(error2) {
                console.error('Deu ruim em telefone', error2)
                return;
            } 
            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${enderenco.rua}, ${enderenco.rua}
                Telefone: (${telefone.ddd}) - ${telefone.telefone}
            `)
        })
    })

})

// process.exit();
// const telefone = obterTelefone(usuario.id)
// const dataNascimento = obterUsuario()

// console.log('telenofe', telefone)