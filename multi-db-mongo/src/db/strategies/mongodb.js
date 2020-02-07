const ICrud = require('./interface/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'disconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'Disconectado',
}

//classe concretas
class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

   async isConnected(){
        const state = STATUS[this._driver.readyState] //pega status na posição do status
        if(state === 'conectado') {
            return state
        }

        if(state !== 'conectando') {
            return state
        }

        await new Promise(resolve => setTimeout(resolve, 1000)) //aguardar 1s
        return STATUS[this._driver.readyState]
    }

    defineModel(){
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
        this._herois = Mongoose.model('herois', heroiSchema)
    }

    connect(){
        // Mongoose.connect('mongodb://http://192.168.99.100:3000/localhost:27017/admin' , //docker http://192.168.99.100:3000/databaseStats
        Mongoose.connect('mongodb://localhost:27017/admin', 
            { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
                if(!error) return

                console.log('Falha na conexão!', error)
            })
            const connection = Mongoose.connection
            this._driver = connection
            connection.once('open', () => console.log("database rodando"))
            this.defineModel()
    }

    async create(item) {
        // console.log(item)
        return await this._herois.create(item)
    
        // console.log('result cadastrar', resultCadastrar)
        // const lisItens = await model.find()
    }

    async read(item, skip = 0, limit = 10) {
        return await this._herois.find(item).skip(skip).limit(limit)
        // return this._herois.count()
    }
}

module.exports = MongoDB