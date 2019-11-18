const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

//observar o evento
meuEmissor.on(nomeEvento, function(click) {
    console.log('Um usuario clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

//emiti evento de 1/1 segundo
// let count = 0
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok ' + count++)
// }, 1000);


//recebe entrada do usuário, espera mudança em um evento especifico
const stdin = process.openStdin()
stdin.addListener('data', (value) => {
    console.log(`Você digitou: ${value.toString().trim()}`)
})



//não resolver com promise, executa uma única vez
// const stdin = process.openStdin()
// function main() {
//     return new Promise(function (resolve, reject) {
//         stdin.addListener('data', (value) => {
//             // console.log(`Você digitou: ${value.toString().trim()}`)
//             return resolve(value)
//         })
//     })
// }


// main().then((resultado) => {
//     console.log('resultado', resultado.toString())
// })