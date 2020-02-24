const ICrud = require('./../interface/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'disconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'Disconectado',
}

//classe concretas
class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

   async isConnected(){
        const state = STATUS[this._connection.readyState] //pega status na posição do status
        if(state === 'conectado') {
            return state
        }

        if(state !== 'conectando') {
            return state
        }

        await new Promise(resolve => setTimeout(resolve, 1000)) //aguardar 1s
        return STATUS[this._connection.readyState]
    }


     static connect(){
        // Mongoose.connect('mongodb://http://192.168.99.100:3000/localhost:27017/admin' , //docker http://192.168.99.100:3000/databaseStats
        Mongoose.connect('mongodb://localhost:27017/admin', 
            { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
                if(!error) return

                console.log('Falha na conexão!', error)
            })
            const connection = Mongoose.connection
            connection.once('open', () => console.log("database rodando"))
           
            return connection
    }

    async create(item) {
        // console.log(item)
        return await this._schema.create(item)
    
        // console.log('result cadastrar', resultCadastrar)
        // const lisItens = await model.find()
    }

    async read(item, skip = 0, limit = 10) {
        return await this._schema.find(item).skip(skip).limit(limit)
        // return this._schema.count()
    }

    async update(id, item) {
        // console.log("id", id)
        return await this._schema.updateOne({ _id: id }, {$set: item})
    }

    async delete(id) {
        return await this._schema.deleteOne({ _id: id })
    } 
}

module.exports = MongoDB