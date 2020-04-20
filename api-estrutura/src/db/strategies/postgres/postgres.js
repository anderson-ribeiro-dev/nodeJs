const ICrud = require('./../interface/interfaceCrud')
const Sequelize = require('sequelize')



//classe concretas
class Postgres extends ICrud {
    constructor(connection, schema){
        super()
        this._connection = connection, //private _
        this._schema = schema //base de dados
       
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.error("fail !", error)   
            return false 
        }    

    }

    static async defineModel(connection,schema){
        const model = connection.define(
            schema.name, schema.schema, schema.options //objeto heroiSchema
        )
         await model.sync() 
         return model
    }

   
    async create(item) {
      const { dataValues } = await this._schema.create(item) //somente o dataValues
      return dataValues
    }

    async read(item = {}) {
        return this._schema.findAll({where: item,raw: true})
    }

    async update(id, item) {
        const response = await this._schema.update(item, { where: { id: id } })
        
        // console.log("response", response)
        return response
    }

    async delete(id) {
        const query = id ? { id : id} : {}
        return this._schema.destroy({ where: query})
    }

    //método privado
    static async connect(){
        const connection = new Sequelize(
            "heroes",
            "postgres",
            "123456", { 
                host: "192.168.99.100", 
                dialect: "postgres", 
                quoteIdentifiers: false,
                logging: false, //tirar logs console
        })

        return connection
    }
    
    
}


module.exports = Postgres