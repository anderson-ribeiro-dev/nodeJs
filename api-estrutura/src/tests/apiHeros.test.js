const assert = require('assert')
const api = require('./../api')

//function normal, por causa do constexto do this
describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => { //aguardar servidor subir
        app = await api //aguarda a conexão da api
    })

    it('listar / herois', async () => {
        //simular rota hapi
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload) //resultado como string

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        // console.log('result', result)
        assert.ok(Array.isArray(dados)) //é uma array
    });
})