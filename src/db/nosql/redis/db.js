'use strict'
const redis = require('ioredis')
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
    DBredis_HOST,
    DBredis_PORT,  
    }=process.env

let client = new redis({
    host: `${DBredis_HOST}`,
    port: `${DBredis_PORT}`
});

function RedisConnection() {
 
        client.on("connect", ()=> {
            console.log("Conectado a Redis")
        });

        client.on("erros", err =>{
            console.log(`Redis error: ${err} `)
        });
        return client
}
async function get(key){
    return await client.hgetall(key);
}
async function getId(key){
    //console.log("key", key)
    return await client.exists(key);
}
async function set(key, value){
    return await client.hmset(key, value)
}
async function getkeys(key){
    return await client.keys(key);
}
async function delethe(key){
    return await client.del(key);
}
async function getcomentarios(){
    let comentarios = []
  let comentariosKey = await client.keys('com.*')
 
  comentariosKey.map(element => {
            
           comentarios.push(client.hgetall(element))
       })
  comentarios = await Promise.all(comentarios)
  return comentarios
}
let comentarios = getcomentarios()
async function getINcomentarios(Ids){
    try {
        let x = Ids.map(async(id) =>{ 
            
            return await comentarios.then(
                res=> res.filter(comment=>
                    comment.postsid == id
                ))
        }
        )
        return x
        
    } catch (error) {
        console.log(error)
    }
  
         
}
module.exports = {
    RedisConnection:RedisConnection,
    get:get,
    getId:getId,
    set:set,
    getkeys:getkeys,
    deletes:delethe,
    getINcomentarios:getINcomentarios

};
    