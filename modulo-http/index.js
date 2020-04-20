//module http para chamadas node.js
const http = require('http')

http.createServer((request, response) => {
    response.end('Hello Node!!')
})
.listen(4000, () => console.log("O servidor está rodando!"))