const { deepEqual, ok } = require('assert')
const database = require('./database')
// const { listar } = require('./database')//somente o listar


const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de maipulação de Heróis', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })
    
    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id) // [resultado] => desctructuring => pega a primeira posição do resultado [resultado, posicao2, posicao3] pega três posição
        // const posicaoUm = resultado[0]
        // ok(resultado, expected) -> primeiro parâmetro para ver se têm valor
        deepEqual(resultado, expected)// -> compara valores
    })

    it('deve cadastrar um herói, usando arquivos', async () => {
        // before(async () => {
        //     await  database.listar(DEFAULT_ITEM_CADASTRAR)
        // })
        // const expected = {
        //     ...DEFAULT_ITEM_CADASTRAR,
        //     id: 2,
        //     nome: 'Batman'
        // }
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)//pega id do primeiro, destructuring [atual]
        deepEqual(atual, expected)
    })

    it('deve  remover um heroi por id', async () => {
        // before(async () => {
        //     await  database.remover(DEFAULT_ITEM_CADASTRAR)
        // })
        const expected = true
        const resultado  = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })
})