const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())

describe('MongoDB suite de teste', function () {
    this.beforeAll(async () => {
        await context.connect()
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected()
        // console.log('result', result)
        const expected = 'conectado'
        assert.deepEqual(result, expected)
    });
})