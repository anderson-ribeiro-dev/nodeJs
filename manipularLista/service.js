//https:swapi.co

const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url) // promises -> await
    return response.data
}

// obterPessoas('r2')
//     .then((response) => {
//         console.log('resultado', response)
//     })
//     .catch((error) => {
//         console.error("Deu ruim", error)
//     })

module.exports = {
    obterPessoas: obterPessoas
}