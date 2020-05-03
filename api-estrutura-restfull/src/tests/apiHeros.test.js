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
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload) //resultado como string

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados)) //é uma array
    });

    it('listar  /herois - deve retornar somente 3 registro(paginação)', async () => {
        const TAMANHO_LIMITE = 3

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    });

    it('listar  /herois - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'A'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const errorResult = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"child \"limit\" fails because [\"limit\" must be a number]",
            "validation":{"source":"query","keys":["limit"]}
        }
    
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    });
    
    it('listar  /herois - deve retornar somente 1 registro(paginação), filtro por nome', async () => {
        const TAMANHO_LIMITE = 1000
        const NAME = 'Homem Aranha-1588540387102'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    });
})