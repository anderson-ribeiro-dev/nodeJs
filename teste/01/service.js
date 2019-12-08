const axios = require('axios')
const URL = `https://swapi.co/api/people`

// async function obterPessoas(nome) {
//     const url = `${URL}/?search=${nome}&format=json`
//     const response = await axios.get(url) // promises -> await
//     return response.data
// }

obterPessoas = async (nome) => {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url) // promises -> await
    // console.log(JSON.stringify(response.data))
    return response.data.results.map(mapearPessoas) //trás nome e peso
}

mapearPessoas = (item) => {
    return {
        nome: item.name,
        peso: item.height
    }
}


module.exports = {
    obterPessoas
}
