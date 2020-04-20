const BaseRoutes = require('./base/baseRoute')

class HeroRoutes extends BaseRoutes {
    //multi bd
    constructor(db) {
        super() //herança js
        this.db = db
    }   

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

    // create() {
    //     return {
    //         path: '/herois',
    //         method: 'POST',
    //         handler: (request, headers) => {
    //             return this.db.read()
    //         }
    //     }
    // }
    
}


module.exports = HeroRoutes