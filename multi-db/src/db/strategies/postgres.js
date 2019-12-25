const ICrud = require('./interface/interfaceCrud')


//classe concretas
class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}


module.exports = Postgres