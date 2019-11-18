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

//1 passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id) //medida-promise: 5007.600ms
        // const enderenco = await obterEnderecoAsync(usuario.id) //medida-promise: 5007.600ms

        //roda em segundo plano
        const resultado = await Promise.all([ //medida-promise: 3007.360ms
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        
        const enderenco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereco: ${enderenco.rua}, ${enderenco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.log('Deu Ruim', error)
    }
}
