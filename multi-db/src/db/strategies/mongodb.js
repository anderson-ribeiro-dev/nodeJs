const ICrud = require('./interface/interfaceCrud')

//classe concretas
class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo no mongo')
    }
}

module.exports = MongoDB