const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

//function normal, por causa do constexto do this
describe.only('Suite de testes da API Heroes', function () {
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
    
    it('listar GET - /herois - deve retornar somente 1 registro(paginação), filtro por nome', async () => {
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

    it('cadastrar POST - /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        // assert.ok() retorna boolean
        // assert.deepEqual() compara objetos
        const statusCode = result.statusCode
        // console.log( 'resultado', result.payload )
        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notDeepStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
       
    });
})