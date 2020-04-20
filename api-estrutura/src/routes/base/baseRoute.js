class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype) //pegar todos os nomes dos objetos dentro do prototype
            .filter(method => method !== 'constructor' &&  !method.startsWith('_')) //método privado _
    }   
}


module.exports = BaseRoute