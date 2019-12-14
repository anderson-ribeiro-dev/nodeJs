//ler o módulo interno node
const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

//async/await - promise
const readFileAsync = promisify(readFile)
const writeFileAsycn = promisify(writeFile)
//obter dados 2 - forma
//   const dadosJson = require('./herois.json')


class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsycn(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        const heroiComId = {
            id: id,
            ...heroi //concatena o objeto
        }
        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        // const dadosFiltrados = dados.filter(item => item.id === id)
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) //retorna todos os ids, e verifica ids especificos
        return dadosFiltrados
    }

    async remover(id) {
        if(!id) {
           return await this.escreverArquivo([]) //limpar a base
        }
       
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if(!indice === -1) {
            throw Error('O usuario informado não existe')
        }

        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }
}

module.exports = new Database() //instância de classe Database().