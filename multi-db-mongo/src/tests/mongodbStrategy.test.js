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

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}

let MOCK_HEROU_ID = '' //inicializar a variável

const context = new Context(new MongoDb())

describe('MongoDB suite de teste', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT) //cadastrar quando iniciar
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROU_ID = result._id
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

    it('atualizar', async () => {
        console.log("MOCK_HEROU_ID", MOCK_HEROU_ID)
        const result = await context.update(MOCK_HEROU_ID, {
            nome: 'Pernalonga'
        })    
       
        assert.deepEqual(result.nModified, 1)
    });
})