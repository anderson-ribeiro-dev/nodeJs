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
                try {
                    //destructuring objeto request 
                    const { skip, limit, nome } = request.query

                    let query = {} 
                    if(nome) {
                        query.nome = nome
                    }

                    //validar se o limit for diferente de number
                    if(isNaN(skip)) {
                        throw Error ('O tipo do skip é incorreto!')
                    }
                    
                    if(isNaN(limit)) {
                        throw Error ('O tipo de limit é incorreto!')
                    }
                
                    return this.db.read(query, parseInt(skip), parseInt(limit))
                
                } catch (error) {
                    console.log('Deu Ruim', error)
                    return "Erro interno no servidor!"
                }    

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