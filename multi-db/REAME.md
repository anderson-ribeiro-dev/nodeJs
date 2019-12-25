##primeiro passo, criar um imagem postgres docker
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker ps //lista as imagens 
docker exec -it postgres /bin/bash //entra no container
ls 

##sair do container 
exit

##cria interface postgres, cliente 
docker run --name adminer -p 8081:8081 --link postgres:postgres -d adminer

docker ps

##acessar adminer local
http://192.168.99.100:8080/


##criar imagem mongodb
docker run --name mongodb -p 27017:27017  -e MONGO_INITDB_ROOT_USERNAME= admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d  mongo:4

##cria interface mongo, cliente
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

##acessar mongo client
http://192.168.99.100:3000/

##criar user mongo, no container
docker exec -it mongodb mongo --host localhost  -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({ user: 'ribeiro', pwd: 'minhasenhasecreta' , roles: [{role: 'readWrite', db: 'herois'}]})"

