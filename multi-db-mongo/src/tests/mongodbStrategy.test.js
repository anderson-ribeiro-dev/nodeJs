const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

const context = new Context(new MongoDb())

describe('MongoDB suite de teste', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT) //cadastrar quando iniciar
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected()
        // console.log('result', result)
        const expected = 'conectado'
        assert.deepEqual(result, expected)
    });

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)  // { nome, poder } //extrair objetos da resposta
        // console.log('result', result)    
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR) 
    });

    it('listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome }) //[{ nome, poder }] do objeto de retorno pegar nome e poder primeira posição
        const result = { nome, poder }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    });
})