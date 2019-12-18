const Commander = require('commander')
const DataBase = require('./database')
const Heroi = require('./heroi')


async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do herói")


        .option('-c, --cadastrar', "Cadastrar um herói")
        .option('-l, --listar', "Listar um herói")
        .option('-r, --remover', "Remover um herói pelo id")
        .option('-u, --atualizar [value]', "Atualizar um herói pelo id")
        .parse(process.argv)

    const heroi = new Heroi(Commander)    

    try {

        if(Commander.cadastrar) {
            delete heroi.id
            const resultado = await DataBase.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastradi!')
                return
            }
            console.log('Heroi Cadastrado com sucesso!')
        }

        if(Commander.listar) {
            const resultado = await DataBase.listar()
            if(!resultado) {
                console.error('Heroi listado com sucesso!')
                return
            }
            console.log('Heroi listado com sucesso!', resultado)
        }

        if(Commander.remover) {
            const resultado = await DataBase.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possível remover o herói!')
                return
            }
            console.log('Herói removido com sucesso!')
        }
        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remover todas as cheves que estiverem com undifined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await DataBase.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado) {
                console.log('Não foi possível atualizar o herói!')
                return;
            }
            console.log('Heroio atualizado com sucesso!')
           
        }


        
    } catch (error) {
        console.error('Deu ruim!', error)    
    }
}

main()