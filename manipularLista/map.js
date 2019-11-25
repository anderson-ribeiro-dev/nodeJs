const service  = require('./service')

Array.prototype.meuMap = function (callback) {
   const novoArrayMapeado = []
   //-1 pega o tamanho total da lista
   for (let indice = 0; indice < this.length - 1; indice++) {
       const resultado = callback(this[indice], indice);
       novoArrayMapeado.push(resultado) 
   }
   return novoArrayMapeado
}

main = async () => {
    try {
        const results = await service.obterPessoas(`a`)
        //foreach
        // const names = []
        // results.results.forEach(async (item) => {
        //     await names.push(item.name)
        // })

        // const names = results.results.map((pessoa) => {
        //     return   `${pessoa.name}`
        // })  

        // const names = results.results.map((pessoa) => pessoa.name)
        const names = results.results.meuMap((pessoa, indice) => {
            return `[${indice}] - ${pessoa.name}`
        })
        console.log("names", names)
        for (const name in names) {
            console.log(`<h1>${name}</h1>`)
        }

    } catch (error) {
        console.log("Deu ruim", error)
    }
}

main()