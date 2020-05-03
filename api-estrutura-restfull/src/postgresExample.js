// //npm install sequelize
// //npm install pg-hstore pg
// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize('squile::memory')
// const sequelize = new Sequelize('postgres://postgres:123456@192.168.99.100:5432/heroes')

// async function main() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }  
// }

// main()


const Sequelize = require('sequelize')

const driver = new Sequelize(
    "heroes",
    "postgres",
    "123456", { 
        host: "192.168.99.100", 
        dialect: "postgres", 
        quoteIdentifiers: false
    })


async function main() {
    const Herois = driver.define("heroes", {
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
    
    await Herois.sync() 
    await Herois.create({
        nome: 'Laterna Verde',
        poder: 'Anel'
    })
    const result = await Herois.findAll({ 
        raw: true, //dados
        attributes: ['nome'] //atributos especificos

    })
    console.log('result', result)
}

main()

