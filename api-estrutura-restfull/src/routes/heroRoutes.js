const BaseRoutes = require('./base/baseRoute')
const Joi = require('joi')

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
            config: {
                validate: {
                    //explicitar os erros
                    failAction: (request, headers, erro) => {
                        throw erro
                    },
                   //valida a requisição 
                   //payload -> body
                   //headers -> header
                   //params -> na URL :id
                   // query -> ?skip=10&limit=100
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100).default('')
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    //destructuring objeto request 
                    const { skip, limit, nome } = request.query

                    const query = { nome: {$regex: `.*${nome || ""}*.`} }  //$regex: `.*${nome}*.` buscar trecho de palvras
                    
                    return this.db.read(nome ? query : {}, skip, limit)
                
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