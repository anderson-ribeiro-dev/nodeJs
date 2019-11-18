// /**
//  * 0-obter o usuário
//  * 1-obter o numero de telefone de um usuário a partir do seu id
//  * 2-obter enderenço do usuário pelo id
//  */
//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco) // converter para promise


function obterUsuario() {
    //erro -> reject(erro)
    //success -> resolve
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {

            // return reject(new Error('Deu ruim de verdade!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000);
    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1111111',
                ddd: 111
            })
        }, 2000);
    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise  = obterUsuario()
//sucess -> .then()
//erro -> .catch()
// usuario -> telefone -> telefone
usuarioPromise
    .then((usuario) => {
       return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }    
        })
    })
    .then(function (resultado) {
        const enderenco = obterEnderecoAsync(resultado.usuario.id)
        return enderenco.then(function resolverEndereco(enderenco) {
             return {
                 usuario: resultado.usuario,
                 telefone: resultado.telefone,
                 enderenco: enderenco
             }   
        })
    })
    .then((resultado) => {
       console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.enderenco.rua}, ${resultado.enderenco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch((error) => {
        console.error('Deu ruim', error)
    })
