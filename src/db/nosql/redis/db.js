'use strict'
const redis = require('ioredis')
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
    DBredis_HOST,
    DBredis_PORT,  
    }=process.env

class  RedisConnection {

    constructor(){
        this.client = this.connect()
    }
    connect(){
        let client = new redis({
            host: `${DBredis_HOST}`,
            port: `${DBredis_PORT}`
        });

        client.on("connect", ()=> {
            console.log("Conectado a Redis")
        });

        client.on("erros", err =>{
            console.log(`Redis error: ${err} `)
        });
        return client;
    }

    async get(key){
        return await this.client.hgetall(key);
    }
    async getId(key){
        console.log("key", key)
        return await this.client.exists(key);
    }
    async set(key, value){
        return await this.client.hmset(key, value)
    }
    async getkeys(key){
        return await this.client.keys(key);
    }
    async delete(key){
        return await this.client.del(key);
    }

}

module.exports = RedisConnection;
    