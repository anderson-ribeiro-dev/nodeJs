//npm i hapi
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})

//trás o nome do projeto
function mapRoutes(instance, methods) {
    //['list', , 'create, 'update]
    return methods.map(method => instance[method]())//passa cada método para instância
}

async function main () {

    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    // console.log('mapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()) //desttucturing obj de métodos
    ])

    await app.start()
    console.log("Servidor rodando na porta", app.info.port)

    return app
}

module.exports =  main()