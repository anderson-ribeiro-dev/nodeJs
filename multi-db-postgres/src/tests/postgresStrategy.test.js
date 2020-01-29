const assert = require('assert')
const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}


describe('Postgres Strategy', function () {
    this.timeout(Infinity) //espera conexão, para validar os dados
    this.beforeAll(async function () {
       await context.connect()
       await context.delete() //limpar base
       await context.create(MOCK_HEROI_ATUALIZAR) //cadastrar herois para atualizar
    })

    it('PostgresSql Connection', async () => {
        const result = await context.isConnected() //validar conexão
        assert.equal(result, true) //resultado, esperado
    })

    it('cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome }) //[result], [result, segundaPosicao] => primeira posição
        //pegar a primeira posição
        //const posicaoZero = result[0]
        //const [p1, p2] = ['posicao1', 'posicao2]

        delete result.id 
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    });

    it('atualizar', async () => {
       const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })   //[result] -. pega a primeira posição do array
       const novoItem = {
            ...MOCK_HEROI_ATUALIZAR, //espalhar objeto
            nome: "Mulher Maravilha" //altera a propriedade nome de mock_heroi_atualizar
       }

       const [result] = await context.update(itemAtualizar.id, novoItem)
       const [itemAtualizado] = await context.read({ id: itemAtualizar.id })

    //    console.log(result)
    //    console.log(itemAtualizado)
       assert.deepEqual(result, 1)
       assert.deepEqual(itemAtualizado.nome, novoItem.nome)
       

       /*spread/rest merger/separar objeto
        {
            nome: "Batman",
            poder: "Dinheiro"
        }

        {
            dataNascimento: "1998-01-01"
        }

        final
        {
            nome: "Batman",
            poder: "Dinheiro",
            dataNascimento: "1998-01-01"
        }
       */
       
    });

    it('remover por id', async () => {
        const [item] = await context.read({}) //buscar item na base
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    });
})