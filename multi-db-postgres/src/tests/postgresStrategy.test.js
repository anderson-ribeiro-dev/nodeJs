const assert = require('assert')
const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
}


describe('Postgres Strategy', function () {
    this.timeout(Infinity) //espera conexão, para validar os dados
    this.beforeAll(async function () {
       await context.connect()
    })

    it('PostgresSql Connection', async () => {
        const result = await context.isConnected() //validar conexão
        assert.equal(result, true) //resultado, esperado
    })

    it('cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        console.log("result", result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})