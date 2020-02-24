//npm install mongoose

const Mongoose = require('mongoose')
// Mongoose.connect('mongodb://http://192.168.99.100:3000/localhost:27017/admin' , //docker http://192.168.99.100:3000/databaseStats
Mongoose.connect('mongodb://localhost:27017/admin', 
{ useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
    if(!error) return

    console.log('Falha na conexão!', error)
})

const connection = Mongoose.connection

connection.once('open', () => console.log("database rodando"))

// setTimeout(() => {
//     const state = connection.readyState
//     console.log(state)
// }, 1000);

/** 
 * 0: disconectado
 * 1: conectado
 * 2: conectando
 * 3: Disconectado
 */


const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true,
    },
    insertAt: {
        type: Date,
        default: new Date,
    }
})
 
const model = Mongoose.model('herois', heroiSchema)


const main =  async ()  => {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    // console.log('result cadastrar', resultCadastrar)

    const lisItens = await model.find()
    console.log('items cadastrados', lisItens)
}

main()