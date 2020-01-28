const ICrud = require('./interface/interfaceCrud')
const Sequelize = require('sequelize')



//classe concretas
class Postgres extends ICrud {
    constructor(){
        super()
        this._driver = null, //private _
        this._herois = null //base de dados
       
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error("fail !", error)   
            return false 
        }    

    }

    async defineModel(){
        this._herois = this._driver.define("heroes", {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: "tb_herois",
            freezeTableName: false,
            timestamps: false
        })   
        
        // await this._herois.sync() 
    }

   
    async create(item) {
      const { dataValues } = await this._herois.create(item) //somente o dataValues
      return dataValues
    }

    async read(item = {}) {
        return this._herois.findAll({where: item,raw: true})
    }

    async update(id, item) {
        const response = await this._herois.update(item, { where: { id: id } })
        
        console.log("response", response)
        return response
    }

    //método privado
    async connect(){
        this._driver = new Sequelize(
            "heroes",
            "postgres",
            "123456", { 
                host: "192.168.99.100", 
                dialect: "postgres", 
                quoteIdentifiers: false
        })

       await this.defineModel()
    }
    
    
}


module.exports = Postgres