'use strict'
const { Logger, MongoClient } = require('mongodb')
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
    DBmongodb_USER,
    DBmongodb_PASSWD,
    DBmongodb_HOST,
    DBmongodb_PORT,
    DBmongodb_NAME,

}=process.env

const mongoUrl = ` mongodb://${DBmongodb_HOST}:${DBmongodb_PORT}/${DBmongodb_NAME}?socketTimeoutMS=90000` //la cadena de conexion

//`mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection // creamos una variable donde se podra la conexion a la base de datos
async function connectDB(){
if(connection) // sis que esta declarada
{
    return connection
}

let client // la variable client es aquella que recibira la conexion 
try {
    client = await new MongoClient.connect(mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 4500000,
  keepAlive: true,
  connectTimeoutMS: 60000000
  
    });
    connection = await client.db(DBmongodb_NAME)
} catch (error) {
    console.log('No se pudo conectar a la base de datos de mongo', mongoUrl, error)
        process.exit(1)   // sis que no se pudo conectar se eliminara el proceso.
    
}
return connection
}

connectDB()
const getNameCollection= async(getNameCollection)=>{
    const db = (await connectDB())
    return db.collection(getNameCollection)
}
const mongo = {
    user:getNameCollection('usuarios'),
    category:getNameCollection('categorias'),
    posts:getNameCollection('posts'),
    comentarios: getNameCollection('comentarios')
}
module.exports = {mongodb:getNameCollection,
    modelo: mongo
}

