// const assert = require('assert')
// const MongoDb = require('./../db/strategies/mongodb/mongodb')
// const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
// const Context = require('./../db/strategies/base/contextStrategy')

// const MOCK_HEROI_CADASTRAR = {
//     nome: 'Mulher Maravilha',
//     poder: 'Laço'
// }

// const MOCK_HEROI_DEFAULT = {
//     nome: `Homem Aranha-${Date.now()}`,
//     poder: 'Super teia'
// }

// const MOCK_HEROI_ATUALIZAR = {
//     nome: `Patolino-${Date.now()}`,
//     poder: 'Velocidade'
// }

// let MOCK_HEROU_ID = '' //inicializar a variável

// let context = {}

// describe('MongoDB suite de teste', function () {
//     this.beforeAll(async () => {
//         const connection = MongoDb.connect() // sem new por que é método estático
//         context = new Context(new MongoDb(connection, HeroiSchema)) //conexão com o schema

//         await context.create(MOCK_HEROI_DEFAULT) //cadastrar quando iniciar
//         const result = await context.create(MOCK_HEROI_ATUALIZAR)
//         MOCK_HEROU_ID = result._id
//     })

//     it('verificar conexao', async () => {
//         const result = await context.isConnected()
//         // console.log('result', result)
//         const expected = 'conectado'
//         assert.deepEqual(result, expected)
//     });

//     it('cadastrar', async () => {
//         const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)  // { nome, poder } //extrair objetos da resposta
//         // console.log('result', result)    
//         assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR) 
//     });

//     it('listar', async () => {
//         const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome }) //[{ nome, poder }] do objeto de retorno pegar nome e poder primeira posição
//         const result = { nome, poder }
//         assert.deepEqual(result, MOCK_HEROI_DEFAULT)
//     });

//     it('atualizar', async () => {
//         // console.log("MOCK_HEROU_ID", MOCK_HEROU_ID)
//         const result = await context.update(MOCK_HEROU_ID, {
//             nome: 'Pernalonga'
//         })    
       
//         assert.deepEqual(result.nModified, 1)
//     });

//     //não se usa delete na prática
//     it('remover', async () => {
//         const result = await context.delete(MOCK_HEROU_ID)
//         assert.deepEqual(result.n, 1)
//     });
// })