//docker ps
//docker exec -it 4505675b471c mongo -u admin -p senhaadmin --authenticationDatabase admin //rodar conexão mongo terminal
//show dbs
//use admin
//show collections
// db.admin.insert({
//   nome: 'Flash',
//   poder: 'Velocidade',
//   dataNascimento: '1998-01-01' 
// })
// db.admin.find()
// db.admin.find().pretty() //formatter
// for (let i = 0; i <= 10000; i++) {
//     db.admin.insert({
//         nome: `Flash-${i}`,
//         poder: 'Velocidade',
//         dataNascimento: '1998-01-01' 
//     }) 
// }
// db.admin.count()
// db.admin.findOne()
//db.admin.find().limit(1000).sort({ nome: -1 }) //trazer 100, ordenando desc
//db.admin.find().limit(1000).sort({ nome: 1 }) //trazer 100, ordenando asc
//db.admin.find({}, { poder: 1, _id: 0 }) //trazer item especifico, _id: 0 -> não trazer

//create
//     db.admin.insert({
//         nome: `Flash-${i}`,
//         poder: 'Velocidade',
//         dataNascimento: '1998-01-01' 
//     }) 

//read
//db.admin.find()
//db.admin.find({ nome: 'Laterna Verde'})

// update
//db.admin.update({ _id: ObjectId("5e3373989cc93ae63a3aca38")}, { nome: "Mulher Maravilha"}), errado  deve estar implicito, se errar o nome do campo ele adiciona um elemento
//db.admin.update({ _id: ObjectId("5e3373d89cc93ae63a3aca39")}, { $set: {nome: "Laterna Verde"}}), certo passar $set:{} -> altera ium campo especifico
// db.admin.update({ poder: 'Velocidade'}, { $set: {poder: "Super força"}}) // atualizar o primeiro

//delete 
//db.admin.remove({}) {} -> where -> remove todos itens
//db.admin.remove({ _id: ObjectId("5e3373989cc93ae63a3aca38")}) {} -> where -> remove item especifico