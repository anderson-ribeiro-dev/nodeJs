const service = require('./service')

async function main() {
    try {
       const result = await service.obterPessoas('a') 
       //result.results.length - 1, maior que zero
       const names = []

       console.time('tempo com for')   //tempo com for: 0.230ms
       for (let i = 0; i <=  result.results.length - 1; i++) {
            const pessoa = result.results[i]   
            names.push(pessoa.name)
       }
       console.timeEnd('tempo com for') //tempo com for: 0.230ms

        console.time('tempo com for in') //tempo com for in: 0.235ms
        for(let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('tempo com for in') //tempo com for in: 0.235ms

        console.time('tempo com for of') //tempo com for of: 0.236
        for (let pessoa of result.results) {
            names.push(pessoa.name)   
        }
        console.timeEnd('tempo com for of') //tempo com for of: 0.236


       console.log('Names ', names)

    } catch (error) {
        console.error("Error interno", error)
    }
}

main()