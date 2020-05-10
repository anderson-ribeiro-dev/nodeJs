const BaseRoutes = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
    throw erro
}

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
                    failAction: failAction,
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
                    console.error('Deu Ruim', error)
                    return "Erro interno no servidor!"
                }    

            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(100)
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    // console.log('result', result)
                    return {
                        message: "Heroi cadastrado com sucesso!",
                        _id: result._id
                    }
                } catch (error) {
                    console.error('DEU RUIM', error)
                    return 'Internal Error!'
                }
            }
        }
    }

    update(){
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request, headers ) => {
                try {
                    const { id } = request.params
                    const { payload } = request

                    //remove valores null do objeto
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)
                   
                    if(result.nModified !== 1) return {
                        message: 'Não foi possivel atualizar'
                    }

                    return {
                        message: 'Heroi atualizado com sucesso!',
                    }
                    
                } catch (error) {
                    console.error('DEU RUIM', error)
                    return 'Erro interno!'
                }
            }
        }
    }
    
}


module.exports = HeroRoutes