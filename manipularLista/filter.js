const { obterPessoas } = require('./service')

/**
 * const item = {
 *      nome: 'Anderson',
 *      idade: 12,    
 * }
 * 
 * const { nome , idade } = item
 * console.log(nome, idade)
 * 
 */

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for(index in this){
       const item = this[index] 
       const result = callback(item, index, this)   
       //0, "", null, undefined === false  
       if(!result) continue;
       lista.push(item)
    }
    return lista;
}


 main = async () => {
    try {
        const { results } = await obterPessoas(`a`)

        // const familiaLars = results.filter((item) => {
        //     //por padrão precisa retornar um booleano
        //     //para informar se deve manter ou remover da lista 
        //     //false -> remove da lista
        //     //true -> mantem
        //     //não encontrou = -1
        //     //encontrou = posição no array
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
        //     // const result = item.name.toLowerCase().indexOf(`lars`) === -1 //que não é da familia
        //     return result
        // })
        // const familiaLars = results.meuFilter((item, index, lista) => item.name.toLowerCase().indexOf('lars') !== -1)
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)

    } catch (error) {
       console.log("Deu ruim", error)     
    }
 }

 main()